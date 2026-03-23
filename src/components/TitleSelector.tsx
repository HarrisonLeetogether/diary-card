import React from 'react';
import { ADJECTIVE_KEYS, type AdjectiveKey } from '../i18n/adjectiveKeys';
import { useI18n } from '../i18n/I18nProvider';
interface TitleSelectorProps {
  selectedAdjective: AdjectiveKey;
  onAdjectiveChange: (key: AdjectiveKey) => void;
}

const TitleSelector: React.FC<TitleSelectorProps> = ({ selectedAdjective, onAdjectiveChange }) => {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <p className="text-xs text-text-secondary">{t('title.pickHint')}</p>
      <div className="flex flex-wrap gap-2">
        {ADJECTIVE_KEYS.map((key) => {
          const active = selectedAdjective === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onAdjectiveChange(key)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                active
                  ? 'bg-primary/18 text-primary ring-1 ring-primary/35 shadow-soft'
                  : 'border border-warm-200/90 bg-white/70 text-text-secondary shadow-inner hover:border-secondary/35 hover:bg-white'
              }`}
            >
              {t(`adj.${key}`)}
            </button>
          );
        })}
      </div>
      <div className="flex items-baseline gap-2 rounded-2xl border border-dashed border-warm-200 bg-white/50 px-4 py-3 text-sm text-text-secondary">
        <span className="font-medium text-text-primary">{t(`adj.${selectedAdjective}`)}</span>
        <span className="text-text-muted">·</span>
        <span>{t('title.cardSuffix')}</span>
      </div>
    </div>
  );
};

export default TitleSelector;
