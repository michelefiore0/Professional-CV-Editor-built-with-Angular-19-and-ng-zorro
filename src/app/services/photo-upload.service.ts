import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoUploadService {
  
  uploadPhoto(file: File): Observable<string> {
    return new Observable(observer => {
      if (!file) {
        observer.error('Nessun file selezionato');
        return;
      }

      // Validazione tipo file
      if (!file.type.startsWith('image/')) {
        observer.error('Il file deve essere un\'immagine');
        return;
      }

      // Validazione dimensione (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        observer.error('Il file deve essere inferiore a 5MB');
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        observer.next(result);
        observer.complete();
      };

      reader.onerror = () => {
        observer.error('Errore durante la lettura del file');
      };

      reader.readAsDataURL(file);
    });
  }

  resizeImage(file: File, maxWidth: number = 400, maxHeight: number = 400, quality: number = 0.92): Observable<string> {
    return new Observable(observer => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;
        
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        
        if (ratio < 1) {
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
        }
        
        const resizedDataUrl = canvas.toDataURL('image/jpeg', quality);
        observer.next(resizedDataUrl);
        observer.complete();
      };

      img.onerror = () => {
        observer.error('Errore durante il ridimensionamento');
      };

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }
}