"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { SessionProgress } from "@/components/SessionProgress";


type ExerciseType = "warmup" | "rhythm" | "chords" | "coordination" | "song";
type Difficulty = "easy" | "medium" | "hard";

interface PianoExercise {
  id: string;
  type: ExerciseType;
  title: string;
  description: string;
  duration: number;
  difficulty: Difficulty;
}

interface SessionPlan {
  summary: string;
  goals: string[];
  exercises: PianoExercise[];
  tips: string[];
  questions: string[];
  meta?: {
    session: number;
    sessionTitle: string;
  };
}

type FeedbackLevel = "facile" | "moyen" | "difficile" | "impossible" | "Aucun";

export default function SessionPage() {
  const [session, setSession] = useState<SessionPlan | null>(null);
  const [history, setHistory] = useState<SessionPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFeedback, setLastFeedback] = useState<FeedbackLevel>("Aucun");
  const [availableMinutes, setAvailableMinutes] = useState(20);
  const [manualSession, setManualSession] = useState(1);

  async function fetchSession(feedback: FeedbackLevel = "Aucun") {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history,
          feedback,
          availableMinutes,
          profile: { dailyMinutes: availableMinutes },
          currentSession: manualSession,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur inconnue");
      }

      const data: SessionPlan = await res.json();
      setSession(data);
      console.log(data)
      setLastFeedback(feedback);


      // Ajoute la séance à l'historique local
      setHistory((prev) => [...prev, data]);

      // Sauvegarder dans Supabase (plan complet + feedback + durée)
      supabase
        .from("sessions")
        .insert({
          feedback,
          available_minutes: availableMinutes,
          plan: data,
          week: data.meta?.session || manualSession,
        })
        .then(({ error }) => {
          if (error) {
            console.error("Erreur Supabase insert:", error.message);
          }
        });
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Erreur pendant la génération de la séance");
    } finally {
      setLoading(false);
    }
  }

  async function computeSuggestedWeekFromHistory() {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .select("week, feedback")
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Erreur Supabase (computeSuggestedWeek):", error.message);
        return;
      }

      if (!data || data.length === 0) {
        // Aucune séance encore → démarrer en semaine 1
        setManualSession(1);
        return;
      }

      const last = data[0];
      const lastWeek = last.week ?? 1;
      const lastFeedback = (last.feedback as FeedbackLevel) || "Aucun";

      // Logique simple :
      // - si la dernière séance était "facile" ou "moyen" → on peut proposer la semaine suivante
      // - sinon, on reste sur la même semaine
      let suggestedWeek = lastWeek;

      if (lastFeedback === "facile" || lastFeedback === "moyen") {
        suggestedWeek = Math.min(lastWeek + 1, 12);
      }

      setManualSession(suggestedWeek);

    } catch (e) {
      console.error("Erreur computeSuggestedWeekFromHistory:", e);
    }
  }

  function handleStart() {
    setHistory([]); // si tu veux recommencer depuis zéro
    fetchSession("Aucun");
  }

  function handleFeedbackClick(level: FeedbackLevel) {
    setLastFeedback(level);
    fetchSession(level);
  }

  useEffect(() => {
    computeSuggestedWeekFromHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              AI Piano Tutor <span className="text-purple-400">🎹</span>
            </h1>
            {session?.meta?.session && (
              <p className="text-xs text-purple-300 mt-1">
                Semaine {session.meta.session} — {session.meta.sessionTitle}
              </p>
            )}
            <p className="text-sm text-slate-400 mt-1">
              Tuteur de piano pour débutant total — chants chrétiens avec grilles
              d&apos;accords.
            </p>
          </div>
        </header>

        {/* Data */}
        <div className="flex items-center gap-3 my-3">
          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-300">
              Durée séance (min)
            </label>
            <input
              type="number"
              min={10}
              max={60}
              value={availableMinutes}
              onChange={(e) => setAvailableMinutes(Number(e.target.value))}
              className="w-20 rounded border border-slate-700 bg-slate-900 px-2 py-1 text-sm"
            />
          </div>
          {/* Contrôle de semaine */}
          <div className="flex items-center gap-2 mt-1 sm:mt-0">
            <button
              type="button"
              onClick={() =>
                setManualSession((w) => Math.max(1, w - 1))
              }
              className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-xs hover:border-purple-400"
            >
              «
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-slate-400">
                Semaine
              </span>
              <input
                type="number"
                min={1}
                max={12}
                value={manualSession}
                onChange={(e) =>
                  setManualSession(
                    Math.min(
                      12,
                      Math.max(1, Number(e.target.value) || 1)
                    )
                  )
                }
                className="w-14 rounded border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-center"
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setManualSession((w) => Math.min(12, w + 1))
              }
              className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-xs hover:border-purple-400"
            >
              »
            </button>
          </div>
        </div>
        {/* Progression 12 séances */}
        <SessionProgress
          currentSession={
            manualSession
          }
        />

        {/* Bouton démarrage */}
        {!loading && (
          <div className="mb-6 flex flex-wrap gap-3">
            {!manualSession && !session && (
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 shadow hover:bg-slate-700"
              >
                Démarrer une première séance
              </button>
            )}

            {manualSession && (
              <button
                onClick={() => {
                  fetchSession("Aucun"); // nouvelle séance sur la semaine détectée
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-purple-500"
              >
                Générer la séance (semaine {manualSession})
              </button>
            )}
          </div>
        )}


        {loading && (
          <p className="text-slate-300 mb-4">
            Génération de ta séance de piano… 🎶
          </p>
        )}

        {error && (
          <div className="mb-4 rounded border border-red-500 bg-red-950/40 px-4 py-3 text-sm text-red-100">
            Erreur : {error}
          </div>
        )}

        {/* Contenu de séance */}
        {session && (
          <div className="space-y-6">
            {/* Résumé & objectifs */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              {session.meta && (
                <p className="text-xs text-purple-300 mb-1">
                  séance {session.meta.session} — {session.meta.sessionTitle}
                </p>
              )}

              <h2 className="text-lg font-semibold mb-2">Résumé de la séance</h2>
              <p className="text-sm text-slate-200 mb-3">{session.summary}</p>

              {session.goals?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-1">
                    Objectifs du jour
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-200">
                    {session.goals.map((goal, idx) => (
                      <li key={idx}>{goal}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Exercices */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Exercices 🎧</h2>
              <div className="space-y-3">
                {session.exercises?.map((ex) => (
                  <article
                    key={ex.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm">{ex.title}</h3>
                      <span className="text-[11px] uppercase tracking-wide text-slate-400">
                        {ex.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-200 mb-3">
                      {ex.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Durée : {ex.duration} min</span>
                      <span>Difficulté : {ex.difficulty}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Conseils */}
            {session.tips?.length > 0 && (
              <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <h2 className="text-lg font-semibold mb-2">Conseils 🎯</h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-200">
                  {session.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Questions / réflexion */}
            {session.questions?.length > 0 && (
              <section className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4">
                <h2 className="text-sm font-semibold text-slate-300 mb-2">
                  Questions pour toi 🧠
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-200">
                  {session.questions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Feedback */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h2 className="text-sm font-semibold text-slate-200 mb-2">
                Comment s&apos;est passée cette séance ?
              </h2>
              <p className="text-xs text-slate-400 mb-3">
                Ton feedback permet à l&apos;IA d&apos;adapter la prochaine séance
                (plus simple, identique ou plus difficile).
              </p>

              <div className="flex flex-wrap gap-2">
                {(["facile", "moyen", "difficile", "impossible"] as FeedbackLevel[]).map(
                  (level) => (
                    <button
                      key={level}
                      onClick={() => handleFeedbackClick(level)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border ${lastFeedback === level
                        ? "bg-purple-500 border-purple-400 text-white"
                        : "bg-slate-900 border-slate-700 text-slate-200 hover:border-purple-400"
                        }`}
                    >
                      {level}
                    </button>
                  )
                )}
              </div>

              <p className="text-[11px] text-slate-500 mt-3">
                La prochaine séance sera générée en fonction de ton ressenti.
              </p>
            </section>

            {/* Bouton recommencer à zéro */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => handleStart()}
                className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-200"
              >
                Recommencer depuis zéro
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
