// Builds the CV as PDF in Spanish and English: `node cv/build.mjs`
// Content comes from src/lib/i18n.ts (the same source as the site, so both always agree);
// only what the site doesn't show (courses, languages) lives in CV_EXTRA below.
// Each version is rendered as HTML and printed to PDF with the local Chrome (no extra dependencies).
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { CONTACT, dict } from "../src/lib/i18n.ts";
import { SITE_URL } from "../src/lib/brand.ts";

const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT_DIR = resolve("public/cv");
export const CV_FILES = { es: "Cristian_Ramirez_CV_ES.pdf", en: "Cristian_Ramirez_CV_EN.pdf" };

const CV_EXTRA = {
  es: {
    headings: { profile: "Perfil", experience: "Experiencia", projects: "Proyecto destacado", education: "Formación", achievements: "Logros", stack: "Stack", concepts: "Conceptos", courses: "Cursos", languages: "Idiomas" },
    profile: "Full-Stack Developer enfocado en construir productos web de principio a fin: requisitos, arquitectura, datos, backend, frontend y experiencia de usuario. Mi stack principal es Django + Angular, con uso profesional de ASP.NET Core/.NET y React, y fundamentos que me permiten adaptarme a distintas tecnologías.",
    // Bullets per job, matched to the site's jobs by organization
    jobs: {
      "ALGORITHM S.A.S.": { bullets: [
        "Desarrollo de funcionalidades backend con ASP.NET Core/.NET e interfaces y flujos frontend con React.",
        "Diseño y consumo de APIs REST e integración con servicios y APIs de terceros.",
        "Levantamiento y refinamiento de requerimientos; apoyo en diseño de interfaces y experiencia de usuario.",
        "QA funcional, pruebas transversales y corrección de errores; participación en el ciclo completo de una aplicación multitenant de reservas de alojamiento, en fase de pruebas al cierre del contrato.",
      ] },
      "Universidad de La Guajira": { unit: "Vicerrectoría de Docencia", bullets: [
        "Desarrollo y evolución técnica del Ejercitador Saber Pro sobre una base de código existente (Django, FastAPI, React, MySQL).",
        "QA funcional y técnico, pruebas transversales entre módulos y corrección de errores.",
        "Refactorización de componentes de la arquitectura existente.",
      ] },
    },
    projectRole: "Desarrollo conjunto en un equipo de dos: requisitos, arquitectura, modelado de datos, backend, frontend, autenticación y autorización (RBAC), multitenancy, pruebas, documentación y despliegue.",
    more: "Más proyectos en",
    saber: "Saber Pro: puntaje global 188 · Inglés 181",
    education: ["Décimo semestre · Graduación estimada: primer semestre de 2027", "Finalizado"],
    courses: [
      ["Curso profesional de TypeScript", "Código Facilito · nov. 2025"],
      ["Fundamentos de arquitectura de software", "Código Facilito · nov. 2025"],
      ["Aplicaciones con Oracle APEX", "Udemy · mar. 2026"],
      ["Introducción a Machine Learning", "Código Facilito · jun. 2026"],
    ],
    languages: [["Español", "Nativo"], ["Inglés", "B2 · Saber Pro"]],
  },
  en: {
    headings: { profile: "Profile", experience: "Experience", projects: "Featured project", education: "Education", achievements: "Achievements", stack: "Stack", concepts: "Concepts", courses: "Courses", languages: "Languages" },
    profile: "Full-Stack Developer focused on building web products end to end: requirements, architecture, data, backend, frontend and user experience. My primary stack is Django + Angular, with professional use of ASP.NET Core/.NET and React, and fundamentals that let me adapt to different technologies.",
    // Bullets per job, matched to the site's jobs by organization
    jobs: {
      "ALGORITHM S.A.S.": { bullets: [
        "Building backend features with ASP.NET Core/.NET and frontend interfaces and flows with React.",
        "Designing and consuming REST APIs and integrating third-party services and APIs.",
        "Gathering and refining requirements; supporting interface design and user experience decisions.",
        "Functional QA, cross-module testing and bug fixing; took part in the full development cycle of a multitenant accommodation booking application, in testing when the contract ended.",
      ] },
      "Universidad de La Guajira": { unit: "Vice-Rector’s Office for Teaching", bullets: [
        "Development and technical evolution of the Ejercitador Saber Pro platform on an existing codebase (Django, FastAPI, React, MySQL).",
        "Functional and technical QA, cross-module testing and bug fixing.",
        "Refactoring components of the existing architecture.",
      ] },
    },
    projectRole: "Built jointly in a two-developer team: requirements, architecture, data modeling, backend, frontend, authentication and authorization (RBAC), multitenancy, testing, documentation and deployment.",
    more: "More projects at",
    saber: "Saber Pro: overall score 188 · English 181",
    education: ["Tenth semester · Expected graduation: first half of 2027", "Completed"],
    courses: [
      ["Professional TypeScript", "Código Facilito · Nov 2025"],
      ["Software architecture fundamentals", "Código Facilito · Nov 2025"],
      ["Oracle APEX application development", "Udemy · Mar 2026"],
      ["Introduction to Machine Learning", "Código Facilito · Jun 2026"],
    ],
    languages: [["Spanish", "Native"], ["English", "B2 · Saber Pro"]],
  },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function render(lang) {
  const t = dict[lang], x = CV_EXTRA[lang], h = x.headings;
  const monthYear = (iso) => {
    const s = new Intl.DateTimeFormat(lang, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const wayra = t.projects.items[0];
  const [eng, tech] = t.education.programs;
  const section = (title, body) => `<section><h2>${esc(title)}</h2>${body}</section>`;
  const entry = ({ title, org, meta, period, body }) => `
    <div class="entry">
      <div class="entry-head"><h3>${title}</h3><span class="period">${esc(period)}</span></div>
      ${org ? `<p class="org">${org}${meta ? ` <span class="meta">· ${meta}</span>` : ""}</p>` : ""}
      ${body}
    </div>`;
  const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

  const jobs = t.experience.jobs.map((job) => { const extra = x.jobs[job.org]; return entry({
    title: esc(job.role),
    org: esc(job.org) + (extra?.unit ? ` · ${esc(extra.unit)}` : ""),
    meta: esc(job.mode ?? ""),
    period: `${job.start ? monthYear(job.start) : ""} – ${job.end ? monthYear(job.end) : t.experience.present}`,
    body: list(extra?.bullets ?? []),
  }); }).join("") + (eng.role ? entry({ title: esc(eng.role.t), org: esc(eng.school), period: eng.role.period, body: `<p>${esc(eng.role.d)}</p>` }) : "");

  const project = entry({
    title: `${esc(wayra.name)} <span class="tag">${esc(wayra.status)}</span>`,
    org: "",
    period: "",
    body: `<p>${esc(wayra.desc)} ${esc(x.projectRole)}</p>
      <p class="tech">${wayra.stack.map(esc).join(" · ")}</p>
      <p class="links"><a href="${wayra.links.demo}">${bare(wayra.links.demo)}</a> · <a href="${wayra.links.repo}">${bare(wayra.links.repo)}</a> · ${esc(x.more)} <a href="${CONTACT.github}">${bare(CONTACT.github)}</a></p>`,
  });

  const education = [eng, tech].map((p, i) => entry({
    title: esc(p.degree), org: esc(p.school), meta: esc(x.education[i]), period: p.period, body: "",
  })).join("");

  const achievements = list([
    ...t.achievements.items.map((a) => `${a.result} — ${a.t} (${a.meta})`),
    x.saber,
  ]);

  const levels = t.stack.levels;
  const stack = t.stack.groups.map((g) => `
    <div class="group"><h4>${esc(g.name)}</h4>
      <p>${g.items.map(([n, l]) => l === "p" ? `<strong>${esc(n)}</strong>` : esc(n)).join(", ")}</p></div>`).join("");

  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><title>Cristian Ramirez — CV</title>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=block" rel="stylesheet">
<style>
  @page { size: Letter; margin: 0; }
  :root { --fg: #2a2c31; --muted: #5d626c; --primary: #2f5bd3; --border: #e3e1dc; --surface: #f6f5f2; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 8.5in; height: 11in; }
  body { font: 9.2pt/1.4 "Geist", system-ui, sans-serif; color: var(--fg); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { display: grid; grid-template-columns: 1fr 2.25in; height: 11in; }
  main { padding: 0.42in 0.32in 0.3in 0.55in; }
  aside { background: var(--surface); border-left: 1px solid var(--border); padding: 0.42in 0.4in 0.3in 0.3in; }
  header { border-bottom: 2px solid var(--primary); padding-bottom: 9pt; margin-bottom: 10pt; }
  h1 { font-size: 24pt; font-weight: 600; letter-spacing: -0.03em; line-height: 1.05; }
  .role { font-family: "Geist Mono", monospace; font-size: 9pt; letter-spacing: 0.08em; text-transform: uppercase; color: var(--primary); margin-top: 5pt; }
  .contact { margin-top: 7pt; font-size: 8.6pt; color: var(--muted); }
  .contact a { color: var(--fg); white-space: nowrap; }
  .contact.remote { margin-top: 2pt; }
  a { color: var(--primary); text-decoration: none; }
  section { margin-bottom: 9pt; }
  h2 { font-family: "Geist Mono", monospace; font-size: 8pt; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); border-bottom: 1px solid var(--border); padding-bottom: 3pt; margin-bottom: 6pt; }
  .entry { margin-bottom: 6pt; break-inside: avoid; }
  .entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8pt; }
  h3 { font-size: 10.2pt; font-weight: 600; }
  .period { font-family: "Geist Mono", monospace; font-size: 7.8pt; color: var(--muted); white-space: nowrap; }
  .org { font-size: 8.8pt; font-weight: 500; color: var(--fg); margin-top: 1pt; }
  .meta { font-weight: 400; color: var(--muted); }
  .tag { font-family: "Geist Mono", monospace; font-size: 7pt; font-weight: 500; color: var(--primary); border: 1px solid #b9c7ef; border-radius: 3pt; padding: 0 3pt; margin-left: 4pt; vertical-align: 1pt; }
  ul { margin-top: 3pt; padding-left: 10pt; }
  li { margin-bottom: 1.5pt; }
  li::marker { color: var(--primary); }
  .entry p { margin-top: 3pt; }
  .tech { font-family: "Geist Mono", monospace; font-size: 8pt; color: var(--muted); }
  .links { font-size: 8.4pt; color: var(--muted); }
  aside section { margin-bottom: 11pt; }
  .group { margin-bottom: 6pt; }
  h4 { font-size: 8.4pt; font-weight: 600; }
  .group p, .small { font-size: 8.5pt; color: var(--muted); }
  .group strong { color: var(--fg); font-weight: 600; }
  .item { margin-bottom: 5pt; font-size: 8.5pt; }
  .item span { display: block; color: var(--muted); font-size: 8pt; }
  .legend { font-size: 7.6pt; color: var(--muted); margin-top: 2pt; }
</style></head>
<body><div class="page">
  <main>
    <header>
      <h1>${esc(CONTACT.name)}</h1>
      <p class="role">${esc(t.hero.label)}</p>
      <p class="contact"><a href="mailto:${CONTACT.email}">${CONTACT.email}</a> · <a href="${CONTACT.linkedin}">linkedin.com/in/cristian-daniel-ramirez-vega</a> · <a href="${CONTACT.github}">${bare(CONTACT.github)}</a></p>
      <p class="contact remote"><a href="${SITE_URL}">${bare(SITE_URL)}</a> · ${esc(t.contact.remote)}</p>
    </header>
    ${section(h.profile, `<p>${esc(x.profile)}</p>`)}
    ${section(h.experience, jobs)}
    ${section(h.projects, project)}
    ${section(h.education, education)}
  </main>
  <aside>
    ${section(h.stack, stack + `<p class="legend"><strong>${esc(levels.p)}</strong> ${lang === "es" ? "en negrita" : "in bold"}</p>`)}
    ${section(h.concepts, `<p class="small">${t.stack.concepts.map(esc).join(" · ")}</p>`)}
    ${section(h.achievements, `<div class="small">${achievements}</div>`)}
    ${section(h.courses, x.courses.map(([n, m]) => `<div class="item">${esc(n)}<span>${esc(m)}</span></div>`).join(""))}
    ${section(h.languages, x.languages.map(([n, m]) => `<div class="item">${esc(n)}<span>${esc(m)}</span></div>`).join(""))}
  </aside>
</div></body></html>`;
}

mkdirSync(OUT_DIR, { recursive: true });
const tmp = join(tmpdir(), `cv-build-${process.pid}`);
mkdirSync(tmp, { recursive: true });
for (const lang of ["es", "en"]) {
  const html = join(tmp, `cv-${lang}.html`);
  writeFileSync(html, render(lang));
  const pdf = join(OUT_DIR, CV_FILES[lang]);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", `--user-data-dir=${join(tmp, "profile")}`, "--no-pdf-header-footer",
    "--virtual-time-budget=10000", `--print-to-pdf=${pdf}`, `file:///${html.replace(/\\/g, "/")}`], { stdio: "ignore" });
  console.log("✔", pdf);
}
rmSync(tmp, { recursive: true, force: true });
