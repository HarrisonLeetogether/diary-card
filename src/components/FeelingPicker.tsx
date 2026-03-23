import React, { useState, useRef, useEffect } from 'react';
import { feelings } from '../data/feelings';
import { useI18n } from '../i18n/I18nProvider';

interface FeelingPickerProps {
  selectedFeeling: string;
  onFeelingChange: (feeling: string) => void;
  /** 已完成时表情更柔和 */
  completed?: boolean;
}

const FeelingPicker: React.FC<FeelingPickerProps> = ({
  selectedFeeling,
  onFeelingChange,
  completed = false,
}) => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = feelings.find((f) => f.id === selectedFeeling) ?? feelings[0];

  useEffect(() => {
    if (!isOpen) return;
    const onDocDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={t('feeling.pick')}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-warm-200 bg-card-cream/90 text-lg shadow-inner transition-all hover:border-secondary/40 hover:shadow-soft ${
          completed ? 'opacity-55 saturate-75' : ''
        } ${isOpen ? 'ring-2 ring-secondary/25 ring-offset-1' : ''}`}
      >
        <span aria-hidden>{selected.emoji}</span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-30 mt-2 w-[168px] rounded-2xl border border-warm-200/90 bg-card-cream/95 p-2 shadow-soft backdrop-blur-sm"
        >
          <p className="mb-1.5 px-1.5 text-[10px] font-medium uppercase tracking-wider text-text-light">
            {t('feeling.panel')}
          </p>
          <div className="grid grid-cols-4 gap-1">
            {feelings.map((feeling) => (
              <button
                key={feeling.id}
                type="button"
                role="option"
                aria-selected={selectedFeeling === feeling.id}
                title={feeling.name}
                onClick={() => {
                  onFeelingChange(feeling.id);
                  setIsOpen(false);
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-base transition-colors ${
                  selectedFeeling === feeling.id
                    ? 'bg-secondary/15 ring-1 ring-secondary/40'
                    : 'hover:bg-warm-100/50'
                }`}
              >
                {feeling.emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeelingPicker;
