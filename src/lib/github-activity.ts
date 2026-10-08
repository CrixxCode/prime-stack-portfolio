import { createServerFn } from "@tanstack/react-start";

// Real public GitHub activity for the portfolio's GitHub section. Never invented: if GitHub can't be
// reached, the function returns null and the section simply doesn't render the activity block.
//
// Sources, in order:
//  1. GraphQL API, when a GITHUB_TOKEN secret is configured (official and most reliable; a fine-grained
//     token with no repository permissions is enough for public data).
//  2. The public contributions page (github.com/users/<user>/contributions), which needs no setup.
// Results are cached for 24h per server instance so visits don't hit GitHub.

export type ActivityLevel = 0 | 1 | 2 | 3 | 4;
export type GithubActivity = {
  /** Contributions in the last year, as GitHub reports them. */
  total: number;
  /** Public repositories owned by the user; null when it couldn't be read. */
  publicRepos: number | null;
  /** Where the data came from: "graphql" (GITHUB_TOKEN in use) or "public-page" (no token). */
  source: "graphql" | "public-page";
  /** One entry per day of the last year (oldest first). */
  days: { date: string; level: ActivityLevel }[];
};

const USER = "CrixxCode";
const TTL_MS = 24 * 60 * 60 * 1000;
const TIMEOUT_MS = 6000;
const HEADERS = { "User-Agent": "prime-stack-portfolio", Accept: "application/vnd.github+json" };

let cache: { at: number; data: GithubActivity } | null = null;

const env = (key: string): string | undefined =>
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.[key];

const LEVELS: Record<string, ActivityLevel> = {
  NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4,
};

async function fromGraphQL(token: string): Promise<GithubActivity> {
  const query = `query($login: String!) { user(login: $login) {
    repositories(privacy: PUBLIC, ownerAffiliations: OWNER) { totalCount }
    contributionsCollection { contributionCalendar { totalContributions
      weeks { contributionDays { date contributionLevel } } } } } }`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...HEADERS, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: USER } }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
  const json = (await res.json()) as {
    data?: { user?: {
      repositories: { totalCount: number };
      contributionsCollection: { contributionCalendar: { totalContributions: number;
        weeks: { contributionDays: { date: string; contributionLevel: string }[] }[] } };
    } };
  };
  const user = json.data?.user;
  if (!user) throw new Error("GitHub GraphQL: no user data");
  const calendar = user.contributionsCollection.contributionCalendar;
  return {
    source: "graphql",
    total: calendar.totalContributions,
    publicRepos: user.repositories.totalCount,
    days: calendar.weeks.flatMap((w) => w.contributionDays).map((d) => ({ date: d.date, level: LEVELS[d.contributionLevel] ?? 0 })),
  };
}

async function fromPublicPage(): Promise<GithubActivity> {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, {
    headers: { "User-Agent": HEADERS["User-Agent"] },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`GitHub contributions page ${res.status}`);
  const html = await res.text();
  const days: GithubActivity["days"] = [];
  for (const [cell] of html.matchAll(/<td[^>]*\bdata-date="[^"]+"[^>]*>/g)) {
    const date = /data-date="(\d{4}-\d{2}-\d{2})"/.exec(cell)?.[1];
    const level = Number(/data-level="(\d)"/.exec(cell)?.[1] ?? NaN);
    if (date && level >= 0 && level <= 4) days.push({ date, level: level as ActivityLevel });
  }
  const total = Number(/([\d,]+)\s+contributions?\s+in the last year/.exec(html.replace(/\s+/g, " "))?.[1]?.replace(/,/g, "") ?? NaN);
  if (days.length < 300 || !Number.isFinite(total)) throw new Error("GitHub contributions page: unexpected format");
  days.sort((a, b) => a.date.localeCompare(b.date));
  return { source: "public-page", total, publicRepos: await publicRepos(), days };
}

async function publicRepos(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}`, { headers: HEADERS, signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) return null;
    const json = (await res.json()) as { public_repos?: number };
    return typeof json.public_repos === "number" ? json.public_repos : null;
  } catch {
    return null;
  }
}

export const getGithubActivity = createServerFn({ method: "GET" }).handler(async (): Promise<GithubActivity | null> => {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  try {
    const token = env("GITHUB_TOKEN");
    const data = token ? await fromGraphQL(token).catch(() => fromPublicPage()) : await fromPublicPage();
    cache = { at: Date.now(), data };
    return data;
  } catch {
    // Keep serving the last good data if there is any; otherwise show nothing rather than invent.
    return cache?.data ?? null;
  }
});
