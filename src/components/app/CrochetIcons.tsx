import React from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

export const CrochetHookIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-5 h-5", className)}
  >
    <path d="M18 3c-1.1 0-2 .9-2 2v12c0 2.2-1.8 4-4 4s-4-1.8-4-4V5c0-1.1-.9-2-2-2" />
    <path d="M16 5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2" />
  </svg>
);

export const YarnBallIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-5 h-5", className)}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
    <path d="M12 21a9 9 0 0 0 9-9M3 12a9 9 0 0 0 9 9" />
    <path d="M7 7l10 10" />
    <path d="M17 7L7 17" />
  </svg>
);

export const StitchIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-5 h-5", className)}
  >
    <path d="M12 20V4" />
    <path d="M7 8l5-4 5 4" />
    <path d="M7 16l5 4 5-4" />
  </svg>
);

export const NeedleIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-5 h-5", className)}
  >
    <path d="M12 2L12 22" />
    <path d="M10 4h4" />
    <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
  </svg>
);