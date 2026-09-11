import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await request.json();

    const prompt = `
You are an AI Video Prompt Generator.

Create a detailed realistic AI video generation prompt.

Style: ${body.style || "honest-review"}
Language: ${body.language || "Taglish"}
Dialogue: ${body.dialogue ? "ON" : "OFF"}

Rules:
- Make cinematic realistic prompts.
- Keep character and product continuity.
- Include camera movement, actions, lighting, and sounds.
`;

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    return NextResponse.json({
      result: response.output_text,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate" },
      { status: 500 }
    );
  }
}
