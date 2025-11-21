import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function GET() {
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const completion = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "Tu es un test." },
      { role: "user", content: "Dis-moi hello." }
    ]
  });

  return NextResponse.json({
    result: completion.choices[0].message.content
  });
}
