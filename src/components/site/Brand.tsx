import { useSite } from "@/lib/site";
import { BRAND } from "@/lib/brand";

// Both theme variants are rendered and CSS shows the right one, so switching theme is instant
// and there's no flash before hydration. loading="lazy" keeps the hidden variant from downloading.

/** Brand mark in the theme's variant, or a dashed placeholder until set. Decorative: the parent provides the name. */
export function BrandLogo({ className = "h-9 w-9" }: { className?: string }) {
  const { t } = useSite();
  const { light, dark, width, height } = BRAND.logo;
  if (light && dark)
    return (
      <span className={`${className} grid shrink-0 place-items-center`}>
        <img src={light} alt="" width={width} height={height} loading="lazy" className="h-[78%] w-auto dark:hidden" />
        <img src={dark} alt="" width={width} height={height} loading="lazy" className="hidden h-[78%] w-auto dark:block" />
      </span>
    );
  return (
    <span aria-hidden="true" className={`${className} grid shrink-0 place-items-center rounded-full border border-dashed border-border-strong font-mono text-[9px] uppercase text-muted-foreground`}>
      {t.brand.logo}
    </span>
  );
}

/** Horizontal logo below the hero in the theme's variant, or a dashed placeholder until set. */
export function BrandBanner() {
  const { t } = useSite();
  const { light, dark } = BRAND.banner;
  return (
    <div className="container-x pb-16">
      {light.src && dark.src ? (
        <div className="flex justify-center py-6 md:py-10">
          <img src={light.src} alt={t.brand.bannerAlt} width={light.width} height={light.height} loading="lazy" decoding="async" className="h-auto w-full max-w-[560px] dark:hidden" />
          <img src={dark.src} alt={t.brand.bannerAlt} width={dark.width} height={dark.height} loading="lazy" decoding="async" className="hidden h-auto w-full max-w-[560px] dark:block" />
        </div>
      ) : (
        <div aria-hidden="true" className="grid aspect-[4/1] w-full place-items-center rounded-2xl border border-dashed border-border-strong bg-surface/50 font-mono text-xs text-muted-foreground">
          <span>{t.brand.banner}</span>
        </div>
      )}
    </div>
  );
}
