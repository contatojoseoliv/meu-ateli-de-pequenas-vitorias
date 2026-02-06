import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pv_app_profile_v1";

type AppProfile = {
  displayName: string;
};

const defaultProfile: AppProfile = {
  displayName: "Aluna",
};

function safeParse(json: string | null): AppProfile | null {
  if (!json) return null;
  try {
    const parsed = JSON.parse(json) as Partial<AppProfile>;
    return {
      displayName: typeof parsed.displayName === "string" && parsed.displayName.trim() ? parsed.displayName.trim() : defaultProfile.displayName,
    };
  } catch {
    return null;
  }
}

function initialsFromName(name: string) {
  const cleaned = name
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 60);

  if (!cleaned) return "A";
  const parts = cleaned.split(" ");
  const first = parts[0]?.[0] ?? "A";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (first + (last ?? "")).toUpperCase();
}

export function useAppProfile() {
  const [profile, setProfile] = useState<AppProfile>(() => safeParse(localStorage.getItem(STORAGE_KEY)) ?? defaultProfile);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const setDisplayName = useCallback((displayName: string) => {
    setProfile({ displayName });
  }, []);

  const initials = useMemo(() => initialsFromName(profile.displayName), [profile.displayName]);

  return {
    profile,
    setDisplayName,
    initials,
  };
}
