import { useEffect } from "react";

type ShortcutMap = Record<string, (e: KeyboardEvent) => void>;

/**
 * Atalhos de teclado globais. Ignora quando o foco está em input/textarea/contenteditable.
 * Chave: combinação como "Space", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "f", "m".
 */
export function useKeyboardShortcuts(shortcuts: ShortcutMap, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          target.isContentEditable
        ) {
          return;
        }
      }

      const key = e.key === " " ? "Space" : e.key;
      const fn = shortcuts[key] ?? shortcuts[key.toLowerCase()];
      if (fn) {
        fn(e);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts, enabled]);
}
