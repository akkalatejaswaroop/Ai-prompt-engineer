
import React, { useState } from 'react';
import type { AIResponse } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { ToolIcon } from './icons/ToolIcon';

interface ResponseDisplayProps {
  response: AIResponse | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-slate-400">AI is thinking...</p>
  </div>
);

const ResponseCard: React.FC<{ response: AIResponse }> = ({ response }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response.craftedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Crafted Prompt Section */}
      <div className="bg-slate-800/70 border border-slate-700 rounded-xl shadow-lg">
        <div className="p-5 border-b border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-sky-300">Suggested Prompt</h3>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-slate-700 hover:bg-slate-600 rounded-md transition-colors text-slate-300"
          >
            <ClipboardIcon className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="p-5 text-lg leading-relaxed text-slate-300 whitespace-pre-wrap font-mono bg-slate-900/50 rounded-b-xl">
          {response.craftedPrompt}
        </p>
      </div>

      {/* Explanation Section */}
      <div className="bg-slate-800/70 border border-slate-700 rounded-xl shadow-lg">
        <div className="p-5 border-b border-slate-700 flex items-center gap-3">
          <LightBulbIcon className="w-6 h-6 text-yellow-300" />
          <h3 className="text-xl font-semibold text-yellow-300">Prompt Explanation</h3>
        </div>
        <p className="p-5 text-slate-300 leading-relaxed">{response.promptExplanation}</p>
      </div>

      {/* Recommended Tools Section */}
      <div className="bg-slate-800/70 border border-slate-700 rounded-xl shadow-lg">
        <div className="p-5 border-b border-slate-700 flex items-center gap-3">
          <ToolIcon className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-semibold text-green-400">Recommended Tools</h3>
        </div>
        <ul className="divide-y divide-slate-700">
          {response.suggestedTools.map((tool, index) => (
            <li key={index} className="p-5 hover:bg-slate-700/50 transition-colors">
              <h4 className="font-semibold text-lg text-slate-100">{tool.toolName}</h4>
              <p className="text-slate-400">{tool.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isLoading, error }) => {
  return (
    <div className="mt-8 min-h-[20rem] w-full">
      {isLoading && <LoadingSpinner />}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
          <p className="font-semibold">An Error Occurred</p>
          <p>{error}</p>
        </div>
      )}
      {response && !isLoading && <ResponseCard response={response} />}
    </div>
  );
};
