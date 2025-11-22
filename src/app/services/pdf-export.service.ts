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

      // Salva stato originale per ripristino
      const originalTransform = element.style.transform;
      const originalWidth = element.style.width;
      const originalMargin = element.style.marginBottom;
      
      // Rimuovi trasformazioni mobile per PDF
      element.style.transform = 'none';
      element.style.width = 'auto';
      element.style.marginBottom = '0';
      
      // Attendi che il layout si adatti
      await new Promise(resolve => setTimeout(resolve, 100));

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
      
      // Ripristina stato originale
      element.style.transform = originalTransform;
      element.style.width = originalWidth;
      element.style.marginBottom = originalMargin;

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
      
      // Scala per far entrare tutto in una singola pagina senza spazi bianchi
      const widthRatio = pdfWidth / imgWidth;
      const heightRatio = pdfHeight / imgHeight;
      const scale = Math.min(widthRatio, heightRatio);
      
      const finalWidth = imgWidth * scale;
      const finalHeight = imgHeight * scale;
      
      // Centra nell'area disponibile
      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;
      
      pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
      
      pdf.save(`${fileName}.pdf`);
      
    } catch (error) {
      console.error('Errore durante l\'esportazione PDF:', error);
      throw error;
    }
  }
}