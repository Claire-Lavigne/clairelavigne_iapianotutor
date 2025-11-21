"use client";

import { pianoLearningPlan } from "@/lib/learningPlan";

interface SessionProgressProps {
  currentSession: number;
}

export function SessionProgress({ currentSession }: SessionProgressProps) {
  const totalSessions = pianoLearningPlan.length;

  const clampedSession = Math.min(
    Math.max(currentSession || 1, 1),
    totalSessions
  );

  return (
    <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Progression 12 séances
          </h2>
          <p className="text-[11px] text-slate-400">
            Tu es actuellement en séance {clampedSession} sur {totalSessions}.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {pianoLearningPlan.map((session) => {
          const isPast = session.session < clampedSession;
          const isCurrent = session.session === clampedSession;

          return (
            <div key={session.session} className="flex flex-col items-center min-w-[40px]">
              {/* le rond */}
              <div
                className={[
                  "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-semibold border",
                  isCurrent
                    ? "bg-purple-500 border-purple-300 text-white shadow"
                    : isPast
                      ? "bg-slate-100 border-slate-300 text-slate-900"
                      : "bg-slate-900 border-slate-600 text-slate-300",
                ].join(" ")}
              >
                {session.session}
              </div>
              {/* le petit label dessous */}
              <span className="mt-1 text-[9px] text-center text-slate-400 max-w-[70px]">
                {session.title.split(" ")[0]}{/* 1er mot du titre, pour rester compact */}
              </span>
            </div>
          );
        })}
      </div>

      {/* petite barre de progression globale */}
      <div className="mt-3 h-1 w-full rounded-full bg-slate-800">
        <div
          className="h-1 rounded-full bg-purple-500"
          style={{
            width: `${(clampedSession / totalSessions) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
