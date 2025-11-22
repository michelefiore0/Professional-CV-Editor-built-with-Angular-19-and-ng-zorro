import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-simple-template',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="simple-cv">Simple Template - {{ cvData.personalInfo.name }}</div>`,
  styles: [`
    .simple-cv {
      max-width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      background: white;
      padding: 40px;
      font-family: Arial, sans-serif;
    }
  `]
})
export class SimpleTemplateComponent {
  @Input() cvData!: CVData;
}