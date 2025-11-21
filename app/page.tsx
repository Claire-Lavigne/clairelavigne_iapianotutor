"use client";

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function testTutor() {
    setLoading(true);
    const res = await fetch("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        history: [],
        feedback: "Aucun",
        availableMinutes: 20,
        profile: { dailyMinutes: 20 },
      }),
    });

    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return (
    <main className="p-6">
      <button
        onClick={testTutor}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Tester /api/tutor
      </button>

      {loading && <p className="mt-4">Chargement...</p>}

      {data && (
        <pre className="mt-4 bg-gray-900 text-green-300 text-xs p-4 rounded overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
