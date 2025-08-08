
export interface ToolSuggestion {
  toolName: string;
  description: string;
}

export interface AIResponse {
  craftedPrompt: string;
  promptExplanation: string;
  suggestedTools: ToolSuggestion[];
}
