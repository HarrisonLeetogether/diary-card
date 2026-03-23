import {
  AlignmentType,
  Document,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import type { StyleConfig, TodoItem } from '../types';
import { feelings } from '../data/feelings';

function sanitizeFileBase(name: string): string {
  const s = name.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').trim();
  return s || '待办清单';
}

function hexToDocxFill(hex: string): string {
  const h = hex.replace(/^#/, '').trim();
  if (/^[0-9A-Fa-f]{6}$/.test(h)) return h.toUpperCase();
  return 'FEF2F2';
}

function feelingEmoji(id: string): string {
  return feelings.find((f) => f.id === id)?.emoji ?? '😐';
}

function docxFont(style: StyleConfig): string {
  switch (style.fontFamily) {
    case 'serif':
      return 'SimSun';
    case 'mono':
      return 'Consolas';
    default:
      return 'Microsoft YaHei';
  }
}

/**
 * 根据当前标题、待办与样式生成 .docx 并触发浏览器下载（不依赖 DOM 截图）。
 */
export async function exportDiaryToDocx(
  title: string,
  todos: TodoItem[],
  exportDate: string,
  style: StyleConfig,
  fileNameBase: string,
): Promise<void> {
  const font = docxFont(style);
  const color = hexToDocxFill(style.fontColor);
  const bg = hexToDocxFill(style.backgroundColor);
  const align = style.textAlign === 'center' ? AlignmentType.CENTER : AlignmentType.LEFT;
  const bodySize = Math.max(20, Math.min(48, Math.round(style.fontSize * 2)));
  const titleSize = Math.min(56, bodySize + 12);
  const muted = '888888';

  const blocks: (Paragraph | Table)[] = [
    new Paragraph({
      alignment: align,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: titleSize,
          color,
          font,
        }),
      ],
    }),
  ];

  if (todos.length === 0) {
    blocks.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 120 },
        children: [new TextRun({ text: '✨', size: bodySize + 8, font })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: '今天也从一件小事开始吧',
            size: Math.round(bodySize * 0.85),
            color: muted,
            font,
          }),
        ],
      }),
    );
  } else {
    for (const todo of todos) {
      const emoji = feelingEmoji(todo.feeling);
      const mark = todo.completed ? '☑ ' : '☐ ';
      const text = todo.text.trim() ? todo.text : '（未填写）';
      const runColor = todo.completed ? muted : color;
      blocks.push(
        new Paragraph({
          alignment: align,
          spacing: { after: 160 },
          children: [
            new TextRun({ text: mark, size: bodySize, font, color: runColor }),
            new TextRun({
              text,
              size: bodySize,
              color: runColor,
              font,
              strike: todo.completed,
            }),
            new TextRun({ text: '\u00A0\u00A0', size: bodySize }),
            new TextRun({
              text: emoji,
              size: Math.round(bodySize * 1.2),
            }),
          ],
        }),
      );
    }
  }

  blocks.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 320 },
      children: [
        new TextRun({
          text: exportDate,
          size: Math.round(bodySize * 0.85),
          color: muted,
          font,
        }),
      ],
    }),
  );

  const cardTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: bg, type: ShadingType.SOLID },
            margins: { top: 280, bottom: 280, left: 280, right: 280 },
            children: blocks,
          }),
        ],
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [cardTable],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safe = sanitizeFileBase(fileNameBase);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${safe}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
