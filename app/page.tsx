"use client";

import { useState } from "react";

export default function Home() {
  const [style, setStyle] = useState("honest-review");
  const [language, setLanguage] = useState("Taglish");
  const [dialogue, setDialogue] = useState(true);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate", {
      method: "POST",
      body: new FormData(),
    });

    const data = await res.json();

    setResult(data.result || data.error);
    setLoading(false);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>AI Video Prompt Generator HYUNA</h1>

      <label>Style</label>
      <select value={style} onChange={(e)=>setStyle(e.target.value)}>
        <option value="honest-review">Honest Review</option>
        <option value="hard-selling">Hard Selling</option>
        <option value="viral-hype">Viral Hype</option>
      </select>

      <br /><br />

      <label>Language</label>
      <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
        <option>Taglish</option>
        <option>Filipino</option>
        <option>English</option>
      </select>

      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={dialogue}
          onChange={(e)=>setDialogue(e.target.checked)}
        />
        Dialogue ON
      </label>

      <br /><br />

      <button onClick={generate}>
        {loading ? "Generating..." : "Generate Prompt"}
      </button>

      <pre style={{marginTop:30, whiteSpace:"pre-wrap"}}>
        {result}
      </pre>
    </main>
  );
}
