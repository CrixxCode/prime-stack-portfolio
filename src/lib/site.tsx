import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { dict, type Dict, type Lang } from "./i18n";
import { saveLang } from "./prefs";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict; theme: "light" | "dark"; toggleTheme: () => void };
const SiteCtx = createContext<Ctx | null>(null);

// Match --background in styles.css; used for <meta name="theme-color">.
export const THEME_COLORS = { light: "#faf9f6", dark: "#0a0a0b" } as const;
const syncThemeColor = (theme: "light" | "dark") =>
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);

// `initialLang` is ?lang= from the URL or, without it, the saved/browser language detected on the
// server (lib/prefs.ts), so the first render is already in the right language (no flash).
export function SiteProvider({ children, initialLang }: { children: ReactNode; initialLang: Lang }) {
  const [lang, setLangS] = useState<Lang>(initialLang);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(current);
    syncThemeColor(current);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => {
    setLangS(l);
    saveLang(l);
    // Keep the address shareable: it always says which language is showing.
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    window.history.replaceState(window.history.state, "", url);
  };
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    syncThemeColor(next);
    try { localStorage.setItem("theme", next); } catch { /* storage unavailable */ }
  };
  return <SiteCtx.Provider value={{ lang, setLang, t: dict[lang], theme, toggleTheme }}>{children}</SiteCtx.Provider>;
}

export function useSite() {
  const c = useContext(SiteCtx);
  if (!c) throw new Error("useSite outside provider");
  return c;
}

// `focus` fades, scales and sharpens the child in (images); the default fades and lifts it (text and blocks).
export function Reveal({ children, delay = 0, as: Tag = "div", focus = false, className = "" }: { children: ReactNode; delay?: number; as?: ElementType; focus?: boolean; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setV(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} data-visible={v} className={`${focus ? "reveal-focus" : "reveal"} ${className}`} style={{ ["--d" as string]: `${delay}ms` }}>{children}</Tag>;
}
