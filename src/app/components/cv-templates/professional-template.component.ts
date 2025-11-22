import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CVData } from '../../models/cv-template.model';

@Component({
  selector: 'app-professional-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="professional-template">
      <div class="header">
        <div class="photo-section" *ngIf="cvData.photo">
          <img [src]="cvData.photo" alt="Profile Photo" class="profile-photo">
        </div>
        <div class="personal-info">
          <h1>{{ cvData.personalInfo.name }}</h1>
          <h2>{{ cvData.personalInfo.title }}</h2>
          <div class="contact-info">
            <p><strong>Email:</strong> {{ cvData.personalInfo.email }}</p>
            <p><strong>Telefono:</strong> {{ cvData.personalInfo.phone }}</p>
            <p><strong>Città:</strong> {{ cvData.personalInfo.city }}</p>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="left-column">
          <section class="summary">
            <h3>Profilo Professionale</h3>
            <p>{{ cvData.personalInfo.summary }}</p>
          </section>

          <section class="experience">
            <h3>Esperienza Lavorativa</h3>
            <div class="experience-item" *ngFor="let exp of cvData.experience">
              <h4>{{ exp.position }}</h4>
              <p class="company">{{ exp.company }} | {{ exp.startDate }} - {{ exp.endDate }}</p>
              <p>{{ exp.description }}</p>
            </div>
          </section>
        </div>

        <div class="right-column">
          <section class="education">
            <h3>Formazione</h3>
            <div class="education-item" *ngFor="let edu of cvData.education">
              <h4>{{ edu.degree }}</h4>
              <p>{{ edu.institution }} | {{ edu.year }}</p>
            </div>
          </section>

          <section class="skills">
            <h3>Competenze</h3>
            <div class="skills-list">
              <span class="skill-tag" *ngFor="let skill of cvData.skills">{{ skill }}</span>
            </div>
          </section>

          <section class="languages">
            <h3>Lingue</h3>
            <div class="language-item" *ngFor="let lang of cvData.languages">
              <span class="language">{{ lang.language }}</span>
              <span class="level">{{ lang.level }}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .professional-template {
      width: 210mm;
      min-height: 297mm;
      background: white;
      font-family: 'Arial', sans-serif;
      color: #333;
      padding: 20mm;
      box-sizing: border-box;
    }

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px solid #2c5aa0;
    }

    .photo-section {
      margin-right: 30px;
    }

    .profile-photo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #2c5aa0;
    }

    .personal-info h1 {
      font-size: 32px;
      color: #2c5aa0;
      margin: 0 0 5px 0;
      font-weight: bold;
    }

    .personal-info h2 {
      font-size: 18px;
      color: #666;
      margin: 0 0 15px 0;
      font-weight: normal;
    }

    .contact-info p {
      margin: 5px 0;
      font-size: 14px;
    }

    .content {
      display: flex;
      gap: 30px;
    }

    .left-column {
      flex: 2;
    }

    .right-column {
      flex: 1;
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
    }

    section {
      margin-bottom: 25px;
    }

    h3 {
      color: #2c5aa0;
      font-size: 18px;
      margin-bottom: 15px;
      padding-bottom: 5px;
      border-bottom: 2px solid #2c5aa0;
    }

    .experience-item, .education-item {
      margin-bottom: 20px;
    }

    .experience-item h4, .education-item h4 {
      color: #333;
      font-size: 16px;
      margin-bottom: 5px;
    }

    .company {
      color: #666;
      font-style: italic;
      margin-bottom: 8px;
    }

    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-tag {
      background: #2c5aa0;
      color: white;
      padding: 4px 12px;
      border-radius: 15px;
      font-size: 12px;
    }

    .language-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .language {
      font-weight: bold;
    }

    .level {
      color: #666;
    }
  `]
})
export class ProfessionalTemplateComponent {
  @Input() cvData!: CVData;
}