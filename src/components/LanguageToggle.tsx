import React from 'react';
import { useI18n } from '../i18n/I18nProvider';

const LanguageToggle: React.FC = () => {
  const { locale, setLocale, t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
      className="rounded-full border border-warm-200 bg-white/95 px-3 py-1.5 text-xs font-medium text-text-secondary shadow-inner transition-colors hover:border-secondary/40 hover:bg-secondary/5 hover:text-secondary"
      aria-label={locale === 'zh' ? t('lang.switchToEn') : t('lang.switchToZh')}
    >
      {locale === 'zh' ? 'EN' : '中文'}
    </button>
  );
};

export default LanguageToggle;
