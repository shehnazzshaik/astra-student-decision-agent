const HARDCODED = [
  { name: "PMKVY — IT sector", type: "Govt scheme", badge: "Free cert", color: "bg-green-50 text-green-700" },
  { name: "Skill India Digital", type: "Govt platform", badge: "Free", color: "bg-green-50 text-green-700" },
  { name: "freeCodeCamp", type: "Free platform", badge: "Free", color: "bg-green-50 text-green-700" },
  { name: "Coursera — Google IT cert", type: "Financial aid available", badge: "Apply for aid", color: "bg-yellow-50 text-yellow-700" },
  { name: "NSDC — National Skills", type: "Govt body", badge: "Free", color: "bg-green-50 text-green-700" },
];

export default function OpportunitiesSection({ aiOpps }: { aiOpps?: any[] }) {
  const opps = aiOpps?.length ? aiOpps.map((o, i) => ({ ...o, badge: "Recommended", color: "bg-purple-50 text-purple-700", ...HARDCODED[i] })) : HARDCODED;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Opportunities</p>
      {opps.map(o => (
        <div key={o.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
          <div>
            <p className="text-sm font-medium text-gray-800">{o.name}</p>
            <p className="text-xs text-gray-400">{o.type}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-md ${o.color}`}>{o.badge}</span>
        </div>
      ))}
    </div>
  );
}