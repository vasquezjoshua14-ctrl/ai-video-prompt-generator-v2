
import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey,
    });

    const formData = await request.formData();

    const style = String(formData.get("style") || "honest-review");
    const language = String(formData.get("language") || "Taglish");
    const dialogue = String(formData.get("dialogue")) === "true";

    const instructions = `
You are an elite AI Video Prompt Reverse Engineer and UGC Video Prompt Generator.

Create highly detailed realistic copy-paste-ready AI video generation prompts.

CORE RULES:
- Divide videos into sequential maximum 12-second sets.
- Preserve chronological continuity.
- Each set must be independently usable.
- Repeat important continuity details.

REFERENCE PRIORITY:
- Reference video controls action, timing, camera movement, pacing and scene structure.
- Images control appearance, outfit, products and visual assets.

DIALOGUE:
Style: ${style}
Language: ${language}
Dialogue: ${dialogue ? "ON" : "OFF"}

If dialogue is ON:
- Each 12-second set contains exactly 30 spoken words.
- Dialogue must sound natural.
- Match dialogue with visible actions.

If dialogue is OFF:
- No spoken dialogue.
- Use ambient sound and product sounds.

STRICT CONTINUITY:
- No face drift.
- No identity changes.
- No hairstyle changes.
- No wardrobe changes.
- No random accessories.
- No product mutation.
- No disappearing objects.
- No lighting flicker.
- No AI-looking skin.

OUTPUT FORMAT:

## VIDEO ANALYSIS

## VIDEO SETS
`;

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      instructions,
      input: `
Generate an AI video prompt.

Selling style: ${style}
Language: ${language}
Dialogue: ${dialogue ? "ON" : "OFF"}
`,
    });

    return NextResponse.json({
      result: response.output_text,
    });

  } catch (error) {
    console.error("Generation error:", error);

    return NextResponse.json(
      { error: "Failed to generate prompt." },
      { status: 500 }
    );
  }
}
