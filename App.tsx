
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ResponseDisplay } from './components/ResponseDisplay';
import { Footer } from './components/Footer';
import { generatePromptHelper } from './services/geminiService';
import type { AIResponse } from './types';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter a goal or task.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const response = await generatePromptHelper(userInput);
      setAiResponse(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate response: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/30 via-slate-900 to-slate-900"></div>
      <div className="relative z-10 flex flex-col items-center w-full px-4 pt-8 pb-12 flex-grow">
        <Header />
        <main className="w-full max-w-4xl mt-8">
          <PromptInput
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
          <ResponseDisplay
            response={aiResponse}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
