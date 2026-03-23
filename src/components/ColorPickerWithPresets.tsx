import React from 'react';
import { COMMON_COLORS } from '../data/commonColors';

function normalizeHexForColorInput(hex: string): string {
  const h = hex.trim();
  if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(h)) {
    return '#ffffff';
  }
  if (h.length === 4) {
    return `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`.toLowerCase();
  }
  return h.toLowerCase();
}

interface ColorPickerWithPresetsProps {
  label: string;
  /** 快捷色区块标题 */
  presetsLabel: string;
  value: string;
  onChange: (hex: string) => void;
}

/**
 * 原生取色 + 常用色快捷块（全部颜色选择统一用此组件）
 */
const ColorPickerWithPresets: React.FC<ColorPickerWithPresetsProps> = ({ label, presetsLabel, value, onChange }) => {
  const safe = normalizeHexForColorInput(value);

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600 sm:text-sm">{label}</label>
      <input
        type="color"
        value={safe}
        onChange={(e) => onChange(e.target.value)}
        className="journal-color"
      />
      <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-gray-400">{presetsLabel}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {COMMON_COLORS.map((c) => {
          const active = safe.toLowerCase() === c.hex.toLowerCase();
          return (
            <button
              key={c.hex}
              type="button"
              title={c.name}
              onClick={() => onChange(c.hex)}
              className={`h-7 w-7 shrink-0 rounded-lg border border-black/10 shadow-sm transition-transform hover:scale-105 ${
                active ? 'ring-2 ring-primary ring-offset-1' : ''
              }`}
              style={{ backgroundColor: c.hex }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorPickerWithPresets;
