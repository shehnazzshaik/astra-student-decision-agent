import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { resume, job } = body;

  return NextResponse.json({
    roleTitle: "Backend Developer",
    roleExplained: "Build APIs and manage scalable server systems",
    hiddenExpectations: ["System Design", "Database Optimization"],
    matchScore: 70,
    missingSkills: ["System Design", "Advanced SQL"],
    financialAdvice: "Invest in backend/system design courses (~₹3000–₹5000)",
    opportunities: ["Government Scholarship A", "Skill India Program"]
  });
}