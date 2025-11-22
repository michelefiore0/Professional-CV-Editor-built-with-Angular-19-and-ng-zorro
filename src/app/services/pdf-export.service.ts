import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  async exportToPdf(elementId: string, fileName: string = 'cv'): Promise<void> {
    try {
      const originalElement = document.getElementById(elementId);
      if (!originalElement) {
        throw new Error('Elemento non trovato');
      }

      // Clona l'elemento per non disturbare la visualizzazione
      const clonedElement = originalElement.cloneNode(true) as HTMLElement;
      
      // Prepara il clone per la generazione PDF
      clonedElement.style.position = 'fixed';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '0';
      clonedElement.style.width = '210mm';
      clonedElement.style.minHeight = '297mm';
      clonedElement.style.height = 'auto';
      clonedElement.style.transform = 'none';
      clonedElement.style.margin = '0';
      clonedElement.style.padding = '0';
      clonedElement.style.boxShadow = 'none';
      clonedElement.style.zIndex = '-1';
      
      // Aggiungi al DOM temporaneamente
      document.body.appendChild(clonedElement);
      
      // Attendi rendering completo
      await new Promise(resolve => setTimeout(resolve, 300));

      // Ottieni altezza reale del contenuto
      const contentHeight = clonedElement.scrollHeight;
      const contentWidth = 794; // 210mm in pixels
      
      // Genera canvas dell'intero contenuto
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: contentWidth,
        height: contentHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: contentWidth,
        windowHeight: contentHeight
      });
      
      // Rimuovi il clone
      document.body.removeChild(clonedElement);
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Crea PDF A4 multi-pagina
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calcola quante pagine servono
      const pageHeightInPixels = (pdfHeight / pdfWidth) * imgWidth;
      const totalPages = Math.ceil(imgHeight / pageHeightInPixels);
      
      // Aggiungi ogni pagina
      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        
        const yOffset = -page * pageHeightInPixels * (pdfHeight / pageHeightInPixels);
        const imgHeightInPdf = (imgHeight * pdfWidth) / imgWidth;
        
        pdf.addImage(imgData, 'JPEG', 0, yOffset, pdfWidth, imgHeightInPdf);
      }
      pdf.save(`${fileName}.pdf`);
      
    } catch (error) {
      console.error('Errore durante l\'esportazione PDF:', error);
      throw error;
    }
  }
}