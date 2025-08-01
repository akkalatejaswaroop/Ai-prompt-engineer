// netlify/functions/generate.ts

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai"
});

export default async function handler(req: Request): Promise<Response> {
  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        ...headers,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers
    });
  }

  if (!process.env.PERPLEXITY_API_KEY) {
    return new Response(JSON.stringify({ error: 'PERPLEXITY_API_KEY environment variable is not set on the server.' }), {
      status: 500,
      headers
    });
  }

  const systemInstruction = `You are a world-class AI Prompt Engineer. Your purpose is to help students and working professionals craft perfect prompts for a vast ecosystem of over 1000 AI tools. When a user tells you their goal, your task is to:

1. *Craft an Optimal Prompt:* Generate a clear, concise, and effective prompt that the user can copy and paste into a relevant AI tool.
2. *Suggest AI Tools:* Recommend 3-5 specific, real AI tools that are best suited for the user's task. For each tool, provide a brief, one-sentence explanation of why it's a good fit.
3. *Explain the Prompt:* Briefly explain the reasoning behind your crafted prompt, highlighting key elements that make it effective (e.g., 'I included the target audience to get a more focused result').
You must respond in the specified JSON format.`;

  try {
    const { userInput } = await req.json();

    if (!userInput || typeof userInput !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid userInput provided.' }), {
        status: 400,
        headers,
      });
    }

    // Send to Perplexity API
    const response = await openai.chat.completions.create({
      model: "sonar-pro",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userInput }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      top_p: 0.95,
    });

    const jsonText = response.choices[0].message.content;

    return new Response(jsonText, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error("Error in serverless function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(JSON.stringify({ error: Server error: ${errorMessage} }), {
      status: 500,
      headers,
    });
  }
}
