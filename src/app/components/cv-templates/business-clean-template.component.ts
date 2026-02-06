import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-business-clean-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-clean-template.component.html',
  styleUrls: ['./business-clean-template.component.less']
})
export class BusinessCleanTemplateComponent {
  @Input() cvData!: CVData;

  get experienceSectionTitle(): string {
    return this.cvData?.userType === 'student' ? 'Esperienze Formative' : 'Esperienza Lavorativa';
  }
}
