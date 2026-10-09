import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { dict } from "@/lib/i18n";
import { SITE_URL } from "@/lib/brand";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a case study page for every featured project", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    for (const { slug } of dict.es.projects.items) {
      expect(router.matchRoutes(`/proyectos/${slug}`).at(-1)?.routeId).toBe("/proyectos/$slug");
    }
  });

  it("lists every page in the sitemap, on the public site address", () => {
    const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

    expect(locs).toEqual([`${SITE_URL}/`, ...dict.es.projects.items.map((p) => `${SITE_URL}/proyectos/${p.slug}`)]);
  });

  it("uses the same project slugs in both languages", () => {
    expect(dict.en.projects.items.map((p) => p.slug)).toEqual(dict.es.projects.items.map((p) => p.slug));
  });
});
