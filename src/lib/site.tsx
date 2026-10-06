import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { dict, type Dict, type Lang } from "./i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict; theme: "light" | "dark"; toggleTheme: () => void };
const SiteCtx = createContext<Ctx | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLangS] = useState<Lang>("es");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    const l = localStorage.getItem("lang");
    if (l === "en" || l === "es") setLangS(l);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setLangS(l); localStorage.setItem("lang", l); };
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };
  return <SiteCtx.Provider value={{ lang, setLang, t: dict[lang], theme, toggleTheme }}>{children}</SiteCtx.Provider>;
}

export function useSite() {
  const c = useContext(SiteCtx);
  if (!c) throw new Error("useSite outside provider");
  return c;
}

export function Reveal({ children, delay = 0, as: Tag = "div", className = "" }: { children: ReactNode; delay?: number; as?: ElementType; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} data-visible={v} className={`reveal ${className}`} style={{ ["--d" as string]: `${delay}ms` }}>{children}</Tag>;
}
