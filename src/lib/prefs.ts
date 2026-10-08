import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import type { Lang } from "./i18n";

// The visitor's language, decided before the first render so the server already sends it
// (no Spanish flash for English browsers). Order: saved choice (cookie) → browser languages → Spanish.
// ?lang= in the URL still wins over this; see routes/index.tsx.

export const LANG_COOKIE = "lang";

const isLang = (v: unknown): v is Lang => v === "es" || v === "en";

/** First supported language in the browser's preference order, e.g. "en-US,en;q=0.9,es;q=0.8" → "en". */
function pick(saved: string | undefined, languages: readonly string[]): Lang {
  if (isLang(saved)) return saved;
  for (const l of languages) {
    const code = l.trim().slice(0, 2).toLowerCase();
    if (isLang(code)) return code;
  }
  return "es";
}

export const detectLang = createIsomorphicFn()
  .server((): Lang => pick(getCookie(LANG_COOKIE), (getRequestHeader("accept-language") ?? "").split(",")))
  .client((): Lang => {
    const saved = /(?:^|;\s*)lang=([^;]*)/.exec(document.cookie)?.[1];
    return pick(saved, navigator.languages);
  });

/** Remembers the visitor's choice for a year, readable by the server on the next visit. */
export const saveLang = (lang: Lang) => {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
};
