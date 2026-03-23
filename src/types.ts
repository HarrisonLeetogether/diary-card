export type Feeling = {
  id: string;
  name: string;
  emoji: string;
};

export type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  feeling: string;
};

export type StyleConfig = {
  backgroundColor: string;
  backgroundGradient: string;
  backgroundPattern: string;
  fontSize: number;
  fontColor: string;
  fontFamily: string;
  borderRadius: number;
  shadow: boolean;
  padding: number;
  textAlign: 'left' | 'center';
};

export type Theme = {
  /** i18n key，如 theme.gentlePink */
  nameKey: string;
  config: StyleConfig;
};

export type DiaryCardData = {
  titleAdjective: string;
  todos: TodoItem[];
  style: StyleConfig;
};