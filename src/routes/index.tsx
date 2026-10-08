import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { SiteProvider } from "@/lib/site";
import type { Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/brand";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { BrandBanner } from "@/components/site/Brand";
import { About, Projects, Stack, Experience, Education, GitHubPanel, Services, Blog, Contact, Footer } from "@/components/site/Sections";

const title = "Cristian Ramirez — Full-Stack Developer";
const descriptions: Record<Lang, string> = {
  es: "Portafolio de Cristian Ramirez, Full-Stack Developer enfocado en la construcción de productos web de principio a fin, desde requisitos y arquitectura hasta backend, frontend y experiencia de usuario.",
  en: "Portfolio of Cristian Ramirez, a Full-Stack Developer focused on building web products end to end, from requirements and architecture to backend, frontend and user experience.",
};

export const Route = createFileRoute("/")({
  // ?lang=en|es makes the language linkable (e.g. send the English version to a recruiter)
  validateSearch: (search: Record<string, unknown>): { lang?: Lang } => {
    const lang = search["lang"];
    return lang === "en" || lang === "es" ? { lang } : {};
  },
  head: ({ match, matches }) => {
    const detected = (matches[0]?.loaderData as { lang?: Lang } | undefined)?.lang;
    const description = descriptions[match.search.lang ?? detected ?? "es"];
    // Canonical URL per language version (?lang=), plus hreflang alternates so search engines pair them
    const url = match.search.lang ? `${SITE_URL}/?lang=${match.search.lang}` : `${SITE_URL}/`;
    return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: url },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "es", href: `${SITE_URL}/?lang=es` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/?lang=en` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` },
    ],
    };
  },
  component: Index,
});

const rootApi = getRouteApi("__root__");

function Index() {
  const { lang } = Route.useSearch();
  const detected = rootApi.useLoaderData().lang;
  return (
    <SiteProvider initialLang={lang ?? detected}>
      <Nav />
      <main id="main">
        <Hero />
        <BrandBanner />
        <Projects />
        <Experience />
        <About />
        <Stack />
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
