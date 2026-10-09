import { useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getGithubActivity, type GithubActivity } from "@/lib/github-activity";
import { ArrowRight, ArrowUpRight, Award, Download, FolderGit2, Github, Instagram, Linkedin, Lock, Mail, Trophy, Medal, Server, Rocket, Layers } from "lucide-react";
import { Reveal, useSite } from "@/lib/site";
import { CONTACT, type Dict } from "@/lib/i18n";
import { HotelMock, ExamMock } from "./Mocks";
import { BrandHorizontal } from "./Brand";

const titleClass = "max-w-3xl text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance";

function Head({ num, label, title, className = "" }: { num: string; label: string; title?: string; className?: string }) {
  return (
    <Reveal className={`mb-12 md:mb-16 ${className}`}>
      <div className="flex items-end gap-5 border-b border-border pb-5">
        <span className="font-mono text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.8] tracking-tighter text-numeral" aria-hidden="true">{num}</span>
        <span className="pb-1 font-mono text-sm uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      </div>
      {title && <h2 className={`mt-8 ${titleClass}`}>{title}</h2>}
    </Reveal>
  );
}
export const Tag = ({ children, tone = "" }: { children: ReactNode; tone?: string }) => (
  <span translate="no" className={`inline-flex items-center rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground ${tone}`}>{children}</span>
);

