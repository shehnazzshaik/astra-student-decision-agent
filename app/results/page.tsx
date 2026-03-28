"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Results() {
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("astraResult");
    if (stored) setResult(JSON.parse(stored));
  }, []);

  if (!result) return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">No results yet. <button onClick={() => router.push("/")} className="text-purple-500 underline">Analyze first</button></p>
    </main>
  );

  const barColor = result.matchScore >= 80 ? "bg-green-400" : result.matchScore >= 50 ? "bg-yellow-400" : "bg-red-400";

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-medium">Astra<span className="text-purple-500">.</span></h1>
          <div className="flex gap-2">
            <button onClick={() => router.push("/")} className="text-sm px-4 py-1.5 border border-gray-200 rounded-full bg-white">Analyze again</button>
            <button onClick={() => router.push("/chat")} className="text-sm px-4 py-1.5 bg-purple-500 text-white rounded-full">Ask Astra</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Match score", value: result.matchScore + "%", color: result.matchScore >= 80 ? "text-green-600" : result.matchScore >= 50 ? "text-yellow-600" : "text-red-500" },
            { label: "Confidence", value: result.confidence, color: "text-gray-800" },
            { label: "Eligibility", value: result.eligibility, color: "text-purple-600" },
          ].map(c => (
            <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">{c.label}</p>
              <p className={`text-2xl font-medium ${c.color}`}>{c.value}</p>
              <p className="text-xs text-gray-400 mt-1">{result.status}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <div className="flex justify-between text-sm mb-2"><span className="font-medium">Role match</span><span className="text-gray-400">{result.matchScore}%</span></div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-1000 ${barColor}`} style={{ width: result.matchScore + "%" }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Skills you have</p>
            <div className="flex flex-wrap gap-1">
              {result.studentSkills?.map((s: string) => <span key={s} className="text-xs px-2 py-1 bg-green-50 text-green-800 rounded-md">{s}</span>)}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Skills to learn</p>
            <div className="flex flex-wrap gap-1">
              {result.missingSkills?.map((s: any) => (
                <span key={s.skill} className={`text-xs px-2 py-1 rounded-md ${s.priority === "high" ? "bg-red-50 text-red-800" : "bg-yellow-50 text-yellow-800"}`}>{s.skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Role explained</p>
          <p className="text-sm text-gray-600 leading-relaxed">{result.roleExplained}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Your action plan</p>
          {result.decisionSteps?.map((step: string, i: number) => (
            <div key={i} className="flex gap-3 items-start py-2 border-b border-gray-100 last:border-0">
              <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
              <p className="text-sm text-gray-600">{step}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Financial plan</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center"><p className="text-xs text-gray-400">Est. cost</p><p className="font-medium text-sm mt-1">₹{result.estimatedCostINR}</p></div>
            <div className="bg-gray-50 rounded-lg p-3 text-center"><p className="text-xs text-gray-400">Loan needed</p><p className="font-medium text-sm mt-1">{result.loanNeeded}</p></div>
            <div className="bg-gray-50 rounded-lg p-3 text-center"><p className="text-xs text-gray-400">Free options</p><p className="font-medium text-sm mt-1">{result.freeResources?.length || 0} found</p></div>
          </div>
          <p className="text-xs text-gray-400">{result.advice}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Opportunities</p>
          {result.opportunities?.map((o: any) => (
            <div key={o.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div><p className="text-sm font-medium text-gray-800">{o.name}</p><p className="text-xs text-gray-400">{o.type}</p></div>
              <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-md">Free</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}