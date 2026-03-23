/** 标题情绪词统一用 key 存盘，避免切换语言时错位 */
export const ADJECTIVE_KEYS = [
  'happy',
  'healing',
  'gentle',
  'energetic',
  'quiet',
  'sad',
  'busy',
  'fulfilling',
  'warm',
  'tired',
] as const;

export type AdjectiveKey = (typeof ADJECTIVE_KEYS)[number];

const ZH_TO_KEY: Record<string, AdjectiveKey> = {
  开心: 'happy',
  治愈: 'healing',
  温柔: 'gentle',
  元气: 'energetic',
  安静: 'quiet',
  忧伤: 'sad',
  忙碌: 'busy',
  充实: 'fulfilling',
  温暖: 'warm',
  疲惫: 'tired',
};

export function normalizeAdjectiveKey(raw: string): AdjectiveKey {
  if ((ADJECTIVE_KEYS as readonly string[]).includes(raw)) {
    return raw as AdjectiveKey;
  }
  return ZH_TO_KEY[raw] ?? 'happy';
}
