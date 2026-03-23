import type { Locale } from './translations';

/** 根据语言拼接卡片标题（中文无空格，英文有空格） */
export function buildDiaryTitle(
  locale: Locale,
  adjKey: string,
  t: (key: string) => string,
): string {
  const adj = t(`adj.${adjKey}`);
  return locale === 'zh' ? `${adj}${t('title.cardSuffix')}` : `${adj} ${t('title.cardSuffix')}`;
}
