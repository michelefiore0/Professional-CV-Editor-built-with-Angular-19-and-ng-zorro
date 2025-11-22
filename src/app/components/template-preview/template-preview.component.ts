import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CVTemplate, CVData } from '../../models/cv-template.model';
import { ModernTemplateComponent } from '../cv-templates/modern-template.component';
import { ClassicTemplateComponent } from '../cv-templates/classic-template.component';
import { CreativeTemplateComponent } from '../cv-templates/creative-template.component';
import { MinimalTemplateComponent } from '../cv-templates/minimal-template.component';
import { ProfessionalTemplateComponent } from '../cv-templates/professional-template.component';
import { TechTemplateComponent } from '../cv-templates/tech-template.component';
import { ExecutiveTemplateComponent } from '../cv-templates/executive-template.component';
import { SimpleTemplateComponent } from '../cv-templates/simple-template.component';

@Component({
  selector: 'app-template-preview',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    ModernTemplateComponent,
    ClassicTemplateComponent,
    CreativeTemplateComponent,
    MinimalTemplateComponent,
    ProfessionalTemplateComponent,
    TechTemplateComponent,
    ExecutiveTemplateComponent,
    SimpleTemplateComponent
  ],
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.less']
})
export class TemplatePreviewComponent {
  @Input() template!: CVTemplate;
  @Input() cvData!: CVData;
  @Input() isVisible = false;
  @Output() confirmed = new EventEmitter<CVTemplate>();
  @Output() cancelled = new EventEmitter<void>();

  get modalWidth(): string | number {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 430) return '98%';
      if (width <= 576) return '95%';
      if (width <= 768) return '90%';
      return 900;
    }
    return 900;
  }

  onConfirm() {
    this.confirmed.emit(this.template);
  }

  onCancel() {
    this.cancelled.emit();
  }
}