import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CVTemplateService } from '../../services/cv-template.service';
import { CVTemplate, CVData } from '../../models/cv-template.model';
import { TemplatePreviewComponent } from '../template-preview/template-preview.component';

@Component({
  selector: 'app-template-selector',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzTagModule,
    TemplatePreviewComponent
  ],
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.less']
})
export class TemplateSelectorComponent implements OnInit {
  @Output() templateSelected = new EventEmitter<CVTemplate>();
  
  templates: CVTemplate[] = [];
  sampleData: CVData | null = null;
  selectedPreviewTemplate: CVTemplate | null = null;
  showPreview = false;

  constructor(private templateService: CVTemplateService) {}

  ngOnInit() {
    this.templateService.getTemplates().subscribe(templates => {
      this.templates = templates;
    });
    
    this.templateService.getSampleData().subscribe(data => {
      this.sampleData = data;
    });
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