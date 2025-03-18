
import React from "react";

interface RangeInputProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const RangeInput: React.FC<RangeInputProps> = ({
  label,
  min,
  max,
  value,
  onChange,
  error,
}) => {

  const options = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className="relative">
      <label className="block mb-1">
        {label}: <span className="font-bold">{value}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[rgb(255,178,30)]"
        list={`rangeTicks-${label}`}
      />
      <datalist id={`rangeTicks-${label}`}>
        {options.map((opt) => (
          <option key={opt} value={opt} label={opt.toString()} />
        ))}
      </datalist>
      <div className="flex justify-between mt-1">
        <span className="text-sm text-gray-500">Min ({min})</span>
        <span className="text-sm text-gray-500">Max ({max})</span>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default RangeInput;
