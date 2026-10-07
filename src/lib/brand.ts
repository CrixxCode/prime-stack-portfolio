// Personal brand assets. Originals live in /public/brand/; the files used here are
// web-optimized copies in /public/brand/web/ (transparent margin trimmed, ignoring
// near-invisible specks; resized to 2× their display size; WebP). Each asset has a variant per theme:
//   light → artwork for light backgrounds (dark ink), shown in the light theme
//   dark  → artwork for dark backgrounds (white ink), shown in the dark theme
// Set both paths to "" to show a dashed placeholder instead.
/** Public address of the site, without trailing slash (e.g. "https://cristianramirez.dev").
 *  Social networks need absolute URLs for the share preview image. */
export const SITE_URL = "";

/** Share preview (Open Graph / X), 1200×630, generated from the dark horizontal logo. */
export const OG_IMAGE = { path: "/og-image.png", width: 1200, height: 630 } as const;

export const BRAND = {
  /** Icon mark. Shown in the nav and footer. */
  logo: { light: "/brand/web/logo.webp", dark: "/brand/web/logo-oscuro.webp", width: 128, height: 128 },
  /** Horizontal logo (mark + name + role). Shown below the hero. */
  banner: {
    light: { src: "/brand/web/logo-horizontal.webp", width: 1120, height: 323 },
    dark: { src: "/brand/web/logo-horizontal-oscuro.webp", width: 1120, height: 263 },
  },
};
