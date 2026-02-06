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

      const cvTemplate = originalElement.querySelector(
        '[class*="-cv"], [class*="-template"], [class*="template"]'
      ) as HTMLElement;
      if (!cvTemplate) {
        throw new Error('Template CV non trovato');
      }

      // Crea iframe per misurare altezza reale
      iframe = document.createElement('iframe');
      iframe.style.cssText = `
        position: fixed;
        top: -10000px;
        left: -10000px;
        width: 794px;
        border: none;
        visibility: hidden;
      `;
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        throw new Error('Impossibile accedere al documento iframe');
      }

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

      // Scrivi HTML nell'iframe senza altezza fissa
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              * { box-sizing: border-box; }
              body {
                margin: 0;
                padding: 0;
                width: 794px;
              }
              ${styles}
            </style>
          </head>
          <body>
            <div style="width: 794px;">
              ${cvTemplate.outerHTML}
            </div>
          </body>
        </html>
      `);
      iframeDoc.close();

      await new Promise(resolve => setTimeout(resolve, 500));

      const iframeCV = iframeDoc.querySelector(
        '[class*="-cv"], [class*="-template"], [class*="template"]'
      ) as HTMLElement;
      if (iframeCV) {
        iframeCV.style.width = '794px';
        iframeCV.style.height = 'auto';
        iframeCV.style.transform = 'none';
        iframeCV.style.margin = '0';
      }

      await new Promise(resolve => setTimeout(resolve, 300));

      // Misura altezza reale del contenuto
      const contentHeight = iframeDoc.body.scrollHeight;
      const pageHeight = 1123; // A4 in px a 96 DPI
      const numPages = Math.ceil(contentHeight / pageHeight);

      // Genera canvas con altezza completa
      const canvas = await html2canvas(iframeDoc.body, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: contentHeight,
        windowWidth: 794,
        windowHeight: contentHeight,
        logging: false
      });

      document.body.removeChild(iframe);
      iframe = null;

      // Crea PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (contentHeight * imgWidth) / 794;
      const pageHeightMM = 297; // A4 height in mm

      // Dividi in pagine
      for (let i = 0; i < numPages; i++) {
        if (i > 0) pdf.addPage();
        
        const position = -(i * pageHeightMM);
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 0.95),
          'JPEG',
          0,
          position,
          imgWidth,
          imgHeight
        );
      }

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