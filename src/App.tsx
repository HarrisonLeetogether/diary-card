import { useState, useEffect, useRef, useMemo } from 'react';
import DiaryCard from './components/DiaryCard';
import TodoItemEditor from './components/TodoItemEditor';
import TitleSelector from './components/TitleSelector';
import StylePanel, { StylePanelFooter } from './components/StylePanel';
import ExportButton from './components/ExportButton';
import Modal from './components/Modal';
import LanguageToggle from './components/LanguageToggle';
import type { TodoItem, StyleConfig, Theme, DiaryCardData } from './types';
import { exportNodeToPdf } from './lib/exportDiaryPdf';
import { normalizeAdjectiveKey, type AdjectiveKey } from './i18n/adjectiveKeys';
import { formatExportDate } from './i18n/formatDate';
import { buildDiaryTitle } from './i18n/buildDiaryTitle';
import { useI18n } from './i18n/I18nProvider';

const defaultStyle: StyleConfig = {
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
};

const emptyTodos: TodoItem[] = [];

function loadDiaryFromStorage(): DiaryCardData {
  const savedData = localStorage.getItem('diaryCardData');
  if (savedData) {
    try {
      const data = JSON.parse(savedData) as Partial<DiaryCardData>;
      return {
        titleAdjective: normalizeAdjectiveKey(data.titleAdjective ?? 'happy'),
        todos: Array.isArray(data.todos) ? data.todos : emptyTodos,
        style: data.style ?? defaultStyle,
      };
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }
  }
  return {
    titleAdjective: 'happy',
    todos: emptyTodos,
    style: defaultStyle,
  };
}

const btnSecondary =
  'inline-flex items-center justify-center gap-1.5 rounded-2xl border border-secondary/35 bg-white/90 px-4 py-2.5 text-sm font-medium text-secondary shadow-inner transition-colors hover:border-secondary/50 hover:bg-secondary/5';

const btnSecondaryMuted =
  'inline-flex items-center justify-center gap-1.5 rounded-2xl border border-accent/35 bg-white/90 px-4 py-2.5 text-sm font-medium text-accent shadow-inner transition-colors hover:border-accent/50 hover:bg-accent/5';

