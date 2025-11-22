import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-creative-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './creative-template.component.html',
  styleUrls: ['./creative-template.component.less']
})
export class CreativeTemplateComponent {
  @Input() cvData!: CVData;
}