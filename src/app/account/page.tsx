"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useCohortPlayer } from "@/hooks/useCohortPlayer";
import { isClientFirebaseConfigured } from "@/lib/firebase-client";

export default function AccountPage() {
  const cohortPlayer = useCohortPlayer();
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-transparent pt-16 text-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="mb-5 inline-flex rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300">
          Lurk the Constraints · Account
        </div>
        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
          Sign in. Start ranking.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
          Google sign-in unlocks ranked live sessions and puts your solves on the leaderboard under a public handle. Practice without an account stays free, anonymous, and unranked.
        </p>

        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Your profile</p>
          {!isClientFirebaseConfigured() ? (
            <>
              <p className="mt-2 text-2xl font-bold">Sign-in not configured yet</p>
              <p className="mt-2 text-sm text-slate-300">You can explore the missions anonymously now. Google sign-in will appear here once Firebase is connected.</p>
            </>
          ) : cohortPlayer.loading ? (
            <p className="mt-2 text-sm text-slate-300">{cohortPlayer.user ? "Setting up your profile…" : "Checking sign-in…"}</p>
          ) : !cohortPlayer.user ? (
            <>
              <p className="mt-2 text-sm text-slate-300">Sign in with Google to create your public leaderboard handle. You can still play anonymously.</p>
              <button onClick={() => void cohortPlayer.signIn().catch(() => setError("Google sign-in could not start"))}
                className="mt-4 min-h-11 rounded-lg bg-emerald-400 px-5 py-3 font-bold text-slate-950">Continue with Google</button>
              <p className="mt-3 text-xs text-slate-400">Your email stays private. Your Google first name appears publicly on the leaderboard.</p>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-slate-300">{cohortPlayer.handle ? `You're in as ${cohortPlayer.handle} (your Google first name, shown publicly). Your mission solves now count on the leaderboard.` : "Your profile is not ready yet."}</p>
              {!cohortPlayer.handle && <button onClick={cohortPlayer.retryJoin} className="mt-4 rounded-lg border border-emerald-400/50 px-4 py-2 text-sm text-emerald-300">Try registration again</button>}
            </>
          )}
          {(error || cohortPlayer.error) && <p role="alert" className="mt-3 text-sm text-red-300">{error || cohortPlayer.error}</p>}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <Link href="/challenges" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-400 px-5 py-3 font-bold text-slate-950 hover:bg-emerald-300">
              Explore the 16 missions →
            </Link>
            {cohortPlayer.user && (
              <button onClick={() => void cohortPlayer.signOut()}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/20 hover:text-red-200">
                <LogOut className="h-4 w-4" aria-hidden /> Sign out
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Starter · Level 3", "Complete levels 1–3"],
            ["Core · Level 8", "Complete any 8 missions"],
            ["Full · Level 16", "Complete all 16 missions"],
          ].map(([tier, rule]) => (
            <div key={tier} className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
              <h2 className="text-xl font-bold text-emerald-300">{tier}</h2>
              <p className="mt-2 text-sm text-slate-300">{rule}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 rounded-xl border border-slate-700 p-5 sm:grid-cols-2 sm:p-7">
          <div>
            <h2 className="text-xl font-bold">How ranked play works</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">Signed-in, server-run live sessions earn base points on the leaderboard. One credited solve per mission. Hints are free and do not reduce base points.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Rules and privacy</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">Attack only this CTF. Never test prompts against real systems or other people&apos;s accounts. Your email is stored privately and never appears on the leaderboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
