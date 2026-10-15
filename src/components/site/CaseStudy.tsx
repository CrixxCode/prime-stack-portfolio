import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, ShieldCheck } from "lucide-react";
import { Reveal, useSite } from "@/lib/site";
import type { Dict } from "@/lib/i18n";
import { ProjectLinks, ProjectVisual, Tag } from "./Sections";

const label = "font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground";

/** YouTube player behind a local poster: nothing loads from YouTube until play is pressed (privacy-enhanced domain). */
function Video({ project }: { project: Dict["projects"]["items"][number] }) {
  const p = useSite().t.projects;
  const [playing, setPlaying] = useState(false);
  if (!project.video) return null;
  const { id, poster } = project.video;
  return (
    <>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border-strong bg-card">
        {playing ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={`${p.video}: ${project.name}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="absolute inset-0 h-full w-full" />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} data-umami-event="video-play" data-umami-event-project={project.slug}
            className="group absolute inset-0">
            <img src={poster} alt="" width={1280} height={720} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            {/* In a corner, so it doesn't cover the poster's centered title */}
            <span className="absolute bottom-3 left-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-soft transition-transform group-hover:scale-[1.03] group-active:scale-[0.97] md:bottom-6 md:left-6">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />{p.play}<span className="sr-only">: {project.name}</span>
            </span>
          </button>
        )}
      </div>
      <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer"
        className="group mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        {p.youtube}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /><span className="sr-only">{p.newTab}</span>
      </a>
    </>
  );
}

/** Full case study of one project (/proyectos/<slug>): everything the home page summary leaves out. */
export function CaseStudy({ slug }: { slug: string }) {
  const { t, lang } = useSite(); const p = t.projects;
  const index = p.items.findIndex((x) => x.slug === slug);
  const it = p.items[index];
  if (!it) return null;
  const next = p.items[(index + 1) % p.items.length];
  const story = ([[p.origin, it.origin], [p.context, it.context], [p.problem, it.problem], [p.participation, it.participation]] as const)
    .filter((entry): entry is readonly [string, string] => Boolean(entry[1]));
  // Fact sheet: role and status as text; stack as tags (or by area, as text, when the project lists it in full);
  // concepts and kinds of work as plain text (ideas, not tools)
  const facts = [
    it.roleTitle && { k: p.myRole, v: it.roleTitle },
    { k: p.stack, v: it.stackGroups
      ? <div className="space-y-3">{it.stackGroups.map(([area, items]) => (
          <div key={area}><p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{area}</p><p className="mt-1">{items.join(" · ")}</p></div>
        ))}</div>
      : <div className="flex flex-wrap gap-1.5">{it.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div> },
    it.concepts && { k: p.concepts, v: <span className="text-muted-foreground">{it.concepts.join(" · ")}</span> },
    it.work && { k: p.work, v: <span className="text-muted-foreground">{it.work.join(" · ")}</span> },
    { k: p.status, v: <>
      <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />{it.status}</span>
      {it.statusDetail && <p className="mt-2 text-muted-foreground">{it.statusDetail}</p>}
    </> },
  ].filter((f) => !!f);

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-glow" />
        <div className="container-x relative">
          <Link to="/" hash="projects" search={{ lang }} className="group -ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />{p.allProjects}
          </Link>
          <div className="hero-stagger">
            <p className="mt-6 font-mono text-xs text-muted-foreground">{p.caseStudyL} 0{index + 1} / {it.tag}</p>
            <h1 className="mt-4 text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-balance">{it.name}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground text-pretty">{it.desc}</p>
            {it.links && <div className="mt-8 flex flex-wrap gap-3"><ProjectLinks project={it} primary /></div>}
          </div>
        </div>
      </section>

      <section className="container-x">
        <Reveal focus><ProjectVisual project={it} index={index} gallery /></Reveal>
      </section>

      {it.video && (
        <section id="video" className="container-x pt-20 md:pt-28">
          <Reveal>
            <h2 className={label}>{p.video}</h2>
            <div className="mt-5"><Video project={it} /></div>
          </Reveal>
        </section>
      )}

      <section className="container-x grid gap-14 py-20 md:py-28 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <dl className="divide-y divide-border border-y border-border text-sm lg:sticky lg:top-28">
            {facts.map((f) => (
              <div key={f.k} className="grid grid-cols-[110px_1fr] gap-4 py-3"><dt className="text-muted-foreground">{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
        </aside>
        <div className="space-y-14 lg:col-span-8">
          {story.map(([k, v]) => (
            <Reveal key={k}>
              <h2 className={label}>{k}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed">{v}</p>
            </Reveal>
          ))}
          <Reveal>
            <h2 className={label}>{p.features}</h2>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {it.features.map((f) => <li key={f} className="flex gap-3 bg-background p-4 text-[15px]"><span className="text-primary" aria-hidden="true">→</span>{f}</li>)}
            </ul>
          </Reveal>
          {it.decision && (
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <h2 className={`flex items-center gap-2 ${label}`}><ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />{p.decision}</h2>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em]">{it.decision.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{it.decision.text}</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {next && next.slug !== it.slug && (
        <section className="border-t border-border">
          <div className="container-x">
            <Link to="/proyectos/$slug" params={{ slug: next.slug }} search={{ lang }} className="group flex items-center justify-between gap-6 py-16 md:py-24">
              <span>
                <span className={`block ${label}`}>{p.nextProject}</span>
                <span className="mt-4 block text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] transition-colors group-hover:text-primary">{next.name}</span>
                <span className="mt-3 block font-mono text-xs text-muted-foreground">{next.tag}</span>
              </span>
              <ArrowRight className="h-8 w-8 shrink-0 text-muted-foreground transition-[color,translate] group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-surface/40">
        <div className="container-x flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <p className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-[-0.035em] text-balance">{t.contact.title}</p>
          <Link to="/" hash="contact" search={{ lang }} className="group inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] active:scale-[0.97]">
            {t.nav.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
