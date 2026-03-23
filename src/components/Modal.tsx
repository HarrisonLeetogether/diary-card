import React from 'react';
import type { ReactNode } from 'react';
import { useI18n } from '../i18n/I18nProvider';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidthClass?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidthClass = 'max-w-[580px]',
}) => {
  const { t } = useI18n();
  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/45 p-4 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-warm-200 bg-[#fffaf7] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_25px_50px_-12px_rgba(0,0,0,0.18)] ${maxWidthClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-warm-200 bg-[#fffaf7] px-5 py-4 sm:px-6">
          <h2 id="modal-title" className="text-base font-semibold tracking-tight text-gray-800 sm:text-lg">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-light transition-colors hover:bg-warm-100 hover:text-text-secondary"
            aria-label={t('modal.close')}
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white px-5 py-5 sm:px-6">{children}</div>

        {footer != null ? (
          <div className="shrink-0 border-t border-warm-200 bg-[#fafafa] px-5 py-4 sm:px-6">{footer}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
