
import React from 'react';

interface ParameterSliderProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
}

export const ParameterSlider: React.FC<ParameterSliderProps> = ({ label, value, onChange, min, max, step }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="font-semibold text-slate-300">{label}</label>
        <span className="px-2 py-0.5 bg-slate-700 text-slate-200 text-sm rounded-full font-mono">
          {value}
        </span>
      </div>
      <input
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
      />
    </div>
  );
};
