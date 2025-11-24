import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-tech-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-template.component.html',
  styleUrls: ['./tech-template.component.less']
})
export class TechTemplateComponent {
  @Input() cvData!: CVData;

  get experienceSectionTitle(): string {
    return this.cvData.userType === 'student' ? 'Esperienze Formative' : 'Esperienza Lavorativa';
  }
}
