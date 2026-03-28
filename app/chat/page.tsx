"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm Astra. I've analyzed your profile. Ask me anything about your career path, skills, or finances." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const context = typeof window !== "undefined" ? localStorage.getItem("astraResult") || "" : "";

  const QUICK = ["What should I learn first?", "Cheapest path to this role?", "Should I take a loan?", "Which scholarships apply to me?"];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send(msg: string) {
    if (!msg.trim()) return;
    setMessages(m => [...m, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg, context }),
    });
    const data = await res.json();
    setMessages(m => [...m, { role: "ai", text: data.reply }]);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-medium">Ask Astra<span className="text-purple-500">.</span></h1>
          <button onClick={() => router.push("/results")} className="text-sm px-4 py-1.5 border border-gray-200 rounded-full bg-white">Back to results</button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {QUICK.map(q => (
            <button key={q} onClick={() => send(q)} className="text-xs px-3 py-1.5 border border-gray-200 rounded-full bg-white hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700">{q}</button>
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 min-h-64 max-h-96 overflow-y-auto mb-3 flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-sm px-3 py-2 rounded-xl text-sm leading-relaxed ${m.role === "user" ? "self-end bg-purple-100 text-purple-900 rounded-br-sm" : "self-start bg-gray-100 text-gray-800 rounded-bl-sm"}`}>
              {m.text}
            </div>
          ))}
          {loading && <div className="self-start bg-gray-100 px-3 py-2 rounded-xl text-sm text-gray-400 italic">Thinking...</div>}
          <div ref={bottomRef} />
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-purple-400"
            placeholder="Ask Astra anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send(input)}
          />
          <button onClick={() => send(input)} className="px-5 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600">Send</button>
        </div>
      </div>
    </main>
  );
}