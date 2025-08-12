
import React from 'react';

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean;
  error: string | null;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isLoading, error }) => {
  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );
  }

  if (isLoading && !response) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-6 h-6 border-2 border-slate-500 border-t-sky-400 rounded-full animate-spin"></div>
          <span>Please Wait...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow w-full h-full bg-slate-800 rounded-lg overflow-auto">
      <pre className="p-4 text-slate-200 whitespace-pre-wrap break-words font-sans text-base leading-relaxed">
        {response}
        {isLoading && <span className="inline-block w-2 h-4 bg-slate-200 animate-pulse ml-1" />}
      </pre>
    </div>
  );
};
