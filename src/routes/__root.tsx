import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { THEME_COLORS } from "../lib/site";
import { dict, type Lang } from "../lib/i18n";
import { detectLang } from "../lib/prefs";
import { OG_IMAGE, SITE_URL } from "../lib/brand";

// Language of the current page: ?lang= wins, otherwise what the root loader detected (cookie / browser).
function useLang(): Lang {
  return useRouterState({
    select: (s) => {
      const q = (s.location.search as { lang?: string }).lang;
      if (q === "en" || q === "es") return q;
      return (s.matches[0]?.loaderData as { lang?: Lang } | undefined)?.lang ?? "es";
    },
  });
}

function NotFoundComponent() {
  const e = dict[useLang()].errors;
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{e.notFound}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {e.notFoundText}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {e.home}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  const e = dict[useLang()].errors;
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {e.failed}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {e.failedText}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {e.retry}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {e.home}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cristian Ramirez — Full-Stack Developer" },
      { name: "description", content: "Portafolio de Cristian Ramirez, Full-Stack Developer enfocado en la construcción de productos web de principio a fin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: `${SITE_URL}${OG_IMAGE.path}` },
      { property: "og:image:width", content: String(OG_IMAGE.width) },
      { property: "og:image:height", content: String(OG_IMAGE.height) },
      { property: "og:image:alt", content: "Cristian Ramirez — Full-Stack Developer" },
      { name: "twitter:image", content: `${SITE_URL}${OG_IMAGE.path}` },
      ...(SITE_URL ? [{ property: "og:url", content: SITE_URL }] : []),
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@1&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  // Runs on the server for the first render, so the page arrives in the visitor's language.
  loader: () => ({ lang: detectLang() }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// Runs before the first paint: the `js` class lets CSS hide `.reveal` content only when JS runs (see styles.css);
// the theme class and <meta name="theme-color"> come from the saved theme, so neither flashes the wrong color.
const themeScript = `(function(){var d=document.documentElement,t;d.classList.add('js');try{t=localStorage.getItem('theme')}catch(e){}var dark=t!=='light';if(dark)d.classList.add('dark');var m=document.createElement('meta');m.name='theme-color';m.content=dark?'${THEME_COLORS.dark}':'${THEME_COLORS.light}';document.head.appendChild(m)})()`;

function RootShell({ children }: { children: ReactNode }) {
  // Server-render the right <html lang>; the client keeps it in sync afterwards.
  const lang = useLang();
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
