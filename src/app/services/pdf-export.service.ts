import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  async exportToPdf(elementId: string, fileName: string = 'cv'): Promise<void> {
    let iframe: HTMLIFrameElement | null = null;
    
    try {
      const originalElement = document.getElementById(elementId);
      if (!originalElement) {
        throw new Error('Elemento non trovato');
      }

      // Trova il template CV (cerca vari selettori)
      const cvTemplate = originalElement.querySelector(
        '[class*="-cv"], [class*="-template"], [class*="template"]'
      ) as HTMLElement;
      if (!cvTemplate) {
        throw new Error('Template CV non trovato');
      }

      // Crea iframe invisibile con viewport fissa A4
      iframe = document.createElement('iframe');
      iframe.style.cssText = `
        position: fixed;
        top: -10000px;
        left: -10000px;
        width: 794px;
        height: 1123px;
        border: none;
        visibility: hidden;
      `;
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        throw new Error('Impossibile accedere al documento iframe');
      }

      // Copia tutti gli stili nel iframe
      const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
          try {
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
          } catch (e) {
            return '';
          }
        })
        .join('\n');

      // Scrivi HTML nell'iframe con viewport fissa
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=794, initial-scale=1.0">
            <style>
              * { box-sizing: border-box; }
              body {
                margin: 0;
                padding: 0;
                width: 794px;
                height: 1123px;
                overflow: hidden;
              }
              ${styles}
            </style>
          </head>
          <body>
            <div style="width: 794px; height: 1123px; display: flex; justify-content: center; align-items: flex-start;">
              ${cvTemplate.outerHTML}
            </div>
          </body>
        </html>
      `);
      iframeDoc.close();

      // Attendi caricamento completo
      await new Promise(resolve => setTimeout(resolve, 500));

      // Trova il template nel iframe (cerca vari selettori)
      const iframeCV = iframeDoc.querySelector(
        '[class*="-cv"], [class*="-template"], [class*="template"]'
      ) as HTMLElement;
      if (iframeCV) {
        iframeCV.style.width = '794px';
        iframeCV.style.height = '1123px';
        iframeCV.style.transform = 'none';
        iframeCV.style.margin = '0';
      }

      // Attendi rendering
      await new Promise(resolve => setTimeout(resolve, 300));

      // Genera canvas dall'iframe
      const canvas = await html2canvas(iframeDoc.body, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        windowWidth: 794,
        windowHeight: 1123,
        logging: false
      });

      // Rimuovi iframe
      document.body.removeChild(iframe);
      iframe = null;

      // Crea PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      pdf.save(`${fileName}.pdf`);

    } catch (error) {
      console.error('Errore durante esportazione PDF:', error);
      if (iframe && iframe.parentNode) {
        document.body.removeChild(iframe);
      }
      throw error;
    }
  }
}