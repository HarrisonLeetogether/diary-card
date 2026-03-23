import React from 'react';
import type { TodoItem } from '../types';
import FeelingPicker from './FeelingPicker';
import { useI18n } from '../i18n/I18nProvider';

interface TodoItemEditorProps {
  todo: TodoItem;
  onTodoChange: (todo: TodoItem) => void;
  onDelete: (id: string) => void;
}

const TodoItemEditor: React.FC<TodoItemEditorProps> = ({ todo, onTodoChange, onDelete }) => {
  const { t } = useI18n();
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTodoChange({ ...todo, text: e.target.value });
  };

  const handleCompletedChange = () => {
    onTodoChange({ ...todo, completed: !todo.completed });
  };

  const handleFeelingChange = (feeling: string) => {
    onTodoChange({ ...todo, feeling });
  };

  const done = todo.completed;

  return (
    <div
      className={`group rounded-2xl border border-warm-200/90 bg-card-cream/80 p-3 shadow-soft transition-shadow md:p-3.5 ${
        done ? 'opacity-70' : 'hover:shadow-card-hover'
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {/* 自定义 Checkbox */}
        <button
          type="button"
          onClick={handleCompletedChange}
          aria-pressed={done}
          aria-label={done ? t('todo.markUndone') : t('todo.markDone')}
          className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
            done
              ? 'border-primary/60 bg-primary/12 text-primary'
              : 'border-warm-300 bg-white/50 hover:border-primary/40'
          }`}
        >
          {done && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <input
          type="text"
          value={todo.text}
          onChange={handleTextChange}
          placeholder={t('todo.placeholder')}
          className={`journal-input min-w-0 flex-1 border-warm-200/80 py-2 text-sm ${
            done ? 'text-text-muted line-through decoration-warm-300 decoration-2' : 'text-text-primary'
          }`}
        />

        <FeelingPicker
          selectedFeeling={todo.feeling}
          onFeelingChange={handleFeelingChange}
          completed={done}
        />

        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          aria-label={t('todo.delete')}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-light/40 hover:bg-red-50 hover:text-red-400/90 md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItemEditor;
