"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  async function generate() {
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
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">

      <section className="text-center mb-10">
        <h1 className="text-5xl font-black text-pink-600">
          AI Video Prompt Generator HYUNA ♡
        </h1>

        <p className="mt-4 text-lg">
          Turn your ideas into scroll-stopping AI video prompts!
        </p>
      </section>


      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-purple-600">
            📤 1. Upload Your Files
          </h2>

          <div className="mt-5 space-y-4">
            <input type="file" className="w-full border p-3 rounded-xl" />
            <input type="file" className="w-full border p-3 rounded-xl" />
            <input type="file" className="w-full border p-3 rounded-xl" />
            <input type="file" className="w-full border p-3 rounded-xl" />
            <input type="file" className="w-full border p-3 rounded-xl" />
          </div>
        </div>


        <div className="bg-white rounded-3xl p-6 shadow-xl">

          <h2 className="text-2xl font-bold text-purple-600">
            ⚙️ 2. Generation Settings
          </h2>

          <select className="mt-5 w-full p-3 rounded-xl border">
            <option>Honest Review</option>
            <option>Product Selling</option>
            <option>Storytelling</option>
          </select>

          <select className="mt-5 w-full p-3 rounded-xl border">
            <option>Taglish</option>
            <option>English</option>
            <option>Filipino</option>
          </select>
