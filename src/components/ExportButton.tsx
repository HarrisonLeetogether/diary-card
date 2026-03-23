import React, { useRef } from 'react';
import { useI18n } from '../i18n/I18nProvider';

interface ExportButtonProps {
  onExport: () => void;
  loading?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onExport, loading = false }) => {
  const { t } = useI18n();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleExport = () => {
    if (loading) return;
    if (buttonRef.current) {
      buttonRef.current.classList.add('scale-[0.98]');
      setTimeout(() => {
        buttonRef.current?.classList.remove('scale-[0.98]');
      }, 160);
    }
    void onExport();
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleExport}
      disabled={loading}
      aria-busy={loading}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary via-primary to-[#e07a7a] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-[transform,filter,opacity] duration-200 enabled:hover:brightness-[1.03] enabled:active:scale-[0.99] disabled:cursor-wait disabled:opacity-85"
    >
      {loading ? (
        <>
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
          {t('export.generating')}
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 opacity-95" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t('export.label')}
        </>
      )}
    </button>
  );
};

export default ExportButton;
