import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function formatError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

/**
 * 将 DOM 节点导出为 A4 PDF。依次尝试 html-to-image（对现代 CSS 更稳）与 html2canvas。
 */
export async function exportNodeToPdf(node: HTMLElement, fileNameBase: string): Promise<void> {
  let dataUrl: string;

  const tryToPng = (opts: {
    pixelRatio?: number;
    cacheBust?: boolean;
    backgroundColor?: string;
    skipFonts?: boolean;
  }) => toPng(node, opts);

  try {
    dataUrl = await tryToPng({
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: 'rgba(0,0,0,0)',
    });
  } catch (e1) {
    try {
      dataUrl = await tryToPng({
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
        backgroundColor: 'rgba(0,0,0,0)',
      });
    } catch (e2) {
      try {
        const canvas = await html2canvas(node, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: false,
          backgroundColor: '#ffffff',
          foreignObjectRendering: false,
        });
        dataUrl = canvas.toDataURL('image/png', 1.0);
      } catch (e3) {
        const msg = [e1, e2, e3].map(formatError).join(' | ');
        throw new Error(`截图失败：${msg}`);
      }
    }
  }

  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('图片解码失败'));
    img.src = dataUrl;
  });

  const wPx = img.naturalWidth;
  const hPx = img.naturalHeight;
  if (!wPx || !hPx) {
    throw new Error('生成图片尺寸为 0');
  }

  const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4', compress: true });
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const marginMm = 12;
  const maxW = pdfWidth - marginMm * 2;
  const maxH = pdfHeight - marginMm * 2;
  const scale = Math.min(maxW / wPx, maxH / hPx);
  const drawW = wPx * scale;
  const drawH = hPx * scale;
  const imgX = (pdfWidth - drawW) / 2;
  const imgY = marginMm;

  pdf.addImage(dataUrl, 'PNG', imgX, imgY, drawW, drawH);
  pdf.save(`${fileNameBase}.pdf`);
}
