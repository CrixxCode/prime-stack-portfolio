import { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowRight, Download } from "lucide-react";
import { useSite } from "@/lib/site";
import { CONTACT } from "@/lib/i18n";

// Connection lines: normal speed on load, then they slow to an ambient pace; hovering the drawing
// brings them back to normal. Speed changes go through playbackRate, which keeps the current
// position (changing the CSS duration would make the dashes jump).
const DASH_SLOW = 0.25;

function useDashSpeed(svg: React.RefObject<SVGSVGElement | null>) {
  const rampRef = useRef<(target: number, ms: number) => void>(() => {});
  useEffect(() => {
    const el = svg.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // document.getAnimations(): Chrome's svg.getAnimations({ subtree: true }) misses the lines' CSS animations
    const dashes = () => document.getAnimations().filter((a) =>
      (a as CSSAnimation).animationName === "dash" && el.contains((a.effect as KeyframeEffect | null)?.target ?? null));
    let rate = 1, raf = 0;
    rampRef.current = (target, ms) => {
      cancelAnimationFrame(raf);
      const from = rate, t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / ms);
        rate = from + (target - from) * (1 - (1 - p) ** 3); // ease-out
        dashes().forEach((a) => (a.playbackRate = rate));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const slowDown = setTimeout(() => rampRef.current(DASH_SLOW, 1500), 3000);
    // Pause while the hero is off screen; nobody sees it and it saves work.
    const io = new IntersectionObserver(([e]) => dashes().forEach((a) => (e?.isIntersecting ? a.play() : a.pause())));
    io.observe(el);
    return () => { clearTimeout(slowDown); cancelAnimationFrame(raf); io.disconnect(); };
  }, [svg]);
  return {
    speedUp: () => rampRef.current(1, 400),
    slowDown: () => rampRef.current(DASH_SLOW, 1200),
  };
}

