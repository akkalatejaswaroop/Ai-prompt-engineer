// This is a server-side file and should be placed in the `netlify/functions` directory.
// Netlify will automatically detect this as a serverless function.

import { GoogleGenAI, Type } from "@google/genai";

// This handler uses the Web Standard Request and Response objects.
export default async function handler(req: Request): Promise<Response> {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers,
        });
    }

    if (!process.env.API_KEY) {
        return new Response(JSON.stringify({ error: 'API_KEY environment variable is not set on the server.' }), {
            status: 500,
            headers,
        });
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            craftedPrompt: {
                type: Type.STRING,
                description: "The well-crafted, effective prompt for the user's goal."
            },
            promptExplanation: {
                type: Type.STRING,
                description: "A brief explanation of why the crafted prompt is effective."
            },
            suggestedTools: {
                type: Type.ARRAY,
                description: "A list of 3-5 specific, real AI tools suitable for the task.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        toolName: { type: Type.STRING, description: "The name of the suggested AI tool." },
                        description: { type: Type.STRING, description: "A one-sentence explanation of why the tool is a good fit." }
                    },
                    required: ["toolName", "description"]
                }
            }
        },
        required: ["craftedPrompt", "promptExplanation", "suggestedTools"]
    };
    
    const systemInstruction = `You are a world-class AI Prompt Engineer. Your purpose is to help students and working professionals craft perfect prompts for a vast ecosystem of over 1000 AI tools. When a user tells you their goal, your task is to:
1.  **Craft an Optimal Prompt:** Generate a clear, concise, and effective prompt that the user can copy and paste into a relevant AI tool.
2.  **Suggest AI Tools:** Recommend 3-5 specific, real AI tools that are best suited for the user's task. For each tool, provide a brief, one-sentence explanation of why it's a good fit.
3.  **Explain the Prompt:** Briefly explain the reasoning behind your crafted prompt, highlighting key elements that make it effective (e.g., 'I included the target audience to get a more focused result').
You must respond in the specified JSON format.`;

    try {
        const { userInput } = await req.json();

        if (!userInput || typeof userInput !== 'string') {
            return new Response(JSON.stringify({ error: 'Invalid userInput provided.' }), {
                status: 400,
                headers,
            });
        }
        
        const geminiResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userInput,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
                topP: 0.95,
            },
        });

        const jsonText = geminiResponse.text.trim();
        
        return new Response(jsonText, {
            status: 200,
            headers,
        });

    } catch (error) {
        console.error("Error in serverless function:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return new Response(JSON.stringify({ error: `Server error: ${errorMessage}` }), {
            status: 500,
            headers,
        });
    }
}
