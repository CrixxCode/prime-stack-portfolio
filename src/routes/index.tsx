import { createFileRoute } from "@tanstack/react-router";
import { SiteProvider } from "@/lib/site";
import type { Lang } from "@/lib/i18n";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { BrandBanner } from "@/components/site/Brand";
import { About, Projects, Stack, Experience, Education, GitHubPanel, Services, Blog, Contact, Footer } from "@/components/site/Sections";

const title = "Cristian Ramirez — Full-Stack Developer (Django + Angular)";
const descriptions: Record<Lang, string> = {
  es: "Portafolio de Cristian Ramirez, Full-Stack Developer: productos digitales de principio a fin con Django, Angular, .NET, React y PostgreSQL.",
  en: "Portfolio of Cristian Ramirez, Full-Stack Developer: end-to-end digital products with Django, Angular, .NET, React and PostgreSQL.",
};

export const Route = createFileRoute("/")({
  // ?lang=en|es makes the language linkable (e.g. send the English version to a recruiter)
  validateSearch: (search: Record<string, unknown>): { lang?: Lang } => {
    const lang = search["lang"];
    return lang === "en" || lang === "es" ? { lang } : {};
  },
  head: ({ match }) => {
    const description = descriptions[match.search.lang ?? "es"];
    return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    };
  },
  component: Index,
});

function Index() {
  const { lang } = Route.useSearch();
  return (
    <SiteProvider initialLang={lang}>
      <Nav />
      <main id="main">
        <Hero />
        <BrandBanner />
        <Projects />
        <About />
        <Stack />
        <Experience />
        <Education />
        <GitHubPanel />
        <Services />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </SiteProvider>
  );
}