function Avatar() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dash = useDashSpeed(svgRef);
  const onMove = (e: React.PointerEvent) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
    ref.current.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
  };
  // Ease the layers back to center (via their existing transition) instead of leaving them where the pointer exited.
  const onLeave = () => {
    ref.current?.style.setProperty("--mx", "0");
    ref.current?.style.setProperty("--my", "0");
    dash.slowDown();
  };
  const layer = (k: number) => ({ transform: `translate3d(calc(var(--mx,0) * ${k}px), calc(var(--my,0) * ${k}px), 0)`, transition: "transform 500ms cubic-bezier(.2,.7,.2,1)" });
  // The graph reads top to bottom as a request through the stack: ui → service → api → logic → auth/models → db.
  const nodes = [[90, 70], [250, 60], [330, 170], [170, 200], [70, 300], [280, 320], [200, 400]] as const;
  const labels = ["ui", "service", "api", "logic", "auth", "models", "db.postgresql"] as const;
  const DB = 6;
  const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [3, 5], [4, 6], [5, 6], [2, 5]] as const;
  return (
    <div ref={ref} onPointerEnter={dash.speedUp} onPointerMove={onMove} onPointerLeave={onLeave} className="relative aspect-[4/5] w-full max-w-md" aria-hidden="true">
      <div className="absolute inset-0 rounded-2xl border border-border bg-surface bg-grid [mask-image:radial-gradient(closest-side,black,transparent)]" />
      <svg ref={svgRef} viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" style={layer(10)}>
        {/* head silhouette made of geometry */}
        <circle cx="200" cy="170" r="92" fill="none" stroke="var(--border-strong)" />
        <circle cx="200" cy="170" r="62" fill="none" stroke="var(--border-strong)" strokeDasharray="2 5" />
        <path d="M70 470 C 80 340, 320 340, 330 470" fill="none" stroke="var(--border-strong)" />
        <line x1="200" y1="20" x2="200" y2="480" stroke="var(--border)" />
        <line x1="30" y1="170" x2="370" y2="170" stroke="var(--border)" />
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--primary)" strokeOpacity="0.5" className="anim-dash" />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            {i === DB ? (
              // Data layer: a small database cylinder instead of a square node
              <g fill="var(--background)" stroke="var(--foreground)" strokeWidth="1.2">
                <path d={`M${x - 8} ${y - 6} v12 a8 3 0 0 0 16 0 v-12`} />
                <ellipse cx={x} cy={y - 6} rx="8" ry="3" />
              </g>
            ) : (
              <rect x={x - 5} y={y - 5} width="10" height="10" fill="var(--background)" stroke={i === 3 ? "var(--primary)" : "var(--foreground)"} strokeWidth="1.2" />
            )}
            <text x={x + 12} y={y - 7} fontSize="8" fontFamily="var(--font-mono)" fill="var(--muted-foreground)">{labels[i]}</text>
          </g>
        ))}
        <circle cx="170" cy="200" r="3" fill="var(--primary)" />
      </svg>
      {/* Each card sits just below its node: ui/ under "ui" (left), api/ under "api" (right) */}
      <div className="absolute left-[-6%] top-[22%] anim-float" style={layer(24)}>
        <div className="rounded-lg border border-border-strong bg-card px-3 py-2 font-mono text-[10px] leading-relaxed shadow-soft">
          <div className="text-muted-foreground">ui/</div>
          <div>&lt;ReservationList /&gt;</div>
          <div><span className="text-muted-foreground">→</span> reservation.service</div>
          <div><span className="text-muted-foreground">→</span> <span className="text-primary">GET</span> /reservations</div>
        </div>
      </div>
      <div className="absolute right-[-4%] top-[42%] anim-float [animation-delay:-3s]" style={layer(-20)}>
        <div className="rounded-lg border border-border-strong bg-card px-3 py-2 font-mono text-[10px] leading-relaxed shadow-soft">
          <div className="text-muted-foreground">api/</div>
          <div><span className="text-primary">GET</span> /reservations <span className="text-success">200</span></div>
          <div><span className="text-primary">POST</span> /exams <span className="text-success">201</span></div>
        </div>
      </div>
      <div className="absolute right-[4%] top-[4%] font-mono text-[10px] text-muted-foreground" style={layer(6)}>11.54°N · 72.91°W</div>
      <div className="absolute bottom-[3%] left-[5%] font-mono text-[10px] text-muted-foreground" style={layer(6)}>interface ↔ logic ↔ data</div>
    </div>
  );
}

export function Hero() {
  const { t } = useSite();
  const h = t.hero;
  return (
    <section id="home" className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-16">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div className="hero-stagger">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 shrink-0 bg-foreground" />
            <span className="flex flex-col gap-1 sm:flex-row sm:gap-2">
              <span>{CONTACT.name}</span>
              <span><span className="hidden sm:inline" aria-hidden="true">· </span>{h.label}</span>
            </span>
          </div>
          {/* Shorter laptop screens (≤820px tall, e.g. 1366×768) get a slightly smaller title so the whole hero fits above the fold */}
          <h1 className="mt-6 text-[clamp(2.6rem,6.4vw,5.6rem)] [@media(max-height:820px)]:text-[clamp(2.6rem,5.4vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-balance">
            {h.title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{h.sub}</p>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{h.stackNote}</p>
          <ul translate="no" className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-foreground" aria-label="Stack">
            {["Django", "Angular", ".NET", "React", "PostgreSQL"].map((s, i, all) => (
              <li key={s} className="flex items-center gap-3">{s}{i < all.length - 1 && <span className="text-muted-foreground" aria-hidden="true">·</span>}</li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] active:scale-[0.97]">
              {h.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#projects" className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong px-6 text-sm font-medium transition-[background-color,scale] hover:bg-surface-2 active:scale-[0.97]">
              {h.cta2}<ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a href={t.cv.href} download className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              <Download className="h-4 w-4" />{t.cv.label}<span className="sr-only"> {t.cv.hint}</span>
            </a>
          </div>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-success anim-pulse" aria-hidden="true" />{h.status}
          </p>
        </div>
        <div className="hero-art-in flex justify-center lg:justify-end"><Avatar /></div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:block">scroll ↓</div>
    </section>
  );
}
