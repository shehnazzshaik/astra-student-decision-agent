export default function FinanceSection({ result }: { result: any }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Financial plan</p>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400">Est. cost</p>
          <p className="font-medium mt-1">₹{result.estimatedCostINR?.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400">Loan needed</p>
          <p className={`font-medium mt-1 ${result.loanNeeded === "No" ? "text-green-600" : "text-red-500"}`}>{result.loanNeeded}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400">Free options</p>
          <p className="font-medium mt-1 text-green-600">{result.freeResources?.length || 0} found</p>
        </div>
      </div>
      {result.monthlyEMI && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
          EMI suggestion: ₹{result.monthlyEMI}/month for {result.duration} months
        </div>
      )}
      <p className="text-xs text-gray-400 mt-2">{result.advice}</p>
      <div className="mt-3">
        <p className="text-xs text-gray-400 mb-1">Free resources</p>
        {result.freeResources?.map((r: string) => (
          <p key={r} className="text-xs text-green-700 py-0.5">✓ {r}</p>
        ))}
      </div>
    </div>
  );
}