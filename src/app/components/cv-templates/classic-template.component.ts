import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-classic-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classic-template.component.html',
  styleUrls: ['./classic-template.component.less']
})
export class ClassicTemplateComponent {
  @Input() cvData!: CVData;

  get experienceSectionTitle(): string {
    return this.cvData.userType === 'student' ? 'Esperienze Formative' : 'Esperienza Lavorativa';
  }
}