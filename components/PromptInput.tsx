
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      onSubmit();
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6 backdrop-blur-sm">
      <label htmlFor="prompt-input" className="block text-lg font-semibold text-slate-300 mb-3">
        What do you want to achieve?
      </label>
      <textarea
        id="prompt-input"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="e.g., 'Create a marketing campaign slogan for a new eco-friendly coffee brand targeting millennials.'"
        className="w-full h-32 p-4 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow resize-none placeholder-slate-500"
        disabled={isLoading}
      />
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500">
          <kbd className="font-sans font-semibold border border-slate-600 rounded px-2 py-1 bg-slate-700">Ctrl</kbd> + <kbd className="font-sans font-semibold border border-slate-600 rounded px-2 py-1 bg-slate-700">Enter</kbd> to submit
        </p>
        <button
          onClick={onSubmit}
          disabled={isLoading || !value}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
        >
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Generate Prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
};
