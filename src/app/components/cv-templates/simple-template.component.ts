import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-simple-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="simple-template">
      <header class="header">
        <h1>{{ cvData.personalInfo.name }}</h1>
        <h2>{{ cvData.personalInfo.title }}</h2>
        <div class="contact">
          {{ cvData.personalInfo.email }} | {{ cvData.personalInfo.phone }} | {{ cvData.personalInfo.city }}
        </div>
      </header>

      <section class="summary">
        <h3>Profilo</h3>
        <p>{{ cvData.personalInfo.summary }}</p>
      </section>

      <section class="experience">
        <h3>Esperienza Lavorativa</h3>
        <div class="item" *ngFor="let exp of cvData.experience">
          <div class="item-header">
            <strong>{{ exp.position }}</strong> - {{ exp.company }}
            <span class="date">{{ exp.startDate }} - {{ exp.endDate }}</span>
          </div>
          <p>{{ exp.description }}</p>
        </div>
      </section>

      <section class="education">
        <h3>Formazione</h3>
        <div class="item" *ngFor="let edu of cvData.education">
          <div class="item-header">
            <strong>{{ edu.degree }}</strong> - {{ edu.institution }}
            <span class="date">{{ edu.year }}</span>
          </div>
        </div>
      </section>

      <section class="skills">
        <h3>Competenze</h3>
        <p>{{ cvData.skills.join(', ') }}</p>
      </section>

      <section class="languages">
        <h3>Lingue</h3>
        <div class="language-list">
          <span *ngFor="let lang of cvData.languages; let last = last">
            {{ lang.language }} ({{ lang.level }})<span *ngIf="!last">, </span>
          </span>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .simple-template {
      width: 210mm;
      min-height: 297mm;
      background: white;
      font-family: Arial, sans-serif;
      color: #333;
      padding: 20mm;
      box-sizing: border-box;
      line-height: 1.5;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }

    .header h1 {
      font-size: 28px;
      margin: 0 0 5px 0;
      color: #333;
    }

    .header h2 {
      font-size: 16px;
      margin: 0 0 10px 0;
      color: #666;
      font-weight: normal;
    }

    .contact {
      font-size: 14px;
      color: #666;
    }

    section {
      margin-bottom: 25px;
    }

    h3 {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .item {
      margin-bottom: 15px;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 5px;
    }

    .date {
      font-size: 12px;
      color: #666;
      font-style: italic;
    }

    p {
      margin: 0;
      font-size: 14px;
      text-align: justify;
    }

    .language-list {
      font-size: 14px;
    }
  `]
})
export class SimpleTemplateComponent {
  @Input() cvData!: CVData;
}