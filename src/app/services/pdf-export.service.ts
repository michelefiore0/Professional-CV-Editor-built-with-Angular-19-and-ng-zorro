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

      // Configurazione ottimizzata per qualità PDF
      const canvas = await html2canvas(element, {
        scale: isMobile ? 3 : 2, // Scala più alta su mobile
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: isMobile ? 794 : element.scrollWidth, // Larghezza A4 in px (210mm * 3.78)
        height: isMobile ? 1123 : element.scrollHeight, // Altezza A4 in px (297mm * 3.78)
        scrollX: 0,
        scrollY: 0
      });

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
      
      // Usa tutta la larghezza disponibile
      const scaledWidth = pdfWidth;
      const scaledHeight = (imgHeight * pdfWidth) / imgWidth;
      
      // Se l'altezza supera la pagina, adatta
      if (scaledHeight > pdfHeight) {
        const finalHeight = pdfHeight;
        const finalWidth = (imgWidth * pdfHeight) / imgHeight;
        const x = (pdfWidth - finalWidth) / 2;
        pdf.addImage(imgData, 'JPEG', x, 0, finalWidth, finalHeight);
      } else {
        // Centra verticalmente
        const y = (pdfHeight - scaledHeight) / 2;
        pdf.addImage(imgData, 'JPEG', 0, y, scaledWidth, scaledHeight);
      }
      
      pdf.save(`${fileName}.pdf`);
      
    } catch (error) {
      console.error('Errore durante l\'esportazione PDF:', error);
      throw error;
    }
  }
}