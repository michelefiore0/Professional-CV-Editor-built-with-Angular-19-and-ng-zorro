import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CVTemplateService } from '../../services/cv-template.service';
import { CVTemplate, CVData, CVPreferences } from '../../models/cv-template.model';
import { TemplatePreviewComponent } from '../template-preview/template-preview.component';
import { ModernTemplateComponent } from '../cv-templates/modern-template.component';
import { ClassicTemplateComponent } from '../cv-templates/classic-template.component';
import { CreativeTemplateComponent } from '../cv-templates/creative-template.component';
import { MinimalTemplateComponent } from '../cv-templates/minimal-template.component';
import { ProfessionalTemplateComponent } from '../cv-templates/professional-template.component';
import { TechTemplateComponent } from '../cv-templates/tech-template.component';
import { ExecutiveTemplateComponent } from '../cv-templates/executive-template.component';
import { SimpleTemplateComponent } from '../cv-templates/simple-template.component';

@Component({
  selector: 'app-template-selector',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    TemplatePreviewComponent,
    ModernTemplateComponent,
    ClassicTemplateComponent,
    CreativeTemplateComponent,
    MinimalTemplateComponent,
    ProfessionalTemplateComponent,
    TechTemplateComponent,
    ExecutiveTemplateComponent,
    SimpleTemplateComponent
  ],
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.less']
})
export class TemplateSelectorComponent implements OnInit {
  @Input() preferences: CVPreferences | null = null;
  @Output() templateSelected = new EventEmitter<CVTemplate>();
  @Output() backToWizard = new EventEmitter<void>();
  
  templates: CVTemplate[] = [];
  sampleData: CVData | null = null;
  selectedPreviewTemplate: CVTemplate | null = null;
  showPreview = false;

  constructor(private templateService: CVTemplateService) {}

  ngOnInit() {
    if (this.preferences) {
      this.templateService.getFilteredTemplates(this.preferences).subscribe(templates => {
        this.templates = templates;
      });
      this.templateService.getSampleData(this.preferences.userType).subscribe(data => {
        this.sampleData = data;
      });
    } else {
      this.templateService.getTemplates().subscribe(templates => {
        this.templates = templates;
      });
      this.templateService.getSampleData().subscribe(data => {
        this.sampleData = data;
      });
    }
  }

  goBackToWizard() {
    this.backToWizard.emit();
  }

  previewTemplate(template: CVTemplate) {
    this.selectedPreviewTemplate = template;
    this.showPreview = true;
  }

  onPreviewConfirmed(template: CVTemplate) {
    this.showPreview = false;
    this.templateSelected.emit(template);
  }

  onPreviewCancelled() {
    this.showPreview = false;
    this.selectedPreviewTemplate = null;
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'modern': 'blue',
      'classic': 'green',
      'creative': 'orange',
      'minimal': 'purple'
    };
    return colors[category] || 'default';
  }
}