function App() {
  const { locale, t } = useI18n();
  const initial = useMemo(() => loadDiaryFromStorage(), []);
  const [adjectiveKey, setAdjectiveKey] = useState<AdjectiveKey>(() =>
    normalizeAdjectiveKey(initial.titleAdjective),
  );
  const [todos, setTodos] = useState<TodoItem[]>(initial.todos);
  const [style, setStyle] = useState<StyleConfig>(initial.style);
  const [exportTs, setExportTs] = useState(() => Date.now());
  const exportDate = useMemo(
    () => formatExportDate(locale, new Date(exportTs)),
    [locale, exportTs],
  );
  const diaryTitle = useMemo(
    () => buildDiaryTitle(locale, adjectiveKey, t),
    [locale, adjectiveKey, t],
  );
  const [isStyleModalOpen, setIsStyleModalOpen] = useState<boolean>(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data: DiaryCardData = {
      titleAdjective: adjectiveKey,
      todos,
      style,
    };
    localStorage.setItem('diaryCardData', JSON.stringify(data));
  }, [adjectiveKey, todos, style]);

  const addTodo = () => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: '',
      completed: false,
      feeling: 'happy',
    };
    setTodos([...todos, newTodo]);
  };

  const addThreeTodos = () => {
    const newTodos: TodoItem[] = [
      { id: Date.now().toString(), text: '', completed: false, feeling: 'happy' },
      { id: (Date.now() + 1).toString(), text: '', completed: false, feeling: 'happy' },
      { id: (Date.now() + 2).toString(), text: '', completed: false, feeling: 'happy' },
    ];
    setTodos([...todos, ...newTodos]);
  };

  const updateTodo = (updatedTodo: TodoItem) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const resetStyle = () => {
    setStyle(defaultStyle);
  };

  const handleThemeChange = (theme: Theme) => {
    setStyle(theme.config);
  };

  const waitForNextPaint = () =>
    new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

  const handleExport = async () => {
    if (exportingPdf) return;

    setExportTs(Date.now());

    setExportingPdf(true);
    try {
      await waitForNextPaint();
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      await new Promise((r) => setTimeout(r, 80));

      const node = cardRef.current;
      if (!node) {
        window.alert(t('alert.previewNotReady'));
        return;
      }

      const rect = node.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8) {
        window.alert(t('alert.previewSize'));
        return;
      }

      await exportNodeToPdf(node, buildDiaryTitle(locale, adjectiveKey, t));
    } catch (error) {
      console.error('Failed to export PDF:', error);
      const msg = error instanceof Error ? error.message : String(error);
      window.alert(`${t('alert.exportFail')}${msg}`);
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-6 sm:px-8">
        <header className="relative shrink-0 border-b border-warm-200/70 py-10 text-center">
          <div className="absolute right-0 top-6 sm:right-0 sm:top-8">
            <LanguageToggle />
          </div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-secondary/80">{t('app.badge')}</p>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">{t('app.title')}</h1>
          <p className="mt-3 mx-auto max-w-md text-sm leading-relaxed text-text-secondary sm:text-base">
            {t('app.subtitle')}
          </p>
        </header>

        <main className="flex flex-1 flex-col gap-12 py-10 lg:py-14">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            <div className="flex min-w-0 flex-col gap-10">
              <section className="rounded-2xl border border-white/80 bg-card-cream/95 p-6 shadow-soft sm:p-7">
                <h2 className="mb-1 text-base font-semibold text-text-primary">{t('section.cardTitle')}</h2>
                <p className="mb-5 text-xs text-text-secondary">{t('section.cardTitleHint')}</p>
                <TitleSelector selectedAdjective={adjectiveKey} onAdjectiveChange={setAdjectiveKey} />
              </section>

              <section className="rounded-2xl border border-white/80 bg-card-cream/95 p-6 shadow-soft sm:p-7">
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-text-primary">{t('section.todos')}</h2>
                    <p className="mt-1 text-xs text-text-secondary">{t('section.todosHint')}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={addTodo} className={btnSecondary}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      {t('btn.addOne')}
                    </button>
                    <button type="button" onClick={addThreeTodos} className={btnSecondaryMuted}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      {t('btn.addThree')}
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <TodoItemEditor key={todo.id} todo={todo} onTodoChange={updateTodo} onDelete={deleteTodo} />
                  ))}
                  {todos.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-warm-200 bg-warm-50/50 py-10 text-center text-sm text-text-light">
                      {t('empty.todos')}
                    </div>
                  )}
                </div>
              </section>

              <section className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setIsStyleModalOpen(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-secondary/35 bg-white/95 px-4 py-3 text-sm font-medium text-secondary shadow-inner transition-colors hover:bg-secondary/5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  {t('btn.style')}
                </button>
                <ExportButton onExport={handleExport} loading={exportingPdf} />
              </section>
            </div>

            <aside className="lg:sticky lg:top-8 lg:self-start">
              <p className="mb-4 text-sm font-medium text-text-secondary">{t('aside.preview')}</p>
              <div className="rounded-2xl border border-warm-200/80 bg-gradient-to-b from-warm-100/90 to-page-bg-warm/30 p-6 shadow-soft sm:p-8">
                <div className="mx-auto w-full max-w-[400px]">
                  <DiaryCard
                    ref={cardRef}
                    title={diaryTitle}
                    todos={todos}
                    style={style}
                    exportDate={exportDate}
                  />
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isStyleModalOpen}
        onClose={() => setIsStyleModalOpen(false)}
        title={t('modal.styleTitle')}
        maxWidthClass="w-full max-w-[min(96vw,920px)]"
        footer={
          <StylePanelFooter
            onCancel={() => setIsStyleModalOpen(false)}
            onReset={resetStyle}
            onApply={() => setIsStyleModalOpen(false)}
          />
        }
      >
        <div className="flex min-h-0 w-full flex-1 flex-col gap-6 overflow-hidden lg:flex-row lg:items-stretch lg:gap-8">
          <div
            className="min-h-0 min-w-0 w-full flex-1 overflow-y-auto overscroll-contain pr-0.5 [scrollbar-gutter:stable] lg:flex-[1.1] lg:pr-2"
            role="region"
            aria-label={t('modal.styleRegion')}
          >
            <StylePanel style={style} onStyleChange={setStyle} onThemeChange={handleThemeChange} />
          </div>
          <div className="flex max-h-[min(42vh,320px)] w-full shrink-0 flex-col overflow-y-auto border-t border-warm-200/80 pt-4 lg:max-h-none lg:sticky lg:top-0 lg:w-[min(100%,340px)] lg:self-start lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0 xl:w-[360px]">
            <p className="mb-3 text-xs font-medium text-gray-500">{t('modal.livePreview')}</p>
            <div className="rounded-2xl border border-warm-200/80 bg-gradient-to-b from-warm-100/90 to-page-bg-warm/30 p-4 shadow-inner sm:p-5">
              <DiaryCard
                title={diaryTitle}
                todos={todos}
                style={style}
                exportDate={exportDate}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
