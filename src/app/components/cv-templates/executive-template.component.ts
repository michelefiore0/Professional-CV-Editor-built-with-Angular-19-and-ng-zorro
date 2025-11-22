import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-executive-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './executive-template.component.html',
  styleUrls: ['./executive-template.component.less']
})
export class ExecutiveTemplateComponent {
  @Input() cvData!: CVData;
}
