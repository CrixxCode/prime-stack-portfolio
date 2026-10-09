interface ImportMetaEnv {
  /** Umami website ID; visit stats are off when it is not set (see routes/__root.tsx). */
  readonly VITE_UMAMI_WEBSITE_ID?: string;
}

interface Window {
  /** Umami tracker, present only when the stats script loaded (not blocked, ID configured). */
  umami?: { track: (event: string, data?: Record<string, string | number>) => void };
}
