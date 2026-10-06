import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useSite } from "@/lib/site";
import { CONTACT } from "@/lib/i18n";

const ids = ["home", "projects", "about", "stack", "experience", "education", "github", "contact"] as const;

export function Nav() {
  const { t, lang, setLang, theme, toggleTheme } = useSite();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const nums: Record<(typeof ids)[number], string> = {
    home: "00", projects: t.projects.num, about: t.about.num, stack: t.stack.num, experience: t.experience.num,
    education: t.education.num, github: t.github.num, contact: t.contact.num,
  };

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  // Plain JSX, not a nested component: a component defined in render remounts on every render and drops keyboard focus.
  const controls = (
    <div className="flex items-center gap-1">
      <button type="button" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label={t.nav.switchLang}
        className="relative after:absolute after:-inset-x-0.5 after:-inset-y-1 h-9 min-w-9 rounded-full px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">
        {lang === "es" ? "EN" : "ES"}
      </button>
      <button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? t.nav.toLight : t.nav.toDark}
        className="relative after:absolute after:-inset-x-0.5 after:-inset-y-1 grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">{t.nav.skip}</a>
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label={t.nav.label}className="flex w-full max-w-fit items-center gap-1 rounded-full border border-border-strong bg-nav p-1.5 shadow-soft backdrop-blur-xl">
        <a href="#home" className="relative after:absolute after:-inset-x-0.5 after:-inset-y-1 mr-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foreground font-mono text-xs font-semibold text-background" aria-label={t.nav.home}>{CONTACT.initials}</a>
        <ul className="hidden items-center lg:flex">
          {ids.map((id) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined}
                className={`relative block rounded-full px-3 py-2 text-[13px] transition-colors ${active === id ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
        <span className="mx-1 hidden h-5 w-px bg-border-strong lg:block" />
        {controls}
        <a href="#contact" className="ml-1 hidden rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:block lg:hidden xl:block">{t.nav.cta}</a>
        <button type="button" className="relative after:absolute after:-inset-x-0.5 after:-inset-y-1 grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2 lg:hidden" aria-expanded={open} aria-controls="mnav" aria-label={open ? t.nav.close : t.nav.menu} onClick={() => setOpen(!open)}>
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>
      {open && (
        <div id="mnav" className="absolute inset-x-4 top-16 rounded-2xl border border-border-strong bg-popover p-3 shadow-soft animate-in fade-in slide-in-from-top-2 duration-300 lg:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {ids.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className={`flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm ${active === id ? "bg-surface-2 text-foreground" : "text-muted-foreground"}`}>
                  <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">{nums[id]}</span>{t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="mt-2 flex min-h-11 items-center justify-center rounded-xl bg-primary text-sm font-medium text-primary-foreground">{t.nav.cta}</a>
        </div>
      )}
    </header>
    </>
  );
}
