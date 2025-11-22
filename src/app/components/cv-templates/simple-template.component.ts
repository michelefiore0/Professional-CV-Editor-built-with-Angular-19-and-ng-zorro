import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-simple-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-template.component.html',
  styleUrls: ['./simple-template.component.less']
})
export class SimpleTemplateComponent {
  @Input() cvData!: CVData;
}
