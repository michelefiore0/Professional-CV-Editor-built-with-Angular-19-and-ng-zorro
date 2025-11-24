import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-professional-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './professional-template.component.html',
  styleUrls: ['./professional-template.component.less']
})
export class ProfessionalTemplateComponent {
  @Input() cvData!: CVData;

  get experienceSectionTitle(): string {
    return this.cvData.userType === 'student' ? 'Esperienze Formative' : 'Esperienza Lavorativa';
  }
}