export function About() {
  const { t } = useSite(); const a = t.about;
  return (
    <section id="about" className="container-x py-24 md:py-36">
      <Head num={a.num} label={a.label} className="mb-8!" />
      {/* Title + paragraphs form one block so the photo centers against both */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <Reveal><h2 className={titleClass}>{a.title}</h2></Reveal>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <Reveal delay={40}><p>{a.p1}</p></Reveal><Reveal delay={80}><p>{a.p2}</p></Reveal><Reveal delay={120}><p className="text-foreground">{a.p3}</p></Reveal>
          </div>
        </div>
        <Reveal focus delay={60} className="lg:col-span-4 lg:col-start-9">
          <img src="/foto-personal.jpeg" alt={a.photoAlt} width={785} height={1177} loading="lazy" decoding="async"
            className="block aspect-[4/5] w-full rounded-xl border border-border-strong bg-surface object-cover object-[50%_20%]" />
        </Reveal>
      </div>
      <Reveal className="mt-20 border-y border-border py-10 md:mt-28 md:py-14">
        <blockquote className="mx-auto max-w-5xl text-center font-serif text-[clamp(2rem,4.6vw,3.75rem)] italic leading-[1.1] tracking-[-0.01em] text-balance">
          {/* One sentence per line from sm up; free flow on mobile */}
          {a.quote.split(/(?<=\.)\s+/).map((line, i, all) => (
            <span key={i} className="sm:block">
              {i === 0 && <span className="text-primary">“</span>}{line}{i === all.length - 1 ? <span className="text-primary">”</span> : " "}
            </span>
          ))}
        </blockquote>
      </Reveal>
      <dl className="mt-14 grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
        {t.stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 35} className="@container flex flex-col border-b border-r border-border p-5 md:p-7">
            <dt className="order-2 mt-2 text-sm text-muted-foreground">{s.l}</dt>
            {/* Value never wraps ("End-to-End" would split at the hyphen); its size follows the cell width, capped at the previous 36px */}
            <dd className="whitespace-nowrap text-[clamp(1rem,18cqi,2.25rem)] font-semibold tracking-tight tabular-nums">{s.v}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

type ProjectItem = Dict["projects"]["items"][number];
type Shot = NonNullable<ProjectItem["shots"]>[number];

/** Screenshot viewer: the selected one large (at its real proportions, so nothing is cropped on phones),
 *  thumbnails below to switch when there are several. */
function Shots({ shots, label }: { shots: Shot[]; label: string }) {
  const [current, setCurrent] = useState(0);
  const shot = shots[current] ?? shots[0];
  if (!shot) return null;
  return (
    <div className="mt-5">
      <img key={shot.src} src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async"
        className="block h-auto w-full rounded-xl border border-border-strong bg-card" />
      {shots.length > 1 && (
        // One row of equal thumbnails spanning the image's full width, whatever their number
        <ul className="mt-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${shots.length}, minmax(0, 1fr))` }}>
          {shots.map((s, i) => (
            <li key={s.src}>
              <button type="button" onClick={() => setCurrent(i)} aria-pressed={i === current} aria-label={`${label} ${i + 1}: ${s.alt}`}
                className={`block w-full overflow-hidden rounded-md border transition-[border-color,opacity,scale] active:scale-[0.97] ${i === current ? "border-primary" : "border-border-strong opacity-60 hover:opacity-100"}`}>
                <img src={s.thumb} alt="" width={288} height={200} loading="lazy" decoding="async" className="block h-auto w-full" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** The project's framed visual. Real screenshots replace the mockup as soon as `shots` has entries (see Project in i18n.ts).
 *  `gallery` shows every screenshot with thumbnails (case study page); otherwise only the first one (home page). */
export function ProjectVisual({ project, index, gallery = false }: { project: ProjectItem; index: number; gallery?: boolean }) {
  const p = useSite().t.projects;
  const Mock = index % 2 ? ExamMock : HotelMock;
  const shots = gallery ? project.shots : project.shots?.slice(0, 1);
  return (
    <div className="relative rounded-2xl border border-border bg-surface-2 p-4 md:p-8">
      <div className="absolute left-4 top-4 font-mono text-[10px] text-muted-foreground md:left-8" aria-hidden="true">fig.0{index + 1}</div>
      {shots?.length ? (
        <Shots shots={shots} label={p.showShot} />
      ) : (
        <div className="mt-5 h-[300px] sm:h-[380px] md:h-[440px]"><Mock label={`${p.mock}: ${project.name}`} /></div>
      )}
    </div>
  );
}

/** Demo and repository links of a project; private projects have none. */
export function ProjectLinks({ project, primary = false, compact = false }: { project: ProjectItem; primary?: boolean; compact?: boolean }) {
  const p = useSite().t.projects;
  if (!project.links) return null;
  // Compact padding lets three buttons share one row in the home page's narrow column
  const px = compact ? "px-4" : "px-5";
  return (
    <>
      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" data-umami-event="demo" data-umami-event-project={project.slug} className={primary
        ? `group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary ${px} text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] active:scale-[0.97]`
        : `group inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong ${px} text-sm font-medium transition-[background-color,scale] hover:bg-surface-2 active:scale-[0.97]`}>
        {p.demo}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /><span className="sr-only">: {project.name} {p.newTab}</span>
      </a>
      <a href={project.links.repo} target="_blank" rel="noopener noreferrer" data-umami-event="repo" data-umami-event-project={project.slug} className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong ${px} text-sm font-medium transition-[background-color,scale] hover:bg-surface-2 active:scale-[0.97]`}>
        <Github className="h-4 w-4" aria-hidden="true" />{p.github}<span className="sr-only">: {project.name} {p.newTab}</span>
      </a>
    </>
  );
}

// How many features the home summary lists; the case study shows them all.
const SUMMARY_FEATURES = 4;

export function Projects() {
  const { t, lang } = useSite(); const p = t.projects;
  return (
    <section id="projects" className="border-t border-border bg-surface/40 py-24 md:py-36">
      <div className="container-x">
        <Head num={p.num} label={p.label} title={p.title} />
        {/* A summary per project; problem, contribution and technical decisions live on its case study page */}
        <div className="space-y-24 md:space-y-36">
          {p.items.map((it, i) => (
            <article key={it.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal focus className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}><ProjectVisual project={it} index={i} /></Reveal>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                <Reveal><div className="font-mono text-xs text-muted-foreground">0{i + 1} / {it.tag}</div></Reveal>
                <Reveal delay={30}><h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">{it.name}</h3></Reveal>
                <Reveal delay={60}><p className="mt-4 text-lg text-muted-foreground">{it.desc}</p></Reveal>
                <Reveal delay={90}>
                  <ul aria-label={p.features} className="mt-6 grid gap-1 text-sm sm:grid-cols-2">
                    {it.features.slice(0, SUMMARY_FEATURES).map((f) => <li key={f} className="flex gap-2"><span className="text-primary" aria-hidden="true">→</span>{f}</li>)}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex flex-wrap gap-1.5">{it.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" /><span className="sr-only">{p.status}: </span>{it.status}</span>
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <div className="mt-8 flex flex-wrap gap-2">
                    <Link to="/proyectos/$slug" params={{ slug: it.slug }} search={{ lang }} className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] active:scale-[0.97]">
                      {p.caseStudy}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /><span className="sr-only">: {it.name}</span>
                    </Link>
                    <ProjectLinks project={it} compact />
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stack() {
  const { t } = useSite(); const s = t.stack;
  return (
    <section id="stack" className="border-t border-border py-24 md:py-36">
      <div className="container-x">
      <Head num={s.num} label={s.label} title={s.title} />
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.byDomain}</p>
      {/* Each column is at least as wide as its longest row (name + label on one line); the rest of the width is
          shared out, with less for Tools, which has no labels. Two columns only from lg, where those rows fit. */}
      <div className="grid border-l border-t border-border lg:grid-cols-2 xl:grid-cols-[minmax(max-content,1fr)_minmax(max-content,1fr)_minmax(max-content,1fr)_minmax(max-content,0.6fr)]">
        {s.groups.map((g, gi) => (
          <Reveal key={g.name} delay={gi * 35} className="border-b border-r border-border p-5 sm:p-6">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{g.name}</h3>
            <ul className="space-y-3">
              {g.items.map(([n, l]) => (
                // Usage context, not skill level: primary and professional get a tag; hands-on is quieter plain text
                <li key={n} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[15px]">
                  <span translate="no" className={l === "p" ? "font-medium" : l === "h" ? "text-muted-foreground" : ""}>{n}</span>
                  {/* ml-auto keeps the label right-aligned even when it has to wrap below a long name */}
                  {l === "p" && <span className="ml-auto"><Tag tone="border-primary/40 text-primary">{s.levels.p}</Tag></span>}
                  {l === "w" && <span className="ml-auto"><Tag>{s.levels.w}</Tag></span>}
                  {l === "h" && <span className="ml-auto font-mono text-xs text-muted-foreground">{s.levels.h}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-14 grid gap-10 rounded-2xl border border-border bg-surface p-7 md:grid-cols-[1fr_1.2fr] md:p-10">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{s.fundamentalsTitle}</h3>
          <p className="mt-3 text-muted-foreground">{s.fundamentalsText}</p>
        </div>
        <div className="self-center">
          <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.conceptsTitle}</h4>
          {/* Concepts and practices, not technologies: plain sans text in dashed outlines, apart from the mono tech tags */}
          <ul className="mt-4 flex flex-wrap gap-2">
            {s.concepts.map((c) => <li key={c} className="rounded-full border border-dashed border-border-strong px-3 py-1 text-sm">{c}</li>)}
          </ul>
        </div>
      </Reveal>
      </div>
    </section>
  );
}

export function Experience() {
  const { t, lang } = useSite(); const e = t.experience;
  // Month + year, capitalized ("Junio de 2026" / "June 2026")
  const monthYear = (iso: string) => {
    const s = new Intl.DateTimeFormat(lang, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  return (
    <section id="experience" className="border-t border-border py-24 md:py-36">
      <div className="container-x">
        <Head num={e.num} label={e.label} title={e.title} />
        {e.jobs.map((job, ji) => (
          <Reveal as="article" key={job.org} className={`grid gap-8 md:grid-cols-12 ${ji > 0 ? "mt-20 border-t border-border pt-16 md:mt-28 md:pt-20" : ""}`}>
            <div className="md:col-span-4">
              <div className="font-mono text-xs text-muted-foreground">
                {job.start ? <><time dateTime={job.start.slice(0, 7)}>{monthYear(job.start)}</time> – {e.present}</> : e.present}
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{e.current}</span>
            </div>
            <div className="md:col-span-8">
              <h3 className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-balance">{job.org}</h3>
              <p className="mt-3 text-xl text-muted-foreground">{job.role}{job.mode && <> · {job.mode}</>}</p>
              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed">{job.summary}</p>
              {job.project && (
                <div className="mt-6 max-w-2xl rounded-xl border border-border bg-surface p-4">
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{job.project.label}</div>
                  {/* A featured project links to its case study instead of being described twice */}
                  {job.project.slug ? (
                    <Link to="/proyectos/$slug" params={{ slug: job.project.slug }} search={{ lang }} className="group mt-1.5 inline-flex min-h-11 flex-wrap items-center gap-x-2 text-[15px]">
                      <span className="font-medium">{job.project.text}</span>
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors group-hover:text-foreground">· {t.projects.caseStudy}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></span>
                    </Link>
                  ) : <p className="mt-1.5 text-[15px]">{job.project.text}</p>}
                </div>
              )}
              <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
                {job.items.map((x, i) => <li key={x} className="bg-background p-5 text-[15px]"><span className="mb-2 block font-mono text-[11px] text-muted-foreground" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{x}</li>)}
              </ul>
              <div className="mt-6 flex flex-wrap gap-1.5">{job.stack.map((x) => <Tag key={x}>{x}</Tag>)}</div>
              {job.note && <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Lock className="h-3.5 w-3.5 shrink-0" />{job.note}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Education() {
  const { t } = useSite(); const e = t.education; const a = t.achievements;
  const icons = { trophy: Trophy, medal: Medal };
  return (
    <section id="education" className="container-x py-24 md:py-36">
      <Head num={e.num} label={e.label} title={e.title} />
      {/* One entry per program, each with its own period and details (same layout as Experience) */}
      <ol className="divide-y divide-border border-b border-border">
        {e.programs.map((pr, i) => (
          <Reveal as="li" key={pr.degree} delay={i * 40} className={`grid gap-4 pb-10 md:grid-cols-12 md:gap-8 ${i > 0 ? "pt-10" : ""}`}>
            <div className="md:col-span-4">
              <div className="font-mono text-xs text-muted-foreground">{pr.period}</div>
              {pr.current && <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />{e.currentL}</span>}
            </div>
            <div className="md:col-span-8">
              <h3 className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-none tracking-[-0.035em]">{pr.degree}</h3>
              <p className="mt-3 text-xl text-muted-foreground">{pr.school}</p>
              <dl className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
                {pr.details.map(([k, v]) => <div key={k}><dt className="text-sm text-muted-foreground">{k}</dt><dd className="mt-1">{v}</dd></div>)}
              </dl>
            </div>
          </Reveal>
        ))}
      </ol>
      {/* Not tied to either program */}
      <Reveal className="mt-10 grid md:grid-cols-12 md:gap-8">
        <dl className="grid gap-6 sm:grid-cols-[1fr_auto] sm:gap-12 md:col-span-8 md:col-start-5">
          <div><dt className="text-sm text-muted-foreground">{e.interestsL}</dt><dd className="mt-2 flex flex-wrap gap-1.5">{e.interests.map((x) => <Tag key={x}>{x}</Tag>)}</dd></div>
          <div><dt className="text-sm text-muted-foreground">{e.englishL}</dt><dd className="mt-1">{e.english}</dd></div>
        </dl>
      </Reveal>
      <div className="mt-16 md:mt-24">
        <Reveal><h3 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{a.label}</h3></Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {a.items.map((x, i) => { const I = icons[x.icon]; return (
            <Reveal key={x.t} delay={i * 40}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between"><I className="h-5 w-5 text-primary" aria-hidden="true" /><span className="font-mono text-xs text-muted-foreground">{x.meta}</span></div>
                <h4 className="mt-8 text-xl font-semibold tracking-tight">{x.t}</h4>
                <p className="mt-1 font-medium text-primary">{x.result}</p>
                <p className="mt-3 text-sm text-muted-foreground">{x.d}</p>
                {x.org && <p className="mt-auto pt-4 font-mono text-xs text-muted-foreground">{x.org}</p>}
              </article>
            </Reveal>); })}
          {/* Saber Pro: the overall score leads; the five competencies stay secondary */}
          <Reveal delay={80} className="md:col-span-2">
            <article className="grid gap-6 rounded-xl border border-border bg-card p-6 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
              <div>
                <div className="flex items-center gap-3"><Award className="h-5 w-5 text-primary" aria-hidden="true" /><h4 className="text-xl font-semibold tracking-tight">{a.saber.t}</h4></div>
                <p className="mt-4 flex items-baseline gap-2"><span className="text-5xl font-semibold tracking-tight tabular-nums">{a.saber.global}</span><span className="text-sm text-muted-foreground">{a.saber.globalL}</span></p>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
                {a.saber.scores.map(([v, l]) => (
                  <div key={l} className="flex flex-col-reverse justify-end border-t border-border pt-3">
                    <dt className="mt-1 text-xs text-muted-foreground">{l}</dt>
                    <dd className="text-2xl font-semibold tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Real contribution heatmap: one SVG path per activity level (0–4), drawn column by column like GitHub.
const LEVEL_OPACITY = [0.08, 0.35, 0.55, 0.78, 1];
function ActivityMap({ days, label }: { days: GithubActivity["days"]; label: string }) {
  const first = days[0];
  if (!first) return null;
  const startWeekday = new Date(`${first.date}T00:00:00Z`).getUTCDay();
  const paths = ["", "", "", "", ""];
  days.forEach((d, i) => {
    const slot = i + startWeekday;
    const x = Math.floor(slot / 7) * 13 + 1, y = (slot % 7) * 13 + 1;
    paths[d.level] += `M${x} ${y}h8v8h-8z`; // 8px square + 2px round stroke = 10px with soft corners
  });
  const width = Math.ceil((days.length + startWeekday) / 7) * 13 - 3;
  return (
    <svg viewBox={`0 0 ${width} ${7 * 13 - 3}`} role="img" aria-label={label} className="block h-auto w-full">
      {paths.map((d, level) => d && <path key={level} d={d} fill="var(--primary)" stroke="var(--primary)" strokeWidth={2} strokeLinejoin="round" opacity={LEVEL_OPACITY[level]} />)}
    </svg>
  );
}

export function GitHubPanel() {
  const { t, lang } = useSite(); const g = t.github;
  // Fetched after the page renders (the section is far below the fold); hidden if GitHub can't be reached
  const { data: activity, isPending } = useQuery({ queryKey: ["github-activity"], queryFn: () => getGithubActivity(), staleTime: Infinity, retry: false });
  const fmt = new Intl.NumberFormat(lang);
  return (
    <section id="github" className="flex min-h-dvh items-center bg-surface/40 py-24 md:py-36">
      <div className="container-x">
        <Head num={g.num} label={g.label} title={g.title} />
        <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl text-lg text-muted-foreground">{g.intro}</p>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-border-strong px-5 text-sm font-medium transition-[background-color,scale] hover:bg-surface-2 active:scale-[0.97] md:self-auto">
            <Github className="h-4 w-4" aria-hidden="true" />{g.profileCta}<span className="sr-only">: {CONTACT.githubUser} {g.newTab}</span>
          </a>
        </Reveal>
        {/* Same footprint as the activity card while it loads, so the repositories below don't jump */}
        {isPending && (
          <div aria-hidden="true" className="mb-4 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div className="h-3 w-40 rounded bg-surface-2" />
              <div className="h-14 w-48 rounded bg-surface-2" />
            </div>
            <div className="mt-6 aspect-[686/88] w-full rounded bg-surface-2" />
            <div className="mt-4 h-4" />
          </div>
        )}
        {activity && (
          // data-source: lets you check in DevTools whether the GITHUB_TOKEN secret is being used
          <div data-source={activity.source} className="mb-4 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{g.activityTitle}</h3>
              <dl className="flex gap-8">
                <div className="flex flex-col-reverse"><dt className="text-sm text-muted-foreground">{g.contributionsL}</dt><dd className="text-3xl font-semibold tabular-nums">{fmt.format(activity.total)}</dd></div>
                {activity.publicRepos !== null && <div className="flex flex-col-reverse"><dt className="text-sm text-muted-foreground">{g.reposL}</dt><dd className="text-3xl font-semibold tabular-nums">{fmt.format(activity.publicRepos)}</dd></div>}
              </dl>
            </div>
            <div className="mt-6"><ActivityMap days={activity.days} label={`${fmt.format(activity.total)} ${g.contributionsL} · ${g.activityTitle}`} /></div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>{g.source}</span>
              <span className="flex items-center gap-1.5" aria-hidden="true">{g.less}{LEVEL_OPACITY.map((o) => <span key={o} className="h-2.5 w-2.5 rounded-[2px] bg-primary" style={{ opacity: o }} />)}{g.more}</span>
            </div>
          </div>
        )}
        {/* Real public repositories only: no stars or forks. The featured one spans both rows on large screens. */}
        <div className="grid gap-4 lg:grid-cols-2">
          {g.repos.map((r, i) => (
            <Reveal key={r.url} delay={i * 40} className={r.featured ? "lg:row-span-2" : ""}>
              <article className={`flex h-full flex-col rounded-2xl border bg-card ${r.featured ? "border-border-strong p-7 shadow-soft md:p-9" : "border-border p-6"}`}>
                <div className="flex items-center gap-2">
                  <FolderGit2 className={`h-4 w-4 ${r.featured ? "text-primary" : "text-muted-foreground"}`} aria-hidden="true" />
                  <span className={`font-mono text-xs uppercase tracking-wider ${r.featured ? "text-primary" : "text-muted-foreground"}`}>{r.type}</span>
                </div>
                <h3 className={`font-semibold tracking-tight ${r.featured ? "mt-6 text-3xl md:text-4xl" : "mt-4 text-xl"}`}>{r.name}</h3>
                <p className={`mt-3 text-muted-foreground ${r.featured ? "text-base md:text-lg" : "text-sm"}`}>{r.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">{r.stack.map((x) => <Tag key={x}>{x}</Tag>)}</div>
                {r.extra && <p className="mt-3 text-sm text-muted-foreground">{r.extra.join(" · ")}</p>}
                <div className="mt-auto pt-6">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className={r.featured
                    ? "group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] active:scale-[0.97]"
                    : "group inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-medium transition-[background-color,scale] hover:bg-surface-2 active:scale-[0.97]"}>
                    {g.cta}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /><span className="sr-only">: {r.name} {g.newTab}</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Blog() {
  const { t } = useSite(); const b = t.blog;
  return (
    <section id="blog" className="border-t border-border py-24 md:py-32">
      <div className="container-x">
        <Head num={b.num} label={b.label} title={b.title} />
        <Reveal><p className="-mt-4 mb-10 max-w-2xl text-lg text-muted-foreground md:-mt-8">{b.intro}</p></Reveal>
        <div className="space-y-4">
          {b.posts.map((post, i) => (
            <Reveal as="article" key={post.title} delay={i * 40} className="rounded-2xl border border-border bg-card p-7 md:p-10">
              {/* Status is a plain badge, not a button: unpublished posts have no link at all */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />{post.status}</span>
              <h3 className="mt-5 max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-balance md:text-3xl">
                {post.url ? <a href={post.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{post.title}<span className="sr-only"> {b.newTab}</span></a> : post.title}
              </h3>
              <p className="mt-4 max-w-3xl text-muted-foreground">{post.desc}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">{post.topics.map((x) => <Tag key={x}>{x}</Tag>)}</div>
              {post.url && (
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-medium transition-[background-color,scale] hover:bg-surface-2 active:scale-[0.97]">
                  {b.read}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /><span className="sr-only">: {post.title} {b.newTab}</span>
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useSite(); const c = t.contact;
  type Field = "name" | "email" | "message";
  const [errs, setErrs] = useState<Partial<Record<Field, string>>>({});
  const [ok, setOk] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim(), email = String(f.get("email") || "").trim(), msg = String(f.get("message") || "").trim();
    const n: Partial<Record<Field, string>> = {};
    if (!name || name.length > 100) n.name = c.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) n.email = c.errEmail;
    if (msg.length < 10 || msg.length > 2000) n.message = c.errMsg;
    setErrs(n); setOk(false);
    if (Object.keys(n).length) { (e.currentTarget.querySelector(`[name=${Object.keys(n)[0]}]`) as HTMLElement)?.focus(); return; }
    setOk(true);
    window.umami?.track("contact-form");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${c.subject} — ${name}`)}&body=${encodeURIComponent(msg + "\n\n" + email)}`;
  };
  const serviceIcons = [Layers, Server, Rocket];
  const field = "mt-2 block w-full rounded-lg border border-input bg-background px-4 py-3 text-[15px] transition-colors placeholder:text-muted-foreground focus:border-primary aria-[invalid=true]:border-destructive";
  const socials = [
    { I: Mail, l: "Email", h: `mailto:${CONTACT.email}`, external: false },
    { I: Linkedin, l: "LinkedIn", h: CONTACT.linkedin, external: true },
    { I: Github, l: "GitHub", h: CONTACT.github, external: true },
    { I: Instagram, l: "Instagram", h: CONTACT.instagram, external: true },
  ];
  return (
    <section id="contact" className="relative flex min-h-dvh items-center overflow-hidden border-t border-border py-24">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="container-x relative">
        <Head num={c.num} label={c.label} />
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><h2 className="text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-balance">{c.title}</h2></Reveal>
            <Reveal delay={50}><p className="mt-6 max-w-md text-lg text-muted-foreground">{c.text}</p></Reveal>
            <Reveal delay={65} className="mt-10 max-w-xl">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.servicesL}</h3>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {c.services.map((x, i) => { const I = serviceIcons[i] ?? Layers; return (
                  <li key={x.t} className="grid grid-cols-[auto_1fr] gap-x-4 py-4">
                    <I className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <div><h4 className="font-medium">{x.t}</h4><p className="mt-0.5 text-sm text-muted-foreground">{x.d}</p></div>
                  </li>); })}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <a href={`mailto:${CONTACT.email}`} data-umami-event="email" className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] active:scale-[0.97]">{t.hero.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></a>
              <ul className="mt-10 flex flex-wrap gap-2">
                {socials.map(({ I, l, h, external }) => (
                  <li key={l}>
                    <a href={h} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-4 text-sm transition-[background-color,scale] hover:bg-surface-2 active:scale-[0.97]">
                      <I className="h-4 w-4" aria-hidden="true" />{l}<span className="sr-only">{external ? ` ${c.newTab}` : `: ${CONTACT.email}`}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href={t.cv.href} download data-umami-event="cv-download" data-umami-event-from="contact" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-4 text-sm transition-[background-color,scale] hover:bg-surface-2 active:scale-[0.97]">
                    <Download className="h-4 w-4" aria-hidden="true" />{t.cv.label}<span className="sr-only"> {t.cv.hint}</span>
                  </a>
                </li>
              </ul>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground"><span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />{c.remote}</p>
            </Reveal>
          </div>
          <Reveal delay={60} className="lg:col-span-5">
            <form noValidate onSubmit={submit} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
              {(["name", "email", "message"] as const).map((k) => (
                <div key={k}>
                  <label htmlFor={`f-${k}`} className="text-sm font-medium">{c[k]}</label>
                  {k === "message"
                    ? <textarea id={`f-${k}`} name={k} rows={4} maxLength={2000} required aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `e-${k}` : undefined} className={field} />
                    : <input id={`f-${k}`} name={k} type={k === "email" ? "email" : "text"} autoComplete={k} spellCheck={k === "email" ? false : undefined} maxLength={k === "email" ? 255 : 100} required aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `e-${k}` : undefined} className={field} />}
                  {errs[k] && <p id={`e-${k}`} className="mt-1.5 text-sm text-destructive">{errs[k]}</p>}
                </div>
              ))}
              <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-foreground text-sm font-medium text-background transition-[opacity,scale] hover:opacity-90 active:scale-[0.97]">{c.send}<ArrowRight className="h-4 w-4" /></button>
              <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{ok && <>{c.ok} {c.okFallback} <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-2">{CONTACT.email}</a>.</>}</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t, lang, setLang } = useSite();
  return (
    <footer className="border-t border-border">
      <div className="container-x flex flex-col gap-6 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <BrandHorizontal className="w-[220px]" />
          <p className="mt-3 font-mono text-xs text-muted-foreground">{t.footer.tagline}</p>
        </div>
        <ul className="flex flex-wrap items-center gap-1 text-muted-foreground">
          {[
            { l: "GitHub", h: CONTACT.github, external: true },
            { l: "LinkedIn", h: CONTACT.linkedin, external: true },
            { l: "Email", h: `mailto:${CONTACT.email}`, external: false },
            { l: "Instagram", h: CONTACT.instagram, external: true },
          ].map(({ l, h, external }) => (
            <li key={l}>
              <a href={h} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex min-h-11 items-center px-3 transition-colors hover:text-foreground">
                {l}<span className="sr-only">{external ? ` ${t.footer.newTab}` : `: ${CONTACT.email}`}</span>
              </a>
            </li>
          ))}
          <li><button type="button" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label={`ES / EN — ${t.nav.switchLang}`} className="inline-flex min-h-11 items-center px-3 font-mono text-xs hover:text-foreground"><span className={lang === "es" ? "text-foreground" : ""}>ES</span>&nbsp;/&nbsp;<span className={lang === "en" ? "text-foreground" : ""}>EN</span></button></li>
        </ul>
      </div>
    </footer>
  );
}
