import React, { useMemo } from 'react';
import type { StyleConfig, Theme } from '../types';
import ColorPickerWithPresets from './ColorPickerWithPresets';
import {
  buildLinearGradient135,
  DEFAULT_GRADIENT_END,
  DEFAULT_GRADIENT_START,
  parseGradientTwoColors,
} from '../lib/styleGradient';
import { useI18n } from '../i18n/I18nProvider';

interface StylePanelProps {
  style: StyleConfig;
  onStyleChange: (style: StyleConfig) => void;
  onThemeChange: (theme: Theme) => void;
}

const themes: Theme[] = [
  {
    nameKey: 'theme.gentlePink',
    config: {
      backgroundColor: '#fef2f2',
      backgroundGradient: '',
      backgroundPattern: 'none',
      fontSize: 16,
      fontColor: '#7f1d1d',
      fontFamily: 'sans',
      borderRadius: 12,
      shadow: true,
      padding: 24,
      textAlign: 'center',
    },
  },
  {
    nameKey: 'theme.skyBlue',
    config: {
      backgroundColor: '#eff6ff',
      backgroundGradient: '',
      backgroundPattern: 'none',
      fontSize: 16,
      fontColor: '#1e40af',
      fontFamily: 'sans',
      borderRadius: 12,
      shadow: true,
      padding: 24,
      textAlign: 'center',
    },
  },
  {
    nameKey: 'theme.forestGreen',
    config: {
      backgroundColor: '#ecfdf5',
      backgroundGradient: '',
      backgroundPattern: 'none',
      fontSize: 16,
      fontColor: '#047857',
      fontFamily: 'serif',
      borderRadius: 12,
      shadow: true,
      padding: 24,
      textAlign: 'center',
    },
  },
  {
    nameKey: 'theme.midnight',
    config: {
      backgroundColor: '#1f2937',
      backgroundGradient: '',
      backgroundPattern: 'none',
      fontSize: 16,
      fontColor: '#f3f4f6',
      fontFamily: 'mono',
      borderRadius: 12,
      shadow: true,
      padding: 24,
      textAlign: 'left',
    },
  },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-warm-200 bg-[#fffaf7] p-4 shadow-sm sm:p-5">
      <h3 className="mb-4 text-sm font-semibold tracking-tight text-gray-800">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-gray-600 sm:text-sm">{children}</label>;
}

const StylePanel: React.FC<StylePanelProps> = ({ style, onStyleChange, onThemeChange }) => {
  const { t } = useI18n();
  const presetsLabel = t('style.commonColors');

  const gradientPair = useMemo(() => {
    const parsed = parseGradientTwoColors(style.backgroundGradient);
    if (parsed) return { start: parsed[0], end: parsed[1] };
    return { start: DEFAULT_GRADIENT_START, end: DEFAULT_GRADIENT_END };
  }, [style.backgroundGradient]);

  const hasCustomGradientSyntax =
    Boolean(style.backgroundGradient.trim()) && !parseGradientTwoColors(style.backgroundGradient);

  const fontOpts = [
    { v: 'sans' as const, l: t('style.fontSans') },
    { v: 'serif' as const, l: t('style.fontSerif') },
    { v: 'mono' as const, l: t('style.fontMono') },
  ];

  return (
    <div className="space-y-5 pb-1">
      <Section title={t('style.sectionBg')}>
        <ColorPickerWithPresets
          label={t('style.bgColor')}
          presetsLabel={presetsLabel}
          value={style.backgroundColor}
          onChange={(hex) => onStyleChange({ ...style, backgroundColor: hex })}
        />

        <div>
          <FieldLabel>{t('style.gradient')}</FieldLabel>
          <p className="mb-2 mt-1 text-[11px] leading-relaxed text-gray-500">{t('style.gradientHint')}</p>
          {hasCustomGradientSyntax && (
            <p className="mb-2 text-[11px] text-amber-700/90">{t('style.gradientLegacy')}</p>
          )}
          <div
            className="mb-3 h-10 w-full rounded-xl border border-warm-200 shadow-inner"
            style={
              style.backgroundGradient.trim()
                ? { backgroundImage: style.backgroundGradient }
                : { backgroundColor: style.backgroundColor }
            }
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ColorPickerWithPresets
              label={t('style.gradientStart')}
              presetsLabel={presetsLabel}
              value={gradientPair.start}
              onChange={(hex) =>
                onStyleChange({
                  ...style,
                  backgroundGradient: buildLinearGradient135(hex, gradientPair.end),
                })
              }
            />
            <ColorPickerWithPresets
              label={t('style.gradientEnd')}
              presetsLabel={presetsLabel}
              value={gradientPair.end}
              onChange={(hex) =>
                onStyleChange({
                  ...style,
                  backgroundGradient: buildLinearGradient135(gradientPair.start, hex),
                })
              }
            />
          </div>
          <button
            type="button"
            onClick={() => onStyleChange({ ...style, backgroundGradient: '' })}
            className="mt-3 w-full rounded-xl border border-warm-200 bg-white py-2 text-sm font-medium text-gray-600 shadow-inner transition-colors hover:bg-warm-50"
          >
            {t('style.clearGradient')}
          </button>
        </div>
      </Section>

      <Section title={t('style.sectionText')}>
        <div>
          <FieldLabel>
            {t('style.fontSize')} · {style.fontSize}px
          </FieldLabel>
          <input
            type="range"
            min="12"
            max="24"
            value={style.fontSize}
            onChange={(e) => onStyleChange({ ...style, fontSize: parseInt(e.target.value, 10) })}
            className="journal-range mt-3"
          />
        </div>
        <ColorPickerWithPresets
          label={t('style.fontColor')}
          presetsLabel={presetsLabel}
          value={style.fontColor}
          onChange={(hex) => onStyleChange({ ...style, fontColor: hex })}
        />
        <div>
          <FieldLabel>{t('style.fontStyle')}</FieldLabel>
          <div className="mt-2 flex flex-wrap gap-2">
            {fontOpts.map(({ v, l }) => (
              <button
                key={v}
                type="button"
                onClick={() => onStyleChange({ ...style, fontFamily: v })}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  style.fontFamily === v
                    ? 'border-secondary/50 bg-secondary/10 text-secondary'
                    : 'border-warm-200 bg-white text-gray-600 hover:border-secondary/25'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <FieldLabel>{t('style.titleAlign')}</FieldLabel>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => onStyleChange({ ...style, textAlign: 'left' })}
              className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                style.textAlign === 'left'
                  ? 'border-primary/45 bg-primary/10 text-primary'
                  : 'border-warm-200 bg-white text-gray-600 hover:bg-warm-50'
              }`}
            >
              {t('style.alignLeft')}
            </button>
            <button
              type="button"
              onClick={() => onStyleChange({ ...style, textAlign: 'center' })}
              className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                style.textAlign === 'center'
                  ? 'border-primary/45 bg-primary/10 text-primary'
                  : 'border-warm-200 bg-white text-gray-600 hover:bg-warm-50'
              }`}
            >
              {t('style.alignCenter')}
            </button>
          </div>
        </div>
      </Section>

      <Section title={t('style.sectionCard')}>
        <div>
          <FieldLabel>
            {t('style.radius')} · {style.borderRadius}px
          </FieldLabel>
          <input
            type="range"
            min="0"
            max="24"
            value={style.borderRadius}
            onChange={(e) => onStyleChange({ ...style, borderRadius: parseInt(e.target.value, 10) })}
            className="journal-range mt-3"
          />
        </div>
        <button
          type="button"
          onClick={() => onStyleChange({ ...style, shadow: !style.shadow })}
          aria-pressed={style.shadow}
          className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-colors ${
            style.shadow
              ? 'border-accent/40 bg-accent/8 text-text-primary'
              : 'border-warm-200 bg-white text-gray-600 hover:bg-warm-50'
          }`}
        >
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
              style.shadow ? 'border-accent bg-accent/20' : 'border-warm-300 bg-white'
            }`}
          >
            {style.shadow && (
              <svg className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <span className="text-sm font-medium">{t('style.shadow')}</span>
        </button>
        <div>
          <FieldLabel>
            {t('style.padding')} · {style.padding}px
          </FieldLabel>
          <input
            type="range"
            min="16"
            max="48"
            value={style.padding}
            onChange={(e) => onStyleChange({ ...style, padding: parseInt(e.target.value, 10) })}
            className="journal-range mt-3"
          />
        </div>
      </Section>

      <Section title={t('style.sectionThemes')}>
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <button
              key={theme.nameKey}
              type="button"
              onClick={() => onThemeChange(theme)}
              className="rounded-full border border-warm-200 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-600 shadow-inner transition-colors hover:border-primary/35 hover:bg-primary/5 hover:text-primary"
            >
              {t(theme.nameKey)}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
};

export interface StylePanelFooterProps {
  onCancel: () => void;
  onReset: () => void;
  onApply: () => void;
}

export function StylePanelFooter({ onCancel, onReset, onApply }: StylePanelFooterProps) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-2xl border border-warm-200 bg-white px-4 py-2.5 text-sm font-medium text-text-secondary shadow-inner transition-colors hover:bg-warm-50"
      >
        {t('style.footer.cancel')}
      </button>
      <button
        type="button"
        onClick={onApply}
        className="rounded-2xl bg-gradient-to-br from-primary to-[#e07a7a] px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-[filter] hover:brightness-[1.02]"
      >
        {t('style.footer.apply')}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-2xl border border-warm-200 bg-white px-4 py-2.5 text-sm font-medium text-text-secondary shadow-inner transition-colors hover:bg-warm-50"
      >
        {t('style.footer.reset')}
      </button>
    </div>
  );
}

export default StylePanel;
