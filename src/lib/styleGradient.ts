/** 与样式面板「双颜色渐变」一致的 CSS 字符串（固定 135deg） */

export const DEFAULT_GRADIENT_START = '#f5f7fa';
export const DEFAULT_GRADIENT_END = '#c3cfe2';

function normalizeHex(hex: string): string {
  const h = hex.trim();
  if (h.length === 4 && h[0] === '#') {
    return `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`.toLowerCase();
  }
  return h.toLowerCase();
}

export function buildLinearGradient135(c1: string, c2: string): string {
  return `linear-gradient(135deg, ${normalizeHex(c1)} 0%, ${normalizeHex(c2)} 100%)`;
}

/** 解析本应用生成的渐变；无法识别则返回 null（保留用户曾手写的其它写法直到其再次编辑渐变） */
export function parseGradientTwoColors(gradient: string): [string, string] | null {
  const g = gradient.trim();
  if (!g) return null;
  const m = g.match(
    /^linear-gradient\s*\(\s*135deg\s*,\s*(#[0-9a-fA-F]{3,8})\s*0%\s*,\s*(#[0-9a-fA-F]{3,8})\s*100%\s*\)/i,
  );
  if (!m) return null;
  return [normalizeHex(m[1]), normalizeHex(m[2])];
}
