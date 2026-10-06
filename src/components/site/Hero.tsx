import { useRef } from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useSite } from "@/lib/site";

function Avatar() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
    ref.current.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
  };
  const layer = (k: number) => ({ transform: `translate3d(calc(var(--mx,0) * ${k}px), calc(var(--my,0) * ${k}px), 0)`, transition: "transform 500ms cubic-bezier(.2,.7,.2,1)" });
  const nodes = [[90, 70], [250, 60], [330, 170], [170, 200], [70, 300], [280, 320], [200, 400]];
  return (
    <div ref={ref} onPointerMove={onMove} className="relative aspect-[4/5] w-full max-w-md" aria-hidden="true">
      <div className="absolute inset-0 rounded-2xl border border-border bg-surface bg-grid [mask-image:radial-gradient(closest-side,black,transparent)]" />
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" style={layer(10)}>
        {/* head silhouette made of geometry */}
        <circle cx="200" cy="170" r="92" fill="none" stroke="var(--border-strong)" />
        <circle cx="200" cy="170" r="62" fill="none" stroke="var(--border-strong)" strokeDasharray="2 5" />
        <path d="M70 470 C 80 340, 320 340, 330 470" fill="none" stroke="var(--border-strong)" />
        <line x1="200" y1="20" x2="200" y2="480" stroke="var(--border)" />
        <line x1="30" y1="170" x2="370" y2="170" stroke="var(--border)" />
        {[[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [3, 5], [4, 6], [5, 6], [2, 5]].map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="var(--primary)" strokeOpacity="0.5" className="anim-dash" />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 5} y={y - 5} width="10" height="10" fill="var(--background)" stroke={i === 3 ? "var(--primary)" : "var(--foreground)"} strokeWidth="1.2" />
            <text x={x + 9} y={y - 7} fontSize="8" fontFamily="var(--font-mono)" fill="var(--muted-foreground)">{`n${i}·${x},${y}`}</text>
          </g>
        ))}
        <circle cx="170" cy="200" r="3" fill="var(--primary)" className="anim-pulse" />
      </svg>
      <div className="absolute left-[-6%] top-[14%] anim-float" style={layer(24)}>
        <div className="rounded-lg border border-border-strong bg-card px-3 py-2 font-mono text-[10px] leading-relaxed shadow-soft">
          <div className="text-muted-foreground">api/</div>
          <div><span className="text-primary">GET</span> /reservations <span className="text-success">200</span></div>
          <div><span className="text-primary">POST</span> /exams <span className="text-success">201</span></div>
        </div>
      </div>
      <div className="absolute bottom-[12%] right-[-4%] anim-float [animation-delay:-3s]" style={layer(-20)}>
        <div className="w-40 rounded-lg border border-border-strong bg-card p-3 shadow-soft">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-muted-foreground"><span>ui.component</span><span className="h-1.5 w-1.5 rounded-full bg-primary" /></div>
          <div className="space-y-1.5"><div className="h-1.5 w-full rounded bg-surface-2" /><div className="h-1.5 w-3/4 rounded bg-surface-2" /><div className="h-1.5 w-1/2 rounded bg-primary/60" /></div>
        </div>
      </div>
      <div className="absolute right-[4%] top-[4%] font-mono text-[10px] text-muted-foreground" style={layer(6)}>11.54°N · 72.91°W</div>
      <div className="absolute bottom-[3%] left-[5%] font-mono text-[10px] text-muted-foreground" style={layer(6)}>django ⇄ angular</div>
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
        <div>
          <div className="reveal flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground" data-visible="true">
            <span className="h-px w-8 bg-foreground" />{h.label}
          </div>
          <h1 key={h.title} className="mt-6 text-[clamp(2.6rem,6.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-balance animate-in fade-in slide-in-from-bottom-3 duration-700">
            {h.title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{h.sub}</p>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{h.stackNote}</p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-foreground" aria-label="Stack">
            {["Django", "Angular", ".NET", "React", "PostgreSQL"].map((s, i) => (
              <li key={s} className="flex items-center gap-3">{i > 0 && <span className="text-muted-foreground">·</span>}{s}</li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] active:scale-[0.98]">
              {h.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#projects" className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong px-6 text-sm font-medium transition-colors hover:bg-surface-2">
              {h.cta2}<ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-success anim-pulse" aria-hidden="true" />{h.status}
          </p>
        </div>
        <div className="flex justify-center lg:justify-end"><Avatar /></div>
      </div>
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:block">scroll ↓</div>
    </section>
  );
}
