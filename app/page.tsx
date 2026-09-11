"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  async function generate() {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Generate AI video prompt",
        }),
      });

      const data = await res.json();
      setPrompt(data.prompt || "No response");
    } catch {
      setPrompt("Server error");
    }
  }

  return (
    <main className="min-h-screen bg-pink-50 p-6">

      <h1 className="text-5xl font-bold text-pink-600 text-center">
        AI Video Prompt Generator HYUNA ♡
      </h1>

      <p className="text-center mt-4">
        Turn your ideas into scroll-stopping AI video prompts!
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div className="bg-white rounded-3xl p-6 shadow">
          <h2 className="text-2xl font-bold">
            1. Upload Your Files
          </h2>

          <input type="file" className="mt-4" />
          <input type="file" className="mt-4" />
          <input type="file" className="mt-4" />
        </div>


        <div className="bg-white rounded-3xl p-6 shadow">
          <h2 className="text-2xl font-bold">
            2. Generation Settings
          </h2>

          <select className="mt-4 p-3 w-full rounded">
            <option>Honest Review</option>
            <option>Product Selling</option>
            <option>Storytelling</option>
          </select>

          <select className="mt-4 p-3 w-full rounded">
            <option>Taglish</option>
            <option>English</option>
            <option>Filipino</option>
          </select>

          <label className="flex items-center gap-3 mt-5">
            <input type="checkbox" defaultChecked />
            Dialogue ON
          </label>

        </div>

      </div>


      <button
        onClick={generate}
        className="mt-10 w-full rounded-full bg-gradient-to-r from-pink-500 to-blue-400 text-white text-2xl p-5"
      >
        ✨ Analyze & Generate ➜
      </button>


      <section className="bg-white rounded-3xl p-6 mt-8">

        <h2 className="text-3xl font-bold text-purple-600">
          ✨ Generated Prompt
        </h2>

        <p className="mt-4">
          {prompt || "Your generated prompt will appear here"}
        </p>

      </section>


      <footer className="text-center mt-10 text-purple-600 font-bold">
        Create ✦ Imagine ✦ Sell ✦ Repeat ♡
      </footer>

    </main>
  );
}
