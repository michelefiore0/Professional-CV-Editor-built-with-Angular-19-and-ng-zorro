import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';
import { ModernTemplateComponent } from './components/cv-templates/modern-template.component';
import { ClassicTemplateComponent } from './components/cv-templates/classic-template.component';
import { CreativeTemplateComponent } from './components/cv-templates/creative-template.component';
import { MinimalTemplateComponent } from './components/cv-templates/minimal-template.component';
import { ProfessionalTemplateComponent } from './components/cv-templates/professional-template.component';
import { TechTemplateComponent } from './components/cv-templates/tech-template.component';
import { ExecutiveTemplateComponent } from './components/cv-templates/executive-template.component';
import { SimpleTemplateComponent } from './components/cv-templates/simple-template.component';
import { CVEditorComponent } from './components/cv-editor/cv-editor.component';
import { CVTemplate, CVData } from './models/cv-template.model';
import { CVTemplateService } from './services/cv-template.service';
import { PdfExportService } from './services/pdf-export.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzMessageModule,
    TemplateSelectorComponent,
    ModernTemplateComponent,
    ClassicTemplateComponent,
    CreativeTemplateComponent,
    MinimalTemplateComponent,
    ProfessionalTemplateComponent,
    TechTemplateComponent,
    ExecutiveTemplateComponent,
    SimpleTemplateComponent,
    CVEditorComponent
  ],
  template: `
    <nz-layout class="layout">
      <nz-header>
        <div class="logo">CV Editor</div>
        <ul nz-menu nzTheme="dark" nzMode="horizontal" class="header-menu">
          <li nz-menu-item>
            <span nz-icon nzType="file-text"></span>
            Nuovo CV
          </li>
          <li nz-menu-item>
            <span nz-icon nzType="folder-open"></span>
            Carica CV
          </li>
          <li nz-menu-item>
            <span nz-icon nzType="download"></span>
            Esporta
          </li>
        </ul>
      </nz-header>
      
      <nz-content class="cv-editor-container">
        <nz-card nzTitle="Benvenuto nel tuo CV Editor" class="welcome-card" *ngIf="!showTemplateSelector && !selectedTemplate">
          <p>Inizia a creare il tuo curriculum vitae personalizzato!</p>
          <button nz-button nzType="primary" nzSize="large" (click)="createNewCV()">
            <span nz-icon nzType="plus"></span>
            Crea Nuovo CV
          </button>
        </nz-card>
        
        <app-template-selector 
          *ngIf="showTemplateSelector" 
          (templateSelected)="onTemplateSelected($event)">
        </app-template-selector>
        
        <div *ngIf="selectedTemplate && cvData && !showEditor" class="cv-preview">
          <div class="cv-actions">
            <button nz-button (click)="backToTemplates()">
              <span nz-icon nzType="arrow-left"></span>
              Cambia Template
            </button>
            <button nz-button nzType="primary" (click)="editCV()">
              <span nz-icon nzType="edit"></span>
              Modifica CV
            </button>
            <button nz-button nzType="default" (click)="downloadPDF()">
              <span nz-icon nzType="download"></span>
              Scarica PDF
            </button>
          </div>
          
          <div id="cv-template">
            <app-modern-template *ngIf="selectedTemplate?.id === 'modern-1'" [cvData]="cvData"></app-modern-template>
            <app-classic-template *ngIf="selectedTemplate?.id === 'classic-1'" [cvData]="cvData"></app-classic-template>
            <app-creative-template *ngIf="selectedTemplate?.id === 'creative-1'" [cvData]="cvData"></app-creative-template>
            <app-minimal-template *ngIf="selectedTemplate?.id === 'minimal-1'" [cvData]="cvData"></app-minimal-template>
            <app-professional-template *ngIf="selectedTemplate?.id === 'professional-1'" [cvData]="cvData"></app-professional-template>
            <app-tech-template *ngIf="selectedTemplate?.id === 'tech-1'" [cvData]="cvData"></app-tech-template>
            <app-executive-template *ngIf="selectedTemplate?.id === 'executive-1'" [cvData]="cvData"></app-executive-template>
            <app-simple-template *ngIf="selectedTemplate?.id === 'simple-1'" [cvData]="cvData"></app-simple-template>
          </div>
        </div>
        
        <app-cv-editor 
          *ngIf="showEditor && cvData && selectedTemplate" 
          [cvData]="cvData" 
          [hasPhoto]="selectedTemplate.hasPhoto"
          (dataChanged)="onDataChanged($event)"
          (backToPreview)="backToPreview()">
        </app-cv-editor>
      </nz-content>
      
      <nz-footer style="text-align: center;">
        CV Editor ©2024 - Creato con Angular 19 e ng-zorro
      </nz-footer>
    </nz-layout>
  `,
  styles: [`
    .layout {
      min-height: 100vh;
    }
    
    .logo {
      width: 120px;
      height: 31px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px 24px 16px 0;
      float: left;
      color: white;
      text-align: center;
      line-height: 31px;
      font-weight: bold;
    }
    
    .header-menu {
      line-height: 64px;
    }
    
    .welcome-card {
      margin-top: 20px;
      text-align: center;
    }
    
    .welcome-card p {
      margin-bottom: 20px;
      font-size: 16px;
    }
    
    .cv-preview {
      margin-top: 20px;
    }
    
    .cv-actions {
      margin-bottom: 20px;
      display: flex;
      gap: 12px;
    }
    
    .cv-editor-container {
      padding: 0 24px;
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
      .logo {
        width: 80px;
        font-size: 12px;
        margin: 16px 12px 16px 0;
      }
      
      .header-menu {
        display: none;
      }
      
      .cv-editor-container {
        padding: 0 12px;
      }
      
      .welcome-card {
        margin-top: 12px;
      }
      
      .welcome-card p {
        font-size: 14px;
      }
      
      .cv-actions {
        flex-direction: column;
        gap: 8px;
      }
      
      .cv-actions button {
        width: 100%;
      }
      
      .cv-preview {
        margin-top: 12px;
      }
      
      #cv-template {
        transform: scale(0.7);
        transform-origin: top left;
        width: 142.86%; /* 100% / 0.7 */
        margin-bottom: -30%;
      }
    }
    
    @media (max-width: 480px) {
      .logo {
        width: 60px;
        font-size: 10px;
        margin: 16px 8px 16px 0;
      }
      
      .cv-editor-container {
        padding: 0 8px;
      }
      
      #cv-template {
        transform: scale(0.5);
        transform-origin: top left;
        width: 200%; /* 100% / 0.5 */
        margin-bottom: -50%;
      }
    }
  `]
})
export class AppComponent {
  title = 'cv-editor-angular';
  showTemplateSelector = false;
  selectedTemplate: CVTemplate | null = null;
  cvData: CVData | null = null;
  showEditor = false;

