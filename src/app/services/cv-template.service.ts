import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CVTemplate, CVData } from '../models/cv-template.model';

@Injectable({
  providedIn: 'root'
})
export class CVTemplateService {
  private templates: CVTemplate[] = [
    {
      id: 'modern-1',
      name: 'Moderno Gradient',
      description: 'Design moderno con gradient e foto profilo',
      preview: 'assets/previews/modern-1.png',
      category: 'modern',
      hasPhoto: true
    },
    {
      id: 'classic-1',
      name: 'Classico Elegante',
      description: 'Layout tradizionale a due colonne con foto',
      preview: 'assets/previews/classic-1.png',
      category: 'classic',
      hasPhoto: true
    },
    {
      id: 'creative-1',
      name: 'Creativo con Foto',
      description: 'Design colorato e dinamico con foto',
      preview: 'assets/previews/creative-1.png',
      category: 'creative',
      hasPhoto: true
    },
    {
      id: 'minimal-1',
      name: 'Minimalista Clean',
      description: 'Essenziale e pulito, solo testo',
      preview: 'assets/previews/minimal-1.png',
      category: 'minimal',
      hasPhoto: false
    },
    {
      id: 'professional-1',
      name: 'Professionale Corporate',
      description: 'Design corporate con foto e layout strutturato',
      preview: 'assets/previews/professional-1.png',
      category: 'modern',
      hasPhoto: true
    },
    {
      id: 'tech-1',
      name: 'Tech Developer',
      description: 'Template per sviluppatori senza foto',
      preview: 'assets/previews/tech-1.png',
      category: 'modern',
      hasPhoto: false
    },
    {
      id: 'executive-1',
      name: 'Executive Premium',
      description: 'Per posizioni dirigenziali con foto',
      preview: 'assets/previews/executive-1.png',
      category: 'classic',
      hasPhoto: true
    },
    {
      id: 'simple-1',
      name: 'Semplice Lineare',
      description: 'Layout lineare senza foto, molto pulito',
      preview: 'assets/previews/simple-1.png',
      category: 'minimal',
      hasPhoto: false
    }
  ];

  private sampleData: CVData = {
    personalInfo: {
      name: 'Mario Rossi',
      title: 'Sviluppatore Full Stack',
      email: 'mario.rossi@email.com',
      phone: '+39 123 456 7890',
      location: 'Milano, Italia',
      city: 'Milano',
      summary: 'Sviluppatore appassionato con 5 anni di esperienza in tecnologie web moderne.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    experience: [
      {
        company: 'Tech Solutions SRL',
        position: 'Senior Full Stack Developer',
        startDate: '2022-01',
        endDate: 'Presente',
        description: 'Sviluppo e manutenzione di applicazioni web enterprise utilizzando Angular, Node.js e MongoDB. Gestione team di 3 sviluppatori junior. Implementazione di architetture microservizi e CI/CD pipeline. Ottimizzazione performance applicazioni con riduzione tempi di caricamento del 40%.'
      },
      {
        company: 'Digital Agency Milano',
        position: 'Frontend Developer',
        startDate: '2020-06',
        endDate: '2021-12',
        description: 'Sviluppo interfacce utente responsive per clienti enterprise utilizzando React, Vue.js e TypeScript. Collaborazione con team UX/UI per implementazione design system. Integrazione API REST e GraphQL. Mentoring sviluppatori junior su best practices frontend.'
      },
      {
        company: 'StartupTech',
        position: 'Junior Web Developer',
        startDate: '2019-09',
        endDate: '2020-05',
        description: 'Sviluppo siti web e applicazioni utilizzando HTML5, CSS3, JavaScript e PHP. Manutenzione database MySQL. Supporto tecnico clienti e risoluzione bug. Partecipazione a progetti agili con metodologia Scrum.'
      }
    ],
    education: [
      {
        institution: 'Università Statale di Milano',
        degree: 'Laurea Magistrale in Informatica',
        city: 'Milano',
        year: '2020',
        startDate: '2018-09',
        endDate: '2020-07'
      },
      {
        institution: 'Università Statale di Milano',
        degree: 'Laurea Triennale in Informatica',
        city: 'Milano',
        year: '2018',
        startDate: '2015-09',
        endDate: '2018-07'
      },
      {
        institution: 'Liceo Scientifico',
        degree: 'Diploma di Maturità Scientifica',
        city: 'Milano',
        year: '2015',
        startDate: '2010-09',
        endDate: '2015-06'
      }
    ],
    skills: ['Angular', 'React', 'Vue.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Git', 'Jenkins', 'HTML5', 'CSS3', 'SASS/LESS', 'REST API', 'GraphQL', 'Agile/Scrum'],
    languages: [
      { language: 'Italiano', level: 'Madrelingua' },
      { language: 'Inglese', level: 'Fluente (C1)' },
      { language: 'Francese', level: 'Intermedio (B2)' },
      { language: 'Spagnolo', level: 'Base (A2)' }
    ]
  };

  getTemplates(): Observable<CVTemplate[]> {
    return of(this.templates);
  }

  getTemplateById(id: string): Observable<CVTemplate | undefined> {
    return of(this.templates.find(t => t.id === id));
  }

  getSampleData(): Observable<CVData> {
    return of(this.sampleData);
  }
}