"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const SAMPLE_RESUME = `Name: Arjun Sharma
Education: B.Tech CSE, VIT Vellore (2022-2026), CGPA 7.8
Skills: Python, Java, HTML/CSS, MySQL, basic React, Flask
Projects: College attendance tracker (Python+Flask), Portfolio website
Internship: 1-month web dev intern at local startup
Certifications: NPTEL Python (2023)`;

  const SAMPLE_JD = `Role: Software Engineer - Full Stack
Company: Infosys, Bangalore
Requirements: JavaScript/TypeScript, React or Angular, Node.js,
REST APIs, SQL/NoSQL, Git version control, 0-2 years experience
Preferred: AWS basics, Docker`;

  async function handleAnalyze() {
    if (!resume || !jd) return alert("Please fill both resume and job description");
    setLoading(true);
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume, jobDescription: jd, email }),
    });
    const data = await res.json();
    localStorage.setItem("astraResult", JSON.stringify(data));
    router.push("/results");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-medium text-gray-900">Astra<span className="text-purple-500">.</span></h1>
          <p className="text-gray-500 mt-1 text-sm">AI decision engine for students</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Your resume</label>
            <textarea
              className="w-full mt-2 h-40 text-sm border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:border-purple-400"
              placeholder="Paste your resume — education, skills, projects..."
              value={resume}
              onChange={e => setResume(e.target.value)}
            />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Job description</label>
            <textarea
              className="w-full mt-2 h-40 text-sm border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:border-purple-400"
              placeholder="Paste the job description you're targeting..."
              value={jd}
              onChange={e => setJd(e.target.value)}
            />
          </div>
        </div>
        <input
          className="w-full mb-3 text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-purple-400"
          placeholder="Your email (optional — get results by email)"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          className="w-full mb-2 text-sm text-gray-500 border border-gray-200 rounded-lg p-2 bg-white hover:bg-gray-50"
          onClick={() => { setResume(SAMPLE_RESUME); setJd(SAMPLE_JD); }}
        >
          Load sample (Infosys Software Engineer)
        </button>
        <button
          disabled={loading}
          onClick={handleAnalyze}
          className="w-full bg-purple-500 text-white rounded-lg p-3 font-medium hover:bg-purple-600 disabled:opacity-60"
        >
          {loading ? "Analyzing with Astra..." : "Analyze with Astra"}
        </button>
      </div>
    </main>
  );
}