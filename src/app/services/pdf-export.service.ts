import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  async exportToPdf(elementId: string, fileName: string = 'cv'): Promise<void> {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Elemento non trovato');
      }

      // Rileva se siamo su mobile
      const isMobile = window.innerWidth <= 768;
      
      // Aggiungi classe per PDF generation
      document.body.classList.add('pdf-generating');
      
      // Attendi che i CSS si applichino
      await new Promise(resolve => setTimeout(resolve, 100));

      // Forza dimensioni desktop per PDF completo
      const originalWidth = element.style.width;
      const originalHeight = element.style.height;
      const originalOverflow = element.style.overflow;
      
      if (isMobile) {
        // Forza dimensioni desktop temporaneamente
        element.style.width = '794px'; // A4 width in pixels
        element.style.height = 'auto';
        element.style.overflow = 'visible';
        
        // Attendi che il layout si adatti
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Configurazione ottimizzata per qualità PDF
      const canvas = await html2canvas(element, {
        scale: 2, // Scala uniforme
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // Larghezza A4 fissa
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: 1123
      });
      
      // Ripristina dimensioni originali
      if (isMobile) {
        element.style.width = originalWidth;
        element.style.height = originalHeight;
        element.style.overflow = originalOverflow;
      }

      // Rimuovi classe PDF generation
      document.body.classList.remove('pdf-generating');

      const imgData = canvas.toDataURL('image/jpeg', 0.95); // JPEG per file più piccoli
      
      // Formato A4: 210 x 297 mm
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      // Calcola le dimensioni ottimali
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Mantieni proporzioni originali senza tagliare
      const scaledWidth = pdfWidth;
      const scaledHeight = (imgHeight * pdfWidth) / imgWidth;
      
      if (scaledHeight <= pdfHeight) {
        // Entra in una pagina - centra verticalmente
        const y = (pdfHeight - scaledHeight) / 2;
        pdf.addImage(imgData, 'JPEG', 0, y, scaledWidth, scaledHeight);
      } else {
        // Multipagina - mantieni tutto il contenuto
        let currentY = 0;
        let remainingHeight = scaledHeight;
        let pageCount = 0;
        
        while (remainingHeight > 0) {
          if (pageCount > 0) {
            pdf.addPage();
          }
          
          const pageHeight = Math.min(remainingHeight, pdfHeight);
          const sourceY = (currentY / scaledHeight) * imgHeight;
          const sourceHeight = (pageHeight / scaledHeight) * imgHeight;
          
          // Crea canvas per questa sezione
          const pageCanvas = document.createElement('canvas');
          const pageCtx = pageCanvas.getContext('2d')!;
          pageCanvas.width = imgWidth;
          pageCanvas.height = sourceHeight;
          
          pageCtx.drawImage(canvas, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight);
          const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
          
          pdf.addImage(pageImgData, 'JPEG', 0, 0, scaledWidth, pageHeight);
          
          currentY += pageHeight;
          remainingHeight -= pageHeight;
          pageCount++;
        }
      }
      
      pdf.save(`${fileName}.pdf`);
      
    } catch (error) {
      console.error('Errore durante l\'esportazione PDF:', error);
      throw error;
    }
  }
}