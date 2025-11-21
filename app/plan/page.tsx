"use client";

import { pianoLearningPlan } from "@/lib/learningPlan";

export default function PlanPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Plan d&apos;apprentissage 12 semaines 🎹
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Progression pensée pour passer de débutant total à un accompagnement
              worship fluide avec grilles d&apos;accords.
            </p>
          </div>

          <a
            href="/session"
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white shadow hover:bg-purple-500"
          >
            Aller à la séance du jour
          </a>
        </header>

        {/* Liste des séances */}
        <div className="space-y-4">
          {pianoLearningPlan.map((plan) => (
            <article
              key={plan.session}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-2">
                <h2 className="text-lg font-semibold">
                  Séance {plan.session} — {plan.title}
                </h2>
                <span className="text-[11px] text-slate-400">
                  ~ {plan.suggestedMinutesPerDay} min / jour
                </span>
              </div>

              <p className="text-sm text-slate-200 mb-2">{plan.summary}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* Focus */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
                    Focus de la séance
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-200">
                    {plan.focus.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Résultat attendu */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
                    Résultat visé
                  </h3>
                  <p className="text-xs text-slate-200">
                    {plan.targetResult}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
