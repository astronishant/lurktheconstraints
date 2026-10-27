import { createHash } from "node:crypto";
import { COHORT_MISSION_IDS } from "@/lib/challenges";
export { COHORT_MISSION_IDS } from "@/lib/challenges";

export const COHORT = {
  id: "lurk",
  name: "Lurk the Constraints",
  startsAt: Date.parse(process.env.COHORT_STARTS_AT ?? "2000-01-01T00:00:00Z"),
  endsAt: Date.parse(process.env.COHORT_ENDS_AT ?? "2099-12-31T23:59:59Z"),
};

const FIRST_THREE = COHORT_MISSION_IDS.slice(0, 3);

export function getTier(solvedChallenges: string[]): "Full" | "Core" | "Starter" | null {
  const solved = new Set(solvedChallenges.filter((id) => COHORT_MISSION_IDS.some((missionId) => missionId === id)));
  if (solved.size === COHORT_MISSION_IDS.length) return "Full";
  if (solved.size >= 8) return "Core";
  if (FIRST_THREE.every((id) => solved.has(id))) return "Starter";
  return null;
}

export function defaultCohortHandle(uid: string) {
  return `Player-${createHash("sha256").update(uid).digest("hex").slice(0, 13)}`;
}

const IMPERSONATION = /(?:admin|administrator|moderator|official|organizer|support|staff|firebase|google|fuck|shit|bitch|nigger)/i;

export function googleFirstName(name: unknown) {
  if (typeof name !== "string") return null;
  const first = name.trim().split(/\s+/)[0]
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}_.-]/gu, "")
    .replace(/^[^\p{L}\p{N}]+/u, "")
    .slice(0, 16);
  return first && !IMPERSONATION.test(first) ? first : null;
}

export function cohortHandleCandidates(name: unknown, uid: string) {
  const base = googleFirstName(name);
  return base
    ? [base, ...Array.from({ length: 8 }, (_, i) => `${base} ${i + 2}`), defaultCohortHandle(uid)]
    : [defaultCohortHandle(uid)];
}

export function inCohortWindow(now: number) {
  return now >= COHORT.startsAt && now <= COHORT.endsAt;
}
