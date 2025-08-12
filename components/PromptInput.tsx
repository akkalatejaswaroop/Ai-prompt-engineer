
import React from 'react';

interface PromptInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows: number;
}

export const PromptInput: React.FC<PromptInputProps> = ({ id, label, value, onChange, placeholder, rows }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold text-slate-300">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-200 resize-y"
      />
    </div>
  );
};
