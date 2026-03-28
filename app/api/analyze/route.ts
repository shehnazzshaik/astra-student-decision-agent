import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { calculateScores, calculateFinance } from "@/lib/scoreEngine";
import sgMail from "@sendgrid/mail";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { resume, jobDescription, email } = await req.json();

  const prompt = `You are Astra, an AI career decision engine for students in India.

STUDENT RESUME:
${resume}

TARGET JOB DESCRIPTION:
${jobDescription}

Respond ONLY in this JSON format, no extra text, no markdown:
{
  "roleTitle": "Software Engineer",
  "roleExplained": "2-3 sentences about what this role means day-to-day",
  "hiddenExpectations": ["expectation 1", "expectation 2", "expectation 3"],
  "studentSkills": ["Python", "Java", "HTML"],
  "requiredSkills": ["JavaScript", "React", "Node.js", "SQL"],
  "missingSkills": [{"skill": "TypeScript", "priority": "high"}],
  "learningPath": ["Step 1: Learn TypeScript on freeCodeCamp", "Step 2: Build a Node.js API"],
  "estimatedCostINR": 3500,
  "freeResources": ["freeCodeCamp TypeScript", "YouTube Node.js crash course"],
  "paidResources": ["Udemy Node.js - Rs 399 on sale"],
  "opportunities": [
    {"name": "PMKVY IT sector", "type": "Govt scheme", "link": "skillindia.gov.in"},
    {"name": "Skill India Digital", "type": "Govt platform", "link": "skillindia.gov.in"},
    {"name": "freeCodeCamp", "type": "Free platform", "link": "freecodecamp.org"}
  ],
  "decisionSteps": ["Do this first", "Then this", "Avoid this"],
  "avoidList": ["Don't apply without GitHub projects"]
}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1500,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = (message.content[0] as { text: string }).text;
  const aiResult = JSON.parse(raw.replace(/```json|```/g, "").trim());

  const scores = calculateScores(aiResult.studentSkills, aiResult.requiredSkills);
  const finance = calculateFinance(aiResult.estimatedCostINR);

  const fullResult = { ...aiResult, ...scores, ...finance };

  if (email) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_FROM!,
      subject: `Astra: Your analysis for ${aiResult.roleTitle} is ready`,
      html: `<h2>Match Score: ${scores.matchScore}%</h2>
             <p><strong>Status:</strong> ${scores.status}</p>
             <p><strong>Role:</strong> ${aiResult.roleExplained}</p>
             <p><strong>Top missing skill:</strong> ${aiResult.missingSkills[0]?.skill}</p>
             <p><strong>Estimated cost:</strong> ₹${aiResult.estimatedCostINR}</p>`,
    }).catch(() => {});
  }

  return NextResponse.json(fullResult);
}