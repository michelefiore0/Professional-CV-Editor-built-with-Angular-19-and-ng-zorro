import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-minimal-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minimal-template.component.html',
  styleUrls: ['./minimal-template.component.less']
})
export class MinimalTemplateComponent {
  @Input() cvData!: CVData;

  get experienceSectionTitle(): string {
    return this.cvData.userType === 'student' ? 'Esperienze Formative' : 'Esperienza Lavorativa';
  }
}