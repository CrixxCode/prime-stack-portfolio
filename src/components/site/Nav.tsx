import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useSite } from "@/lib/site";
import { CONTACT } from "@/lib/i18n";
import { BrandLogo } from "./Brand";

// Both lists follow the page order, so the active highlight always moves forward while scrolling.
// Desktop shows the priority sections; the mobile menu also lists Education and GitHub.
const mobileIds = ["home", "projects", "experience", "about", "stack", "education", "github", "contact"] as const;
const desktopIds = ["home", "projects", "experience", "about", "stack", "contact"] as const;
type NavId = (typeof mobileIds)[number];

/** Link to a home page section: a plain #anchor on the home page, a route link (keeping the language) from other pages. */
function SectionLink({ id, onHome, className, onClick, current, label, children }: {
  id: string; onHome: boolean; className?: string; onClick?: () => void; current?: boolean; label?: string; children: ReactNode;
}) {
  const { lang } = useSite();
  const props = { className, onClick, "aria-current": current ? ("true" as const) : undefined, "aria-label": label };
  return onHome ? <a href={`#${id}`} {...props}>{children}</a> : <Link to="/" hash={id} search={{ lang }} {...props}>{children}</Link>;
}

/** `onHome` is false on the case study pages: links then lead back to the home page sections, and Projects stays highlighted. */
export function Nav({ onHome = true }: { onHome?: boolean }) {
  const { t, lang, setLang, theme, toggleTheme } = useSite();
  const [open, setOpen] = useState(false);
  // Menu scales from its trigger: x offset of the menu button inside the panel (panel sits 16px from the edge).
  const [origin, setOrigin] = useState("50% 0");
  const [active, setActive] = useState(onHome ? "home" : "projects");
  const nums: Record<NavId, string> = {
    home: "00", projects: t.projects.num, about: t.about.num, stack: t.stack.num, experience: t.experience.num,
    education: t.education.num, github: t.github.num, contact: t.contact.num,
  };

  // Observe every page section, not only the linked ones: in a section without a menu entry
  // (Blog, or Education/GitHub on desktop) nothing is highlighted, instead of the previous link staying lit.
  useEffect(() => {
    if (!onHome) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main > section").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);
  // While open, the menu closes on Escape, on a tap outside the header, or when the page scrolls.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    const outside = (e: PointerEvent) => !(e.target as Element).closest("header") && close();
    window.addEventListener("keydown", k);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      window.removeEventListener("keydown", k);
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("scroll", close);
    };
  }, [open]);

  // Plain JSX, not a nested component: a component defined in render remounts on every render and drops keyboard focus.
  const controls = (
    <div className="flex items-center gap-1">
      <button type="button" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label={`${lang === "es" ? "EN" : "ES"} — ${t.nav.switchLang}`}
        className="relative after:absolute after:-inset-x-0.5 after:-inset-y-1 h-9 min-w-9 rounded-full px-2.5 font-mono text-xs text-muted-foreground transition-[color,background-color,scale] hover:bg-surface-2 hover:text-foreground active:scale-[0.97]">
        {lang === "es" ? "EN" : "ES"}
      </button>
      <button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? t.nav.toLight : t.nav.toDark}
        className="relative after:absolute after:-inset-x-0.5 after:-inset-y-1 grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-[color,background-color,scale] hover:bg-surface-2 hover:text-foreground active:scale-[0.97]">
        {/* Which icon shows follows the html.dark class (set before first paint), not React state: no wrong icon while loading */}
        <Sun className="icon-swap theme-sun h-4 w-4" />
        <Moon className="icon-swap theme-moon h-4 w-4" />
      </button>
    </div>
  );

  return (
    <>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">{t.nav.skip}</a>
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label={t.nav.label} className="flex w-full max-w-fit items-center gap-1 rounded-full border border-border-strong bg-nav p-1.5 shadow-soft backdrop-blur-xl">
        <SectionLink id="home" onHome={onHome} className="relative after:absolute after:-inset-x-0.5 after:-inset-y-1 mr-1 shrink-0 rounded-full" label={`${CONTACT.name} — ${t.nav.home}`}><BrandLogo /></SectionLink>
        <ul className="hidden items-center lg:flex">
          {desktopIds.map((id) => (
            <li key={id}>
              <SectionLink id={id} onHome={onHome} current={active === id}
                className={`relative block rounded-full px-3 py-2 text-[13px] transition-colors ${active === id ? "bg-surface-2 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {t.nav[id]}
              </SectionLink>
            </li>
          ))}
        </ul>
        <span className="mx-1 hidden h-5 w-px bg-border-strong lg:block" />
        {controls}
        <SectionLink id="contact" onHome={onHome} className="ml-1 hidden rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.97] sm:block">{t.nav.cta}</SectionLink>
        <button type="button" className="relative after:absolute after:-inset-x-0.5 after:-inset-y-1 grid h-9 w-9 place-items-center rounded-full transition-[background-color,scale] hover:bg-surface-2 active:scale-[0.97] lg:hidden" aria-expanded={open} aria-controls="mnav" aria-label={open ? t.nav.close : t.nav.menu}
          onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setOrigin(`${r.left + r.width / 2 - 16}px 0`); setOpen(!open); }}>
          <Menu className="icon-swap h-4 w-4" data-off={open} />
          <X className="icon-swap h-4 w-4" data-off={!open} />
        </button>
      </nav>
      {/* Always mounted so closing can animate; visibility:hidden keeps it out of tab order and the a11y tree */}
      <div id="mnav" data-open={open} style={{ transformOrigin: origin }} className="mnav absolute inset-x-4 top-16 rounded-2xl border border-border-strong bg-popover p-3 shadow-soft lg:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {mobileIds.map((id) => (
              <li key={id}>
                <SectionLink id={id} onHome={onHome} current={active === id} onClick={() => setOpen(false)} className={`flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm ${active === id ? "bg-surface-2 text-foreground" : "text-muted-foreground"}`}>
                  <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">{nums[id]}</span>{t.nav[id]}
                </SectionLink>
              </li>
            ))}
          </ul>
          <SectionLink id="contact" onHome={onHome} onClick={() => setOpen(false)} className="mt-2 flex min-h-11 items-center justify-center rounded-xl bg-primary text-sm font-medium text-primary-foreground">{t.nav.cta}</SectionLink>
      </div>
    </header>
    </>
  );
}
