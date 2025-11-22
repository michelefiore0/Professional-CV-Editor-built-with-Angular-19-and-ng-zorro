# CV Editor Angular

Un editor di curriculum vitae professionale costruito con Angular 19 e ng-zorro.

## 🚀 Caratteristiche

- **8 Template diversi** (4 con foto, 4 senza foto)
- **Editor completo** con form reattivi e validazione
- **Autocompletamento intelligente** per città, università e competenze
- **Drag & drop foto** con ridimensionamento automatico ad alta qualità
- **Export PDF** ottimizzato per stampa A4
- **Anteprime live** dei template con modal di conferma
- **Design responsive** per tutti i dispositivi

## 🛠️ Tecnologie

- **Angular 19** (Standalone Components)
- **ng-zorro-antd** (UI Components)
- **TypeScript** (Strict mode)
- **LESS/SCSS** (Styling)
- **html2canvas + jsPDF** (Export PDF)
- **RxJS** (Reactive programming)

## 📦 Installazione

```bash
# Clona il repository
git clone https://github.com/TUO_USERNAME/cv-editor-angular.git
cd cv-editor-angular

# Installa le dipendenze
npm install

# Avvia l'applicazione
npm start
```

L'applicazione sarà disponibile su `http://localhost:4200/`

## 🎨 Template Disponibili

### Con Foto
1. **Moderno Gradient** - Design moderno con gradient blu/viola
2. **Classico Elegante** - Layout tradizionale a due colonne
3. **Creativo Colorato** - Design dinamico con animazioni
4. **Professionale Corporate** - Stile business con header blu

### Senza Foto
5. **Minimalista Clean** - Essenziale e pulito, solo testo
6. **Tech Developer** - Stile terminale/codice per sviluppatori
7. **Executive Premium** - Per posizioni dirigenziali
8. **Semplice Lineare** - Layout base e lineare

## ✨ Funzionalità Principali

### 📝 Editor Avanzato
- Form reattivi con validazione in tempo reale
- Autocompletamento per 110+ città italiane
- Database completo di università italiane (75+)
- Lista competenze tecniche predefinite
- Gestione dinamica di sezioni (aggiungi/rimuovi)

### 📸 Gestione Foto
- Drag & drop intuitivo
- Ridimensionamento automatico (400x400px)
- Compressione intelligente (qualità 92%)
- Anteprima immediata
- Supporto JPG, PNG (max 5MB)

### 📄 Export PDF
- Qualità professionale (scale 2x)
- Formato A4 ottimizzato
- Nome file automatico
- Centratura perfetta
- Compatibile con tutti i template

### 🔍 Sistema Anteprime
- Miniature simulate per ogni template
- Modal di anteprima a schermo intero
- Conferma prima della selezione
- Navigazione fluida

## 🏗️ Architettura

```
src/
├── app/
│   ├── components/
│   │   ├── cv-editor/           # Editor principale
│   │   ├── cv-templates/        # 8 template diversi
│   │   ├── template-selector/   # Selezione template
│   │   └── template-preview/    # Anteprima modal
│   ├── models/                  # Interfacce TypeScript
│   ├── services/               # Servizi (template, PDF, foto)
│   └── assets/
│       └── data/               # Database università
```

## 🎯 Best Practices Implementate

- **Standalone Components** (Angular 19)
- **Reactive Forms** con validazione
- **Type Safety** completa con TypeScript
- **Responsive Design** mobile-first
- **Performance** ottimizzata con OnPush
- **Accessibility** compliant
- **Clean Code** con separazione responsabilità

## 🚀 Build e Deploy

```bash
# Build per produzione
npm run build

# Deploy su GitHub Pages
npm install --save-dev angular-cli-ghpages
ng build --base-href="/cv-editor-angular/"
npx angular-cli-ghpages --dir=dist/cv-editor-angular
```

## 📱 Compatibilità

- **Browser**: Chrome, Firefox, Safari, Edge (ultime 2 versioni)
- **Dispositivi**: Desktop, Tablet, Mobile
- **Stampa**: Ottimizzato per formato A4
- **Export**: PDF ad alta risoluzione

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push del branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 👨‍💻 Autore

Creato con ❤️ per semplificare la creazione di CV professionali.

---

⭐ Se questo progetto ti è stato utile, lascia una stella su GitHub!