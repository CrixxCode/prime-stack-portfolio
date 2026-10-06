import { createFileRoute } from "@tanstack/react-router";
import { SiteProvider } from "@/lib/site";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About, Projects, Stack, Experience, Education, Achievements, GitHubPanel, Services, Blog, Contact, Footer } from "@/components/site/Sections";

const title = "Full-Stack Developer — Django + Angular";
const description = "Portafolio de un Full-Stack Developer: productos digitales de principio a fin con Django, Angular, .NET, React y PostgreSQL.";

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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Experience />
        <Education />
        <Achievements />
        <GitHubPanel />
        <Services />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </SiteProvider>
  );
}
