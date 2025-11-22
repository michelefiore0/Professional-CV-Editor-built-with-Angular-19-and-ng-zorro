import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  
  constructor(private http: HttpClient) {}

  // API per città italiane
  searchCities(query: string): Observable<string[]> {
    const cities = this.getItalianCities();
    if (!query) {
      return of(cities);
    }
    
    // Usa API REST Countries per città italiane
    return this.http.get<any>(`https://restcountries.com/v3.1/name/italy`)
      .pipe(
        map(() => this.getItalianCities().filter(city => 
          city.toLowerCase().includes(query.toLowerCase())
        )),
        catchError(() => of(this.getItalianCities().filter(city => 
          city.toLowerCase().includes(query.toLowerCase())
        )))
      );
  }

  // Lista università italiane
  searchUniversities(query: string): Observable<string[]> {
    return this.http.get<string[]>('/assets/data/italian-universities.json')
      .pipe(
        map(universities => {
          if (!query) {
            return universities.sort();
          }
          return universities
            .filter(uni => uni.toLowerCase().includes(query.toLowerCase()))
            .sort();
        }),
        catchError(() => {
          const fallback = this.getItalianUniversities();
          if (!query) {
            return of(fallback);
          }
          return of(fallback.filter(uni => 
            uni.toLowerCase().includes(query.toLowerCase())
          ));
        })
      );
  }

  // Lista scuole superiori italiane
  searchHighSchools(query: string): Observable<string[]> {
    const schools = this.getItalianHighSchools();
    if (!query) {
      return of(schools);
    }

    return of(this.getItalianHighSchools().filter(school => 
      school.toLowerCase().includes(query.toLowerCase())
    ));
  }

  // Lista competenze tecniche
  searchSkills(query: string): Observable<string[]> {
    if (!query || query.length < 2) {
      return of([]);
    }

    return of(this.getTechSkills().filter(skill => 
      skill.toLowerCase().includes(query.toLowerCase())
    ));
  }

  // Lista lingue
  getLanguages(): Observable<string[]> {
    return of([
      'Italiano', 'Inglese', 'Francese', 'Spagnolo', 'Tedesco', 
      'Portoghese', 'Russo', 'Cinese', 'Giapponese', 'Arabo'
    ]);
  }

  // Lista livelli lingua
  getLanguageLevels(): Observable<string[]> {
    return of([
      'Madrelingua', 'Fluente (C2)', 'Avanzato (C1)', 
      'Intermedio Alto (B2)', 'Intermedio (B1)', 
      'Elementare (A2)', 'Base (A1)'
    ]);
  }

  private getItalianCities(): string[] {
    return [
      'Agrigento', 'Alessandria', 'Ancona', 'Andria', 'Aosta', 'Arezzo', 'Ascoli Piceno',
      'Asti', 'Avellino', 'Bari', 'Barletta', 'Belluno', 'Benevento', 'Bergamo',
      'Biella', 'Bologna', 'Bolzano', 'Brescia', 'Brindisi', 'Cagliari', 'Caltanissetta',
      'Campobasso', 'Caserta', 'Catania', 'Catanzaro', 'Cesena', 'Chieti', 'Como',
      'Cosenza', 'Cremona', 'Crotone', 'Cuneo', 'Enna', 'Fermo', 'Ferrara',
      'Firenze', 'Foggia', 'Forlì', 'Frosinone', 'Genova', 'Gorizia', 'Grosseto',
      'Imperia', 'Isernia', 'L\'Aquila', 'La Spezia', 'Latina', 'Lecce', 'Lecco',
      'Livorno', 'Lodi', 'Lucca', 'Macerata', 'Mantova', 'Massa', 'Matera',
      'Messina', 'Milano', 'Modena', 'Monza', 'Napoli', 'Novara', 'Nuoro',
      'Oristano', 'Padova', 'Palermo', 'Parma', 'Pavia', 'Perugia', 'Pesaro',
      'Pescara', 'Piacenza', 'Pisa', 'Pistoia', 'Pordenone', 'Potenza', 'Prato',
      'Ragusa', 'Ravenna', 'Reggio Calabria', 'Reggio Emilia', 'Rieti', 'Rimini',
      'Roma', 'Rovigo', 'Salerno', 'Sassari', 'Savona', 'Siena', 'Siracusa',
      'Sondrio', 'Taranto', 'Teramo', 'Terni', 'Torino', 'Trapani', 'Trento',
      'Treviso', 'Trieste', 'Udine', 'Varese', 'Venezia', 'Verbania', 'Vercelli',
      'Verona', 'Vibo Valentia', 'Vicenza', 'Viterbo'
    ];
  }

  private getItalianUniversities(): string[] {
    return [
      'Università Statale Milano', 'Università Bocconi', 'Politecnico di Milano',
      'Sapienza Università di Roma', 'Università di Bologna', 'Università di Padova',
      'Università di Firenze', 'Università di Torino', 'Università di Napoli Federico II',
      'Università di Pisa', 'Università di Genova', 'Università di Palermo',
      'Università di Bari', 'Università di Catania', 'Università di Venezia Ca\' Foscari',
      'Università di Verona', 'Università di Trieste', 'Università di Brescia',
      'Università di Parma', 'Università di Modena e Reggio Emilia',
      'Università di Perugia', 'Università di Cagliari', 'Università di Salerno',
      'Università di Ferrara', 'Università di Trento', 'Università di Udine',
      'Università di Bergamo', 'Università di Pavia', 'Università Cattolica del Sacro Cuore',
      'LUISS Guido Carli', 'Università IULM', 'Università San Raffaele'
    ];
  }

  private getItalianHighSchools(): string[] {
    return [
      'Liceo Scientifico', 'Liceo Classico', 'Liceo Linguistico', 'Liceo Artistico',
      'Liceo delle Scienze Umane', 'Liceo Musicale e Coreutico', 'Liceo Sportivo',
      'Istituto Tecnico Economico', 'Istituto Tecnico Tecnologico',
      'Istituto Tecnico per il Turismo', 'Istituto Tecnico Agrario',
      'Istituto Professionale per i Servizi', 'Istituto Professionale per l\'Industria e l\'Artigianato',
      'Istituto Professionale Alberghiero', 'Istituto Professionale Sanitario',
      'Istituto Professionale per l\'Agricoltura', 'Istituto Nautico',
      'Istituto Aeronautico', 'Conservatorio di Musica', 'Accademia di Belle Arti'
    ];
  }

  private getTechSkills(): string[] {
    return [
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby',
      'Go', 'Rust', 'Swift', 'Kotlin', 'Angular', 'React', 'Vue.js', 'Node.js',
      'Express.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Laravel',
      'HTML5', 'CSS3', 'SASS', 'LESS', 'Bootstrap', 'Tailwind CSS',
      'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch',
      'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Jenkins',
      'Git', 'GitHub', 'GitLab', 'Jira', 'Confluence', 'Slack',
      'REST API', 'GraphQL', 'Microservizi', 'Agile', 'Scrum', 'DevOps',
      'Machine Learning', 'AI', 'Data Science', 'Big Data', 'Blockchain'
    ];
  }
}