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
      
      // Prepara il clone per la generazione PDF - SEMPRE 297mm
      clonedElement.style.position = 'fixed';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '0';
      clonedElement.style.width = '210mm';
      clonedElement.style.height = '297mm';
      clonedElement.style.maxHeight = '297mm';
      clonedElement.style.transform = 'none';
      clonedElement.style.margin = '0';
      clonedElement.style.padding = '0';
      clonedElement.style.boxShadow = 'none';
      clonedElement.style.overflow = 'hidden';
      clonedElement.style.zIndex = '-1';
      
      // Aggiungi al DOM temporaneamente
      document.body.appendChild(clonedElement);
      
      // Attendi rendering completo
      await new Promise(resolve => setTimeout(resolve, 200));

      // Genera canvas SEMPRE 210x297mm (single page)
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,  // 210mm
        height: 1123, // 297mm
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: 1123
      });
      
      // Rimuovi il clone
      document.body.removeChild(clonedElement);
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Crea PDF A4 single-page
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      pdf.save(`${fileName}.pdf`);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error('Errore durante l\'esportazione PDF:', error);
      throw error;
    }
  }
}