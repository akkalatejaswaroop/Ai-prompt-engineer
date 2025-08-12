import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { getPromptAnalysis, PromptAnalysis } from './services/geminiService';

const samplePrompts = [
    "Create a logo for a coffee shop called 'The Cozy Bean'.",
    "Write a python script to scrape headlines from a news website.",
    "Explain the theory of relativity like I'm five.",
    "Generate a short sci-fi story about a time-traveling historian."
];

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (isLoading || !prompt) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await getPromptAnalysis(prompt);
      setAnalysis(result);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Analysis Failed: ${errorMessage}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, prompt]);
  
  const handleSampleClick = (sample: string) => {
    setPrompt(sample);
  }

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 flex flex-col items-center">
        
        {/* Input Section */}
        <div className="w-full max-w-3xl flex flex-col items-center gap-4 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-center text-slate-300">
                Start with an idea or a draft prompt
            </h2>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A photo of a futuristic city at sunset..."
                rows={4}
                className="w-full p-4 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 resize-y text-base"
                aria-label="User Prompt Input"
            />
             <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                <span className="text-slate-400">Or try an example:</span>
                {samplePrompts.map((p, i) => (
                    <button key={i} onClick={() => handleSampleClick(p)} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition-colors text-slate-300">
                        "{p.substring(0, 20)}..."
                    </button>
                ))}
            </div>
            <button
                onClick={handleAnalyze}
                disabled={isLoading || !prompt}
                className="mt-2 w-full max-w-xs inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                {isLoading ? 'Analyzing...' : 'Analyze Prompt'}
            </button>
        </div>
        
        {/* Results Section */}
        <div className="w-full max-w-6xl flex-grow flex items-center justify-center">
            {isLoading && <Loader />}
            {error && (
                <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 max-w-2xl text-center">
                    <h3 className="font-bold mb-2">An Error Occurred</h3>
                    <p className="text-sm">{error}</p>
                </div>
            )}
            {analysis && !isLoading && <AnalysisDisplay analysis={analysis} />}
            {!isLoading && !error && !analysis && (
                 <div className="text-center text-slate-500">
                    <p>Your prompt analysis will appear here.</p>
                </div>
            )}
        </div>

      </main>
      <footer className="text-center py-4 text-slate-600 text-sm">
        <p>©️ All Righs Reserved By Akkala Teja Swaroop</p>
      </footer>
    </div>
  );
}

export default App;