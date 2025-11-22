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
      clonedElement.style.height = '297mm';
      clonedElement.style.transform = 'none';
      clonedElement.style.margin = '0';
      clonedElement.style.padding = '0';
      clonedElement.style.boxShadow = 'none';
      clonedElement.style.overflow = 'hidden';
      clonedElement.style.zIndex = '-1';
      
      // Aggiungi al DOM temporaneamente
      document.body.appendChild(clonedElement);
      
      // Attendi rendering
      await new Promise(resolve => setTimeout(resolve, 200));

      // Genera PDF dal clone
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // 210mm in pixels
        height: 1123, // 297mm in pixels
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: 1123
      });
      
      // Rimuovi il clone
      document.body.removeChild(clonedElement);

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Crea PDF A4
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      // Calcola scala per far entrare tutto in una pagina
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const widthRatio = pdfWidth / imgWidth;
      const heightRatio = pdfHeight / imgHeight;
      const scale = Math.min(widthRatio, heightRatio);
      
      const finalWidth = imgWidth * scale;
      const finalHeight = imgHeight * scale;
      
      // Centra perfettamente
      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;
      
      pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
      pdf.save(`${fileName}.pdf`);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error('Errore durante l\'esportazione PDF:', error);
      throw error;
    }
  }
}