// app/api/tutor/route.ts

import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { tutorSystemPrompt } from "@/lib/tutorPrompt";
import { getSessionPlan, pianoLearningPlan } from "@/lib/learningPlan";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      history = [],            // historique des séances précédentes (SessionPlan[])
      feedback = "Aucun",      // facile / moyen / difficile / impossible / Aucun
      availableMinutes = 20,   // temps dispo pour la séance du jour
      profile = { dailyMinutes: 20 },
      currentSession,             // optionnel : peut être passé depuis le front plus tard
    } = body || {};

    // Déterminer la séance actuelle :
    // - si currentSession est fourni -> on l'utilise
    // - sinon -> on prend history.length + 1
    const inferredSession =
      typeof currentSession === "number"
        ? currentSession
        : history.length + 1 || 1;

    const progression = getSessionPlan(inferredSession);

    const systemPrompt = tutorSystemPrompt.replace(
      "un certain nombre de minutes par jour",
      `${profile.dailyMinutes ?? progression.suggestedMinutesPerDay} minutes par jour`
    );

    // On donne à l'IA un contexte clair sur la séance et ses objectifs
    const userPrompt = `
Contexte progression 12 séances :
- Nombre total de séances dans le plan : ${pianoLearningPlan.length}
- séance actuelle : ${progression.session}
- Titre de la séance : ${progression.title}
- Résumé de la séance : ${progression.summary}
- Points de focus de la séance :
${progression.focus.map((f, i) => `  ${i + 1}. ${f}`).join("\n")}
- Résultat visé à la fin de cette séance : ${progression.targetResult}

Historique (séances précédentes) :
${JSON.stringify(history, null, 2)}

Feedback de la dernière séance :
${feedback}

Temps disponible aujourd'hui :
${availableMinutes} minutes

Ta tâche :
- Générer une nouvelle séance qui reste cohérente avec la séance actuelle (${progression.session}) et ses objectifs.
- Respecter le format JSON imposé dans le prompt système (summary, goals, exercises, tips, questions).
- Adapter la difficulté en fonction du feedback fourni.
    `;

    const completion = await client.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Réponse vide du modèle Groq" },
        { status: 500 }
      );
    }

    const sessionPlan = JSON.parse(content);

    // On peut retourner aussi la séance actuelle pour l'UI
    return NextResponse.json({
      ...sessionPlan,
      meta: {
        session: sessionPlan.session,
        sessionTitle: sessionPlan.title,
      },
    });
  } catch (error: any) {
    console.error("Erreur /api/tutor :", error);

    return NextResponse.json(
      {
        error: "Erreur côté serveur dans /api/tutor",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
