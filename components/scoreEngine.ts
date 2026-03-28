export function calculateScores(studentSkills: string[], requiredSkills: string[]) {
  const studentLower = studentSkills.map(s => s.toLowerCase().trim());
  const requiredLower = requiredSkills.map(s => s.toLowerCase().trim());
  
  const matched = requiredLower.filter(skill =>
    studentLower.some(ss => ss.includes(skill) || skill.includes(ss))
  );
  
  const matchScore = Math.round((matched.length / requiredLower.length) * 100);
  
  const confidence = matchScore >= 80 ? "High" : matchScore >= 50 ? "Medium" : "Low";
  const eligibility = Math.round(matchScore * 0.95);
  const status = matchScore >= 80 ? "Strong candidate" 
               : matchScore >= 50 ? "Moderate fit" 
               : "Needs improvement";
  
  return { matchScore, confidence, eligibility, status };
}

export function calculateFinance(estimatedCostINR: number) {
  if (estimatedCostINR <= 0) {
    return { loanNeeded: "No", monthlyEMI: null, duration: null, advice: "All free resources available." };
  }
  if (estimatedCostINR < 5000) {
    return { loanNeeded: "No", monthlyEMI: null, duration: null, advice: "Low cost — no loan needed." };
  }
  const months = estimatedCostINR <= 15000 ? 3 : 6;
  const emi = Math.round(estimatedCostINR / months);
  return { loanNeeded: "Yes", monthlyEMI: emi, duration: months, advice: `EMI of ₹${emi}/month for ${months} months.` };
}