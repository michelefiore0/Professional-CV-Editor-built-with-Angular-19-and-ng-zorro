import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-executive-template',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="executive-cv">Executive Template - {{ cvData.personalInfo.name }}</div>`,
  styles: [`
    .executive-cv {
      max-width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      background: white;
      padding: 40px;
      font-family: 'Times New Roman', serif;
    }
  `]
})
export class ExecutiveTemplateComponent {
  @Input() cvData!: CVData;
}