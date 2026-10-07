import { createFileRoute } from "@tanstack/react-router";
import { SiteProvider } from "@/lib/site";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { BrandBanner } from "@/components/site/Brand";
import { About, Projects, Stack, Experience, Education, GitHubPanel, Services, Blog, Contact, Footer } from "@/components/site/Sections";

const title = "Cristian Ramirez — Full-Stack Developer (Django + Angular)";
const description = "Portafolio de Cristian Ramirez, Full-Stack Developer: productos digitales de principio a fin con Django, Angular, .NET, React y PostgreSQL.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteProvider>
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
