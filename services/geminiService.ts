import type { AIResponse } from '../types';

export const generatePromptHelper = async (userInput: string): Promise<AIResponse> => {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
            throw new Error(`API Error: ${response.statusText} - ${errorData.error || 'Unknown error'}`);
        }

        const parsedResponse: AIResponse = await response.json();

        // Basic validation can still be useful on the client-side
        if (
            !parsedResponse.craftedPrompt ||
            !parsedResponse.promptExplanation ||
            !Array.isArray(parsedResponse.suggestedTools)
        ) {
            throw new Error("AI response is missing required fields.");
        }
        
        return parsedResponse;

    } catch (error) {
        console.error("Error calling backend API:", error);
        if (error instanceof Error) {
            // Re-throw the error message to be displayed in the UI
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred while communicating with the backend.");
    }
};