  constructor(
    private templateService: CVTemplateService,
    private pdfExportService: PdfExportService,
    private message: NzMessageService
  ) {}

  createNewCV() {
    this.showTemplateSelector = true;
  }

  onTemplateSelected(template: CVTemplate) {
    this.selectedTemplate = template;
    this.showTemplateSelector = false;
    
    // Carica dati di esempio
    this.templateService.getSampleData().subscribe(data => {
      this.cvData = data;
    });
  }

  backToTemplates() {
    this.selectedTemplate = null;
    this.cvData = null;
    this.showTemplateSelector = true;
    this.showEditor = false;
  }

  editCV() {
    this.showEditor = true;
  }

  onDataChanged(newData: CVData) {
    this.cvData = newData;
    this.showEditor = false;
  }

  backToPreview() {
    this.showEditor = false;
  }

  async downloadPDF() {
    if (!this.cvData || !this.selectedTemplate) return;
    
    try {
      // Show loading message
      const loadingMsg = this.message.loading('Preparazione PDF in corso...', { nzDuration: 0 });
      
      // Simulate progress steps
      setTimeout(() => {
        this.message.remove(loadingMsg.messageId);
        this.message.loading('Generazione documento...', { nzDuration: 0 });
      }, 500);
      
      const fileName = `CV_${this.cvData.personalInfo.name.replace(/\s+/g, '_')}`;
      await this.pdfExportService.exportToPdf('cv-template', fileName);
      
      this.message.remove();
      this.message.success('✓ PDF scaricato con successo!', { nzDuration: 3000 });
    } catch (error) {
      this.message.remove();
      this.message.error('✗ Errore durante il download del PDF');
      console.error(error);
    }
  }
}