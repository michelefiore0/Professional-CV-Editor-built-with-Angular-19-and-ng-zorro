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
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.less', 
    './components/cv-preview-styles.less',
    './components/cv-templates-responsive.less'
  ]
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