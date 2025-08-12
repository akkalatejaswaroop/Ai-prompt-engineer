import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface PromptAnalysis {
  taskType: string;
  toolSuggestion: {
    category: string;
    reasoning: string;
  };
  promptFeedback: string[];
  enhancedPrompt: string;
}

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    taskType: {
      type: Type.STRING,
      description: 'A short, descriptive name for the user\'s task (e.g., "Creative Writing", "Image Generation", "Code Snippet Generation").'
    },
    toolSuggestion: {
      type: Type.OBJECT,
      properties: {
        category: {
          type: Type.STRING,
          description: 'The general category of AI tool best suited for this task (e.g., "Large Language Model", "AI Image Generator", "Code Assistant").'
        },
        reasoning: {
          type: Type.STRING,
          description: 'A brief explanation of why this tool category is recommended.'
        }
      },
      required: ['category', 'reasoning']
    },
    promptFeedback: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING
      },
      description: 'An array of 2-3 concise, actionable feedback points to improve the original prompt.'
    },
    enhancedPrompt: {
      type: Type.STRING,
      description: 'A complete, rewritten version of the user\'s prompt incorporating the feedback for maximum effectiveness.'
    }
  },
  required: ['taskType', 'toolSuggestion', 'promptFeedback', 'enhancedPrompt']
};


export async function getPromptAnalysis(userPrompt: string): Promise<PromptAnalysis> {
  if (!userPrompt) {
    throw new Error("Prompt cannot be empty.");
  }
  
  const systemInstruction = "You are an expert prompt engineer and AI tools specialist. Your task is to analyze a user's prompt, identify the core task, suggest the best type of AI tool for that task, provide constructive feedback to improve the prompt, and generate an enhanced version of the prompt. You must provide your response in the specified JSON format.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const analysisResult = JSON.parse(jsonText);
    
    return analysisResult as PromptAnalysis;

  } catch (error) {
    console.error("Error getting prompt analysis:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
}