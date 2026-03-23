/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          'system-ui',
          'sans-serif',
        ],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'Courier New', 'monospace'],
      },
      colors: {
        primary: '#e88c8c',
        secondary: '#8da6d9',
        accent: '#92b59b',
        background: '#f7f8fc',
        page: {
          bg: '#f7f8fc',
          'bg-warm': '#f9f5f1',
        },
        warm: {
          50: '#fffaf7',
          100: '#f9f5f1',
          200: '#ebe4dc',
          300: '#d9cfc4',
        },
        card: {
          DEFAULT: '#ffffff',
          cream: '#fffaf7',
        },
        text: {
          primary: '#374151',
          secondary: '#6b7280',
          light: '#9ca3af',
          muted: '#a8a29e',
        },
      },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(141, 166, 217, 0.12), 0 2px 12px -4px rgba(0, 0, 0, 0.05)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 28px -8px rgba(141, 166, 217, 0.15), 0 4px 12px -4px rgba(0, 0, 0, 0.06)',
        inner: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
