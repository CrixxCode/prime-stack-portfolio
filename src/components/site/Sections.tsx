import { useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Award, Code2, Github, Linkedin, Lock, Mail, Trophy, Medal, Server, Layout, Rocket, Layers } from "lucide-react";
import { Reveal, useSite } from "@/lib/site";
import { CONTACT } from "@/lib/i18n";
import { HotelMock, ExamMock } from "./Mocks";

function Head({ num, label, title, className = "" }: { num: string; label: string; title?: string; className?: string }) {
  return (
    <Reveal className={`mb-12 md:mb-16 ${className}`}>
      <div className="flex items-end gap-5 border-b border-border pb-5">
        <span className="font-mono text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.8] tracking-tighter text-border-strong" aria-hidden="true">{num}</span>
        <span className="pb-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      </div>
      {title && <h2 className="mt-8 max-w-3xl text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]">{title}</h2>}
    </Reveal>
  );
}
const Tag = ({ children, tone = "" }: { children: ReactNode; tone?: string }) => (
  <span className={`inline-flex items-center rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground ${tone}`}>{children}</span>
);

export function About() {
  const { t } = useSite(); const a = t.about;
  return (
    <section id="about" className="container-x py-24 md:py-36">
      <Head num={a.num} label={a.label} title={a.title} />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-1">
          <Reveal><p>{a.p1}</p></Reveal><Reveal delay={80}><p>{a.p2}</p></Reveal><Reveal delay={160}><p className="text-foreground">{a.p3}</p></Reveal>
        </div>
        <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
          <div className="grid aspect-[4/5] place-items-center rounded-xl border border-dashed border-border-strong bg-surface bg-grid">
            <span className="font-mono text-xs text-muted-foreground">[ {a.photo} · 4:5 · webp/avif ]</span>
          </div>
        </Reveal>
      </div>
      <Reveal className="mt-20 border-y border-border py-10 md:mt-28 md:py-14">
        <blockquote className="max-w-4xl text-[clamp(1.6rem,3.6vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.03em]">
          <span className="text-primary">“</span>{a.quote}<span className="text-primary">”</span>
        </blockquote>
      </Reveal>
      <dl className="mt-14 grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
        {t.stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 70} className="border-b border-r border-border p-5 md:p-7">
            <dt className="order-2 mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</dt>
            <dd className="text-2xl font-semibold tracking-tight md:text-4xl">{s.v}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

export function Projects() {
  const { t } = useSite(); const p = t.projects;
  const mocks = [<HotelMock key="h" />, <ExamMock key="e" />];
  return (
    <section id="projects" className="border-t border-border bg-surface/40 py-24 md:py-36">
      <div className="container-x">
        <Head num={p.num} label={p.label} title={p.title} />
        <div className="space-y-28 md:space-y-40">
          {p.items.map((it, i) => (
            <article key={it.name} className="grid min-h-[80vh] items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="group relative rounded-2xl border border-border bg-surface-2 p-4 transition-transform duration-500 hover:scale-[1.01] md:p-8">
                  <div className="absolute left-4 top-4 font-mono text-[10px] text-muted-foreground md:left-8">fig.0{i + 1}</div>
                  <div className="mt-5 h-[300px] sm:h-[380px] md:h-[440px]">{mocks[i]}</div>
                </div>
              </Reveal>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                <Reveal><div className="font-mono text-xs text-muted-foreground">0{i + 1} / {it.tag}</div></Reveal>
                <Reveal delay={60}><h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">{it.name}</h3></Reveal>
                <Reveal delay={120}><p className="mt-4 text-lg text-muted-foreground">{it.desc}</p></Reveal>
                <Reveal delay={180}>
                  <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
                    {[[p.problem, it.problem], [p.role, it.role]].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-3"><dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{k}</dt><dd>{v}</dd></div>
                    ))}
                    <div className="grid grid-cols-[110px_1fr] gap-4 py-3"><dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{p.features}</dt>
                      <dd><ul className="grid gap-1 sm:grid-cols-2">{it.features.map((f) => <li key={f} className="flex gap-2"><span className="text-primary">→</span>{f}</li>)}</ul></dd></div>
                    <div className="grid grid-cols-[110px_1fr] gap-4 py-3"><dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{p.stack}</dt><dd className="flex flex-wrap gap-1.5">{it.stack.map((s) => <Tag key={s}>{s}</Tag>)}</dd></div>
                    <div className="grid grid-cols-[110px_1fr] gap-4 py-3"><dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{p.status}</dt><dd className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{it.status}</dd></div>
                    <div className="grid grid-cols-[110px_1fr] gap-4 py-3"><dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{p.repo}</dt><dd className="flex items-center gap-2 text-muted-foreground"><Lock className="h-3.5 w-3.5" />{p.private}</dd></div>
                  </dl>
                </Reveal>
                <Reveal delay={240}>
                  <button type="button" disabled title={p.soon} className="mt-8 inline-flex min-h-11 cursor-not-allowed items-center gap-2 rounded-full border border-border-strong px-5 text-sm text-muted-foreground">
                    {p.cta}<ArrowUpRight className="h-4 w-4" /><span className="sr-only">— {p.soon}</span>
                  </button>
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
  const flows = [["Backend", ["Django", ".NET", "Node"]], ["Frontend", ["Angular", "React"]]] as const;
  return (
    <section id="stack" className="container-x py-24 md:py-36">
      <Head num={s.num} label={s.label} title={s.title} />
      <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {s.groups.map((g, gi) => (
          <Reveal key={g.name} delay={gi * 70} className="border-b border-r border-border p-6">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{g.name}</h3>
            <ul className="space-y-3">
              {g.items.map(([n, l]) => (
                <li key={n} className="flex items-center justify-between gap-3 text-[15px]">
                  <span className={l === "p" ? "font-medium" : ""}>{n}</span>
                  {l && <Tag tone={l === "p" ? "border-primary/40 text-primary" : ""}>{l === "p" ? s.principal : s.exp}</Tag>}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-14 grid gap-10 rounded-2xl border border-border bg-surface p-7 md:grid-cols-[1fr_1.2fr] md:p-10">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{s.adaptTitle}</h3>
          <p className="mt-3 text-muted-foreground">{s.adaptText}</p>
        </div>
        <div className="space-y-5 self-center">
          {flows.map(([name, steps]) => (
            <div key={name} className="grid grid-cols-[80px_1fr] items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{name}</span>
              <ol className="flex flex-wrap items-center gap-2">
                {steps.map((st, i) => (
                  <li key={st} className="flex items-center gap-2">
                    {i > 0 && <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />}
                    <span className={`rounded-md border px-3 py-1.5 font-mono text-xs ${i === 0 ? "border-primary/50 bg-primary/10 text-foreground" : "border-border-strong bg-card"}`}>{st}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function Experience() {
  const { t } = useSite(); const e = t.experience;
  return (
    <section id="experience" className="border-t border-border py-24 md:py-36">
      <div className="container-x">
        <Head num={e.num} label={e.label} />
        <Reveal as="article" className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="font-mono text-xs text-muted-foreground">{e.date}</div>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[11px] text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary anim-pulse" />{e.current}</span>
          </div>
          <div className="md:col-span-8">
            <h3 className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em]">{e.company}</h3>
            <p className="mt-3 text-xl text-muted-foreground">{e.role}</p>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {e.items.map((x, i) => <li key={x} className="bg-background p-5 text-[15px]"><span className="mb-2 block font-mono text-[11px] text-muted-foreground">0{i + 1}</span>{x}</li>)}
            </ul>
            <div className="mt-6 flex flex-wrap gap-1.5">{[".NET", "React", "APIs", "SQL", "Git"].map((x) => <Tag key={x}>{x}</Tag>)}</div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Lock className="h-3.5 w-3.5" />{e.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Education() {
  const { t } = useSite(); const e = t.education;
  return (
    <section id="education" className="container-x py-24 md:py-36">
      <Head num={e.num} label={e.label} />
      <Reveal className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <h3 className="text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1] tracking-[-0.035em]">{e.degree}</h3>
          <p className="mt-3 text-xl text-muted-foreground">{e.school}</p>
        </div>
        <dl className="space-y-6 md:col-span-5">
          <div><dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{e.statusL}</dt><dd className="mt-1">{e.status}</dd></div>
          <div><dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{e.interestsL}</dt><dd className="mt-2 flex flex-wrap gap-1.5">{e.interests.map((x) => <Tag key={x}>{x}</Tag>)}</dd></div>
          <div><dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{e.englishL}</dt><dd className="mt-1">{e.english}</dd></div>
        </dl>
      </Reveal>
    </section>
  );
}

export function Achievements() {
  const { t } = useSite(); const a = t.achievements;
  const icons = [Award, Trophy, Medal];
  return (
    <section id="achievements" className="border-t border-border py-24 md:py-36">
      <div className="container-x">
        <Head num={a.num} label={a.label} title={a.title} />
        <div className="grid gap-4 md:grid-cols-3">
          {a.items.map((x, i) => { const I = icons[i]; return (
            <Reveal key={x.t} delay={i * 80}>
              <article className="group h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-soft">
                <div className="flex items-center justify-between"><I className="h-5 w-5 text-primary" aria-hidden="true" /><span className="font-mono text-[11px] text-muted-foreground">{x.k}</span></div>
                <h3 className="mt-10 text-xl font-semibold tracking-tight">{x.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
              </article>
            </Reveal>); })}
        </div>
      </div>
    </section>
  );
}

export function GitHubPanel() {
  const { t } = useSite(); const g = t.github;
  const cells = Array.from({ length: 7 * 40 }, (_, i) => ((i * 37) % 11) / 10);
  const Ph = () => <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">placeholder</span>;
  return (
    <section id="github" className="flex min-h-dvh items-center bg-surface/40 py-24 md:py-36">
      <div className="container-x">
        <Head num={g.num} label={g.label} title={g.title} />
        <Reveal className="overflow-hidden rounded-2xl border border-border-strong bg-card shadow-soft">
          <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><Github className="h-4 w-4" />github / —</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />{g.placeholder}</span>
          </div>
          <div className="grid lg:grid-cols-12">
            <div className="space-y-5 border-b border-border p-6 lg:col-span-4 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between"><h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{g.profile}</h3><Ph /></div>
              <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-full border border-border-strong bg-surface-2 font-mono text-xs">FS</div><div><div className="font-medium">Full-Stack Developer</div><div className="font-mono text-xs text-muted-foreground">@username</div></div></div>
              <dl className="grid grid-cols-3 gap-2 text-center">{["Repos", "Stars", "Followers"].map((k) => <div key={k} className="rounded-lg border border-border p-2"><dd className="font-mono text-lg">—</dd><dt className="text-[10px] text-muted-foreground">{k}</dt></div>)}</dl>
              <div>
                <div className="mb-2 flex items-center justify-between"><h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{g.langs}</h3><Ph /></div>
                <div className="flex h-2 overflow-hidden rounded-full bg-surface-2"><div className="w-2/5 bg-primary/70" /><div className="w-1/4 bg-brand-2/60" /><div className="w-1/6 bg-border-strong" /></div>
                <div className="mt-2 flex gap-3 font-mono text-[10px] text-muted-foreground"><span>Python</span><span>TypeScript</span><span>C#</span></div>
              </div>
            </div>
            <div className="space-y-6 p-6 lg:col-span-8">
              <div>
                <div className="mb-3 flex items-center justify-between"><h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{g.activity}</h3><Ph /></div>
                <div className="overflow-x-auto"><div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]" aria-hidden="true">
                  {cells.map((v, i) => <div key={i} className="h-2.5 w-2.5 rounded-[2px] bg-primary" style={{ opacity: 0.06 + v * 0.25 }} />)}
                </div></div>
              </div>
              <div>
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{g.repos}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[0, 1].map((i) => (
                    <div key={i} className="rounded-lg border border-dashed border-border-strong p-4">
                      <div className="flex items-center gap-2 text-sm"><Code2 className="h-4 w-4 text-muted-foreground" />{g.slot} 0{i + 1}</div>
                      <div className="mt-3 space-y-1.5"><div className="h-1.5 w-4/5 rounded bg-surface-2" /><div className="h-1.5 w-1/2 rounded bg-surface-2" /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-surface p-4"><h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{g.oss}</h3><p className="mt-1 text-sm text-muted-foreground">{g.ossText}</p></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Services() {
  const { t } = useSite(); const s = t.services;
  const icons = [Layers, Server, Layout, Rocket];
  return (
    <section className="container-x py-24 md:py-32" aria-labelledby="services-h">
      <Head num={s.num} label={s.label} />
      <h2 id="services-h" className="sr-only">{s.label}</h2>
      <ul className="divide-y divide-border border-y border-border">
        {s.items.map((x, i) => { const I = icons[i]; return (
          <Reveal as="li" key={x.t} delay={i * 60} className="group grid grid-cols-[auto_1fr] items-center gap-5 py-6 md:grid-cols-[60px_1fr_1fr] md:py-8">
            <I className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
            <h3 className="text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">{x.t}</h3>
            <p className="col-span-2 text-muted-foreground md:col-span-1">{x.d}</p>
          </Reveal>); })}
      </ul>
    </section>
  );
}

export function Blog() {
  const { t } = useSite(); const b = t.blog;
  return (
    <section className="border-t border-border py-24 md:py-32" aria-labelledby="blog-h">
      <div className="container-x">
        <Head num={b.num} label={b.label} />
        <Reveal className="grid place-items-center rounded-2xl border border-dashed border-border-strong bg-surface/50 px-6 py-20 text-center">
          <h2 id="blog-h" className="text-4xl font-semibold tracking-[-0.03em] md:text-5xl">{b.title}</h2>
          <p className="mt-3 max-w-lg text-muted-foreground">{b.text}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-1.5">{b.topics.map((x) => <Tag key={x}>{x}</Tag>)}</div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useSite(); const c = t.contact;
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim(), email = String(f.get("email") || "").trim(), msg = String(f.get("message") || "").trim();
    const n: Record<string, string> = {};
    if (!name || name.length > 100) n.name = c.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) n.email = c.errEmail;
    if (msg.length < 10 || msg.length > 2000) n.message = c.errMsg;
    setErrs(n); setOk(false);
    if (Object.keys(n).length) { (e.currentTarget.querySelector(`[name=${Object.keys(n)[0]}]`) as HTMLElement)?.focus(); return; }
    setOk(true);
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Portfolio — " + name)}&body=${encodeURIComponent(msg + "\n\n" + email)}`;
  };
  const field = "mt-2 block w-full rounded-lg border border-input bg-background px-4 py-3 text-[15px] transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-ring aria-[invalid=true]:border-destructive";
  const socials = [{ I: Mail, l: "Email", h: `mailto:${CONTACT.email}` }, { I: Linkedin, l: "LinkedIn", h: CONTACT.linkedin }, { I: Github, l: "GitHub", h: CONTACT.github }];
  return (
    <section id="contact" className="relative flex min-h-dvh items-center overflow-hidden border-t border-border py-24">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="container-x relative">
        <Head num={c.num} label={c.label} />
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><h2 className="text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-balance">{c.title}</h2></Reveal>
            <Reveal delay={100}><p className="mt-6 max-w-md text-lg text-muted-foreground">{c.text}</p></Reveal>
            <Reveal delay={160}>
              <a href={`mailto:${CONTACT.email}`} className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]">{t.hero.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></a>
              <ul className="mt-10 flex flex-wrap gap-2">
                {socials.map(({ I, l, h }) => <li key={l}><a href={h} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-4 text-sm transition-colors hover:bg-surface-2"><I className="h-4 w-4" aria-hidden="true" />{l}</a></li>)}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-5">
            <form noValidate onSubmit={submit} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
              {(["name", "email", "message"] as const).map((k) => (
                <div key={k}>
                  <label htmlFor={`f-${k}`} className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{c[k]}</label>
                  {k === "message"
                    ? <textarea id={`f-${k}`} name={k} rows={4} maxLength={2000} required aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `e-${k}` : undefined} className={field} />
                    : <input id={`f-${k}`} name={k} type={k === "email" ? "email" : "text"} autoComplete={k} maxLength={k === "email" ? 255 : 100} required aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `e-${k}` : undefined} className={field} />}
                  {errs[k] && <p id={`e-${k}`} className="mt-1.5 text-sm text-destructive">{errs[k]}</p>}
                </div>
              ))}
              <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-foreground text-sm font-medium text-background transition-transform hover:scale-[1.01] active:scale-[0.99]">{c.send}<ArrowRight className="h-4 w-4" /></button>
              <p role="status" aria-live="polite" className="text-sm text-success">{ok ? c.ok : ""}</p>
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
        <div><div className="font-medium">Full-Stack Developer</div><div className="mt-1 font-mono text-xs text-muted-foreground">{t.footer.tagline}</div></div>
        <ul className="flex flex-wrap items-center gap-1 text-muted-foreground">
          <li><a className="inline-flex min-h-11 items-center px-3 hover:text-foreground" href={CONTACT.github}>GitHub</a></li>
          <li><a className="inline-flex min-h-11 items-center px-3 hover:text-foreground" href={CONTACT.linkedin}>LinkedIn</a></li>
          <li><a className="inline-flex min-h-11 items-center px-3 hover:text-foreground" href={`mailto:${CONTACT.email}`}>Email</a></li>
          <li><button onClick={() => setLang(lang === "es" ? "en" : "es")} className="inline-flex min-h-11 items-center px-3 font-mono text-xs hover:text-foreground"><span className={lang === "es" ? "text-foreground" : ""}>ES</span>&nbsp;/&nbsp;<span className={lang === "en" ? "text-foreground" : ""}>EN</span></button></li>
        </ul>
      </div>
    </footer>
  );
}
