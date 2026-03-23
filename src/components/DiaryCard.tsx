import { forwardRef } from 'react';
import type { TodoItem, StyleConfig } from '../types';
import { feelings } from '../data/feelings';
import { useI18n } from '../i18n/I18nProvider';

interface DiaryCardProps {
  title: string;
  todos: TodoItem[];
  style: StyleConfig;
  exportDate: string;
}

const DiaryCard = forwardRef<HTMLDivElement, DiaryCardProps>(function DiaryCard(
  { title, todos, style, exportDate },
  ref,
) {
  const { t } = useI18n();
  const getFeelingEmoji = (feelingId: string) => {
    const feeling = feelings.find((f) => f.id === feelingId);
    return feeling ? feeling.emoji : '😐';
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden transition-all duration-300 ${style.shadow ? 'shadow-card' : ''}`}
      style={{
        backgroundColor: style.backgroundColor,
        backgroundImage: style.backgroundGradient || undefined,
        borderRadius: `${style.borderRadius}px`,
        padding: `${style.padding}px`,
        fontSize: `${style.fontSize}px`,
        color: style.fontColor,
        fontFamily:
          style.fontFamily === 'sans'
            ? '"Noto Sans SC", "PingFang SC", Helvetica Neue, Arial, sans-serif'
            : style.fontFamily === 'serif'
              ? 'Georgia, Times New Roman, serif'
              : 'Consolas, Courier New, monospace',
      }}
    >
      <div className="absolute right-0 top-0 h-24 w-24 opacity-[0.08]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z" />
        </svg>
      </div>

      <h2 className={`relative mb-8 text-2xl font-semibold tracking-tight ${style.textAlign}`}>{title}</h2>

      <div className="relative space-y-4">
        {todos.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-4xl">✨</div>
            <div className="text-sm opacity-70">{t('diary.empty')}</div>
          </div>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-3">
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  todo.completed ? 'border-primary/70 bg-primary/10' : 'border-black/15'
                }`}
              >
                {todo.completed && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`flex-1 ${todo.completed ? 'text-black/35 line-through decoration-black/35' : ''}`}
                style={{ opacity: todo.completed ? 0.7 : 1 }}
              >
                {todo.text}
              </span>
              <span className={`text-xl ${todo.completed ? 'opacity-40 saturate-50' : ''}`} aria-hidden>
                {getFeelingEmoji(todo.feeling)}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="relative mt-10 text-right text-sm opacity-55">{exportDate}</div>

      <div
        className="relative mt-6 h-1 w-20 rounded-full bg-primary/30"
        style={{
          marginLeft: style.textAlign === 'center' ? 'auto' : 0,
          marginRight: style.textAlign === 'center' ? 'auto' : 'unset',
        }}
      />
    </div>
  );
});

export default DiaryCard;
