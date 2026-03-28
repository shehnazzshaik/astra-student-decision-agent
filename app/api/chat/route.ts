import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { message, context } = await req.json();

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 400,
    messages: [{
      role: "user",
      content: `You are Astra, a helpful AI career advisor. Here is the student's analysis result:
${context}

Student's question: ${message}

Reply in 2-4 sentences. Be specific, practical, and mention numbers/rupees where relevant.`,
    }],
  });

  const reply = (response.content[0] as { text: string }).text;
  return NextResponse.json({ reply });
}