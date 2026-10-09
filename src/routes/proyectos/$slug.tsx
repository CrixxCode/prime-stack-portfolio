import { createFileRoute, getRouteApi, notFound } from "@tanstack/react-router";
import { SiteProvider } from "@/lib/site";
import { dict, parseLangSearch, type Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/brand";
import { Nav } from "@/components/site/Nav";
import { CaseStudy } from "@/components/site/CaseStudy";
import { Footer } from "@/components/site/Sections";

// One page per featured project; slugs come from the projects in i18n.ts (the same in both languages).
export const Route = createFileRoute("/proyectos/$slug")({
  validateSearch: parseLangSearch,
  loader: ({ params }) => {
    if (!dict.es.projects.items.some((p) => p.slug === params.slug)) throw notFound();
  },
  head: ({ match, matches }) => {
    const detected = (matches[0]?.loaderData as { lang?: Lang } | undefined)?.lang;
    const project = dict[match.search.lang ?? detected ?? "es"].projects.items.find((p) => p.slug === match.params.slug);
    if (!project) return {};
    const title = `${project.name} — Cristian Ramirez`;
    const path = `${SITE_URL}/proyectos/${project.slug}`;
    // Canonical URL per language version (?lang=), plus hreflang alternates, as on the home page
    const url = match.search.lang ? `${path}?lang=${match.search.lang}` : path;
    // Replaces the site-wide share image (same property names win over the root's) when the project has its own
    const image = project.shareImage;
    return {
      meta: [
        { title },
        { name: "description", content: project.desc },
        { property: "og:title", content: title },
        { property: "og:description", content: project.desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(image ? [
          { property: "og:image", content: `${SITE_URL}${image.path}` },
          { property: "og:image:width", content: String(image.width) },
          { property: "og:image:height", content: String(image.height) },
          { property: "og:image:alt", content: title },
          { name: "twitter:image", content: `${SITE_URL}${image.path}` },
        ] : []),
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "es", href: `${path}?lang=es` },
        { rel: "alternate", hrefLang: "en", href: `${path}?lang=en` },
        { rel: "alternate", hrefLang: "x-default", href: path },
      ],
    };
  },
  component: CaseStudyPage,
});

const rootApi = getRouteApi("__root__");

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const { lang } = Route.useSearch();
  const detected = rootApi.useLoaderData().lang;
  return (
    <SiteProvider initialLang={lang ?? detected}>
      <Nav onHome={false} />
      <main id="main"><CaseStudy slug={slug} /></main>
      <Footer />
    </SiteProvider>
  );
}
