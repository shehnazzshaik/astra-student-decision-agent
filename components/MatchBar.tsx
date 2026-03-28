"use client";
import { useEffect, useState } from "react";

export default function MatchBar({ score }: { score: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { setTimeout(() => setWidth(score), 300); }, [score]);
  const color = score >= 80 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444";
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-gray-800">Role match</span>
        <span className="text-gray-400">{score}%</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: width + "%", background: color }} />
      </div>
    </div>
  );
}