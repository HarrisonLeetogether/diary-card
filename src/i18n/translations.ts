export type Locale = 'zh' | 'en';

export const STORAGE_LOCALE_KEY = 'diary-card-locale';

type Dict = Record<string, string>;

const zh: Dict = {
  'lang.switchToEn': 'English',
  'lang.switchToZh': '中文',

  'app.badge': 'journal',
  'app.title': '日记记录卡',
  'app.subtitle': '记录每一天的小确幸与待办事项',

  'section.cardTitle': '日记卡标题',
  'section.cardTitleHint': '选个词，当作今天的心情标题',
  'section.todos': '待办事项',
  'section.todosHint': '每条都是一张小卡片',
  'btn.addOne': '添加一项',
  'btn.addThree': '添加三项',
  'empty.todos': '今天也从一件小事开始吧',
  'btn.style': '样式设计',
  'aside.preview': '预览',
  'modal.styleTitle': '样式设计',
  'modal.styleRegion': '样式设置',
  'modal.livePreview': '实时预览',

  'title.pickHint': '点选一词作为标题前缀',
  'title.cardSuffix': '日记卡',
  'adj.happy': '开心',
  'adj.healing': '治愈',
  'adj.gentle': '温柔',
  'adj.energetic': '元气',
  'adj.quiet': '安静',
  'adj.sad': '忧伤',
  'adj.busy': '忙碌',
  'adj.fulfilling': '充实',
  'adj.warm': '温暖',
  'adj.tired': '疲惫',

  'export.label': '导出为 PDF',
  'export.generating': '正在生成…',
  'export.filenameSuffix': '日记卡',
  'alert.previewNotReady': '预览区域未加载完成，请稍后再试。',
  'alert.previewSize': '预览区域尺寸异常，请刷新页面后重试。',
  'alert.exportFail': '导出失败：',

  'todo.placeholder': '写一件待办小事…',
  'todo.markDone': '标记为完成',
  'todo.markUndone': '标记为未完成',
  'todo.delete': '删除',
  'feeling.pick': '选择心情',
  'feeling.panel': '心情',

  'diary.empty': '今天也从一件小事开始吧',

  'exportBtn.loading': '正在生成…',

  'style.sectionBg': '背景设置',
  'style.bgColor': '背景颜色',
  'style.commonColors': '常用颜色',
  'style.gradient': '背景渐变',
  'style.gradientHint': '选择起始色与结束色，自动生成柔和斜向渐变。',
  'style.gradientLegacy': '当前为旧版手写渐变，修改下方任一颜色后将保存为双色渐变。',
  'style.gradientStart': '渐变起始色',
  'style.gradientEnd': '渐变结束色',
  'style.clearGradient': '不使用渐变（仅纯色背景）',
  'style.sectionText': '文字设置',
  'style.fontSize': '字体大小',
  'style.fontColor': '字体颜色',
  'style.fontStyle': '字体风格',
  'style.fontSans': '无衬线',
  'style.fontSerif': '衬线',
  'style.fontMono': '等宽',
  'style.titleAlign': '标题对齐方式',
  'style.alignLeft': '左对齐',
  'style.alignCenter': '居中',
  'style.sectionCard': '卡片设置',
  'style.radius': '卡片圆角',
  'style.shadow': '卡片阴影',
  'style.padding': '内边距',
  'style.sectionThemes': '主题预设',
  'style.footer.cancel': '取消',
  'style.footer.apply': '应用样式',
  'style.footer.reset': '恢复默认',

  'theme.gentlePink': '温柔粉',
  'theme.skyBlue': '晴空蓝',
  'theme.forestGreen': '森系绿',
  'theme.midnight': '深夜日记',

  'modal.close': '关闭',
};

const en: Dict = {
  'lang.switchToEn': 'English',
  'lang.switchToZh': '中文',

  'app.badge': 'journal',
  'app.title': 'Diary Card',
  'app.subtitle': 'Capture little joys and to-dos, one day at a time.',

  'section.cardTitle': 'Card title',
  'section.cardTitleHint': 'Pick a word for today’s mood.',
  'section.todos': 'To-dos',
  'section.todosHint': 'Each line is a small card.',
  'btn.addOne': 'Add one',
  'btn.addThree': 'Add three',
  'empty.todos': 'Start with one small thing today.',
  'btn.style': 'Style',
  'aside.preview': 'Preview',
  'modal.styleTitle': 'Style',
  'modal.styleRegion': 'Style settings',
  'modal.livePreview': 'Live preview',

  'title.pickHint': 'Tap a word for the title prefix.',
  'title.cardSuffix': 'Diary Card',
  'adj.happy': 'Happy',
  'adj.healing': 'Healing',
  'adj.gentle': 'Gentle',
  'adj.energetic': 'Energetic',
  'adj.quiet': 'Quiet',
  'adj.sad': 'Sad',
  'adj.busy': 'Busy',
  'adj.fulfilling': 'Fulfilling',
  'adj.warm': 'Warm',
  'adj.tired': 'Tired',

  'export.label': 'Export PDF',
  'export.generating': 'Exporting…',
  'export.filenameSuffix': 'Diary Card',
  'alert.previewNotReady': 'Preview is not ready. Please try again.',
  'alert.previewSize': 'Preview size looks wrong. Refresh and try again.',
  'alert.exportFail': 'Export failed: ',

  'todo.placeholder': 'A small to-do…',
  'todo.markDone': 'Mark as done',
  'todo.markUndone': 'Mark as not done',
  'todo.delete': 'Delete',
  'feeling.pick': 'Pick a mood',
  'feeling.panel': 'Mood',

  'diary.empty': 'Start with one small thing today.',

  'exportBtn.loading': 'Exporting…',

  'style.sectionBg': 'Background',
  'style.bgColor': 'Background color',
  'style.commonColors': 'Common colors',
  'style.gradient': 'Gradient',
  'style.gradientHint': 'Pick a start and end color for a soft diagonal gradient.',
  'style.gradientLegacy': 'This is a legacy custom gradient. Changing a color below will save as a two-color gradient.',
  'style.gradientStart': 'Gradient start',
  'style.gradientEnd': 'Gradient end',
  'style.clearGradient': 'No gradient (solid color only)',
  'style.sectionText': 'Text',
  'style.fontSize': 'Font size',
  'style.fontColor': 'Text color',
  'style.fontStyle': 'Font style',
  'style.fontSans': 'Sans',
  'style.fontSerif': 'Serif',
  'style.fontMono': 'Mono',
  'style.titleAlign': 'Title alignment',
  'style.alignLeft': 'Left',
  'style.alignCenter': 'Center',
  'style.sectionCard': 'Card',
  'style.radius': 'Corner radius',
  'style.shadow': 'Card shadow',
  'style.padding': 'Padding',
  'style.sectionThemes': 'Presets',
  'style.footer.cancel': 'Cancel',
  'style.footer.apply': 'Apply',
  'style.footer.reset': 'Reset',

  'theme.gentlePink': 'Soft pink',
  'theme.skyBlue': 'Sky blue',
  'theme.forestGreen': 'Forest',
  'theme.midnight': 'Midnight',

  'modal.close': 'Close',
};

export const translations: Record<Locale, Dict> = { zh, en };

export function getTranslation(locale: Locale, key: string): string {
  return translations[locale][key] ?? translations.zh[key] ?? key;
}
