import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-executive-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="executive-template">
      <div class="header-section">
        <div class="name-title">
          <h1>{{ cvData.personalInfo.name }}</h1>
          <h2>{{ cvData.personalInfo.title }}</h2>
        </div>
        <div class="contact-details">
          <div class="contact-item">{{ cvData.personalInfo.email }}</div>
          <div class="contact-item">{{ cvData.personalInfo.phone }}</div>
          <div class="contact-item">{{ cvData.personalInfo.city }}</div>
        </div>
      </div>

      <div class="executive-summary">
        <h3>Executive Summary</h3>
        <p>{{ cvData.personalInfo.summary }}</p>
      </div>

      <div class="main-content">
        <div class="left-section">
          <section class="professional-experience">
            <h3>Professional Experience</h3>
            <div class="experience-entry" *ngFor="let exp of cvData.experience">
              <div class="position-header">
                <h4>{{ exp.position }}</h4>
                <span class="period">{{ exp.startDate }} - {{ exp.endDate }}</span>
              </div>
              <div class="company-name">{{ exp.company }}</div>
              <p class="description">{{ exp.description }}</p>
            </div>
          </section>
        </div>

        <div class="right-section">
          <section class="education-section">
            <h3>Education</h3>
            <div class="education-entry" *ngFor="let edu of cvData.education">
              <h4>{{ edu.degree }}</h4>
              <div class="institution">{{ edu.institution }}</div>
              <div class="year">{{ edu.year }}</div>
            </div>
          </section>

          <section class="core-competencies">
            <h3>Core Competencies</h3>
            <ul class="competencies-list">
              <li *ngFor="let skill of cvData.skills">{{ skill }}</li>
            </ul>
          </section>

          <section class="languages-section">
            <h3>Languages</h3>
            <div class="language-entry" *ngFor="let lang of cvData.languages">
              <div class="language-name">{{ lang.language }}</div>
              <div class="proficiency">{{ lang.level }}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .executive-template {
      width: 210mm;
      min-height: 297mm;
      background: white;
      font-family: 'Times New Roman', serif;
      color: #2c3e50;
      padding: 25mm;
      box-sizing: border-box;
      line-height: 1.4;
    }

    .header-section {
      text-align: center;
      padding-bottom: 25px;
      border-bottom: 2px solid #34495e;
      margin-bottom: 25px;
    }

    .name-title h1 {
      font-size: 36px;
      font-weight: bold;
      color: #2c3e50;
      margin: 0 0 8px 0;
      letter-spacing: 1px;
    }

    .name-title h2 {
      font-size: 20px;
      color: #7f8c8d;
      margin: 0 0 15px 0;
      font-weight: normal;
      font-style: italic;
    }

    .contact-details {
      display: flex;
      justify-content: center;
      gap: 30px;
      font-size: 14px;
    }

    .contact-item {
      color: #34495e;
    }

    .executive-summary {
      margin-bottom: 30px;
      text-align: justify;
    }

    .executive-summary h3 {
      font-size: 18px;
      color: #2c3e50;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .executive-summary p {
      font-size: 14px;
      line-height: 1.6;
    }

    .main-content {
      display: flex;
      gap: 30px;
    }

    .left-section {
      flex: 2;
    }

    .right-section {
      flex: 1;
    }

    section {
      margin-bottom: 25px;
    }

    h3 {
      font-size: 16px;
      color: #2c3e50;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #bdc3c7;
      padding-bottom: 5px;
    }

    .experience-entry {
      margin-bottom: 20px;
      page-break-inside: avoid;
    }

    .position-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 5px;
    }

    .position-header h4 {
      font-size: 16px;
      color: #2c3e50;
      margin: 0;
      font-weight: bold;
    }

    .period {
      font-size: 12px;
      color: #7f8c8d;
      font-style: italic;
    }

    .company-name {
      font-size: 14px;
      color: #34495e;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .description {
      font-size: 13px;
      text-align: justify;
      margin: 0;
    }

    .education-entry {
      margin-bottom: 15px;
    }

    .education-entry h4 {
      font-size: 14px;
      color: #2c3e50;
      margin: 0 0 3px 0;
    }

    .institution {
      font-size: 13px;
      color: #34495e;
      font-weight: bold;
    }

    .year {
      font-size: 12px;
      color: #7f8c8d;
      font-style: italic;
    }

    .competencies-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .competencies-list li {
      font-size: 13px;
      padding: 3px 0;
      border-bottom: 1px dotted #bdc3c7;
    }

    .competencies-list li:last-child {
      border-bottom: none;
    }

    .language-entry {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 13px;
    }

    .language-name {
      font-weight: bold;
      color: #2c3e50;
    }

    .proficiency {
      color: #7f8c8d;
      font-style: italic;
    }
  `]
})
export class ExecutiveTemplateComponent {
  @Input() cvData!: CVData;
}