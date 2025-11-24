import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CVData } from '../../models/cv-template.model';
import { AutocompleteService } from '../../services/autocomplete.service';
import { PhotoUploadService } from '../../services/photo-upload.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cv-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzStepsModule,
    NzAutocompleteModule,
    NzSelectModule,
    NzDividerModule,
    NzTagModule
  ],
  templateUrl: './cv-editor.component.html',
  styleUrls: ['./cv-editor.component.less']
})
export class CVEditorComponent implements OnInit {
  @Input() cvData!: CVData;
  @Input() hasPhoto: boolean = false;
  @Output() dataChanged = new EventEmitter<CVData>();
  @Output() backToPreview = new EventEmitter<void>();

  get experienceSectionTitle(): string {
    return this.cvData?.userType === 'student' ? 'Esperienze Formative' : 'Esperienza Lavorativa';
  }

  get experienceCompanyLabel(): string {
    return this.cvData?.userType === 'student' ? 'Organizzazione/Ente' : 'Azienda';
  }

  get experiencePositionLabel(): string {
    return this.cvData?.userType === 'student' ? 'Ruolo/Attività' : 'Posizione';
  }

  cvForm!: FormGroup;
  currentStep = 0;
  
  // Options for selects
  allCities: string[] = [];
  allUniversities: string[] = [];
  allHighSchools: string[] = [];
  skillOptions: string[] = [];
  languageOptions: string[] = [];
  languageLevelOptions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private autocompleteService: AutocompleteService,
    private photoUploadService: PhotoUploadService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadStaticOptions();
  }

  loadStaticOptions() {
    // Carica tutte le città italiane
    this.autocompleteService.searchCities('').subscribe(cities => {
      this.allCities = cities.sort();
    });
    
    // Carica tutte le università
    this.autocompleteService.searchUniversities('').subscribe(unis => {
      this.allUniversities = unis.sort();
    });
    
    // Carica tutte le scuole superiori
    this.autocompleteService.searchHighSchools('').subscribe(schools => {
      this.allHighSchools = schools.sort();
    });
    
    // Carica lingue e livelli
    this.autocompleteService.getLanguages().subscribe(langs => {
      this.languageOptions = langs;
    });
    
    this.autocompleteService.getLanguageLevels().subscribe(levels => {
      this.languageLevelOptions = levels;
    });
  }



  onSkillSearch(value: string) {
    this.autocompleteService.searchSkills(value).subscribe(skills => {
      this.skillOptions = skills;
    });
  }

  onPhotoUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.photoUploadService.resizeImage(file, 400, 400).subscribe({
        next: (dataUrl) => {
          this.cvForm.get('personalInfo.photo')?.setValue(dataUrl);
          this.message.success('Foto caricata con successo!');
        },
        error: (error) => {
          this.message.error(error);
        }
      });
    }
  }

  onPhotoDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.photoUploadService.resizeImage(file, 400, 400).subscribe({
        next: (dataUrl) => {
          this.cvForm.get('personalInfo.photo')?.setValue(dataUrl);
          this.message.success('Foto caricata con successo!');
        },
        error: (error) => {
          this.message.error(error);
        }
      });
    }
  }

  onPhotoDragOver(event: DragEvent) {
    event.preventDefault();
  }

  removePhoto() {
    this.cvForm.get('personalInfo.photo')?.setValue('');
    this.message.info('Foto rimossa');
  }

  initForm() {
    this.cvForm = this.fb.group({
      personalInfo: this.fb.group({
        name: [this.cvData.personalInfo.name, [Validators.required]],
        title: [this.cvData.personalInfo.title, [Validators.required]],
        email: [this.cvData.personalInfo.email, [Validators.required, Validators.email]],
        phone: [this.cvData.personalInfo.phone, [Validators.required]],
        location: [this.cvData.personalInfo.location, [Validators.required]],
        summary: [this.cvData.personalInfo.summary, [Validators.required]],
        photo: [this.cvData.personalInfo.photo || '']
      }),
      experience: this.fb.array(
        this.cvData.experience.map(exp => this.createExperienceGroup(exp))
      ),
      education: this.fb.array(
        this.cvData.education.map(edu => this.createEducationGroup(edu))
      ),
      skills: this.fb.array(
        this.cvData.skills.map(skill => this.fb.control(skill, [Validators.required]))
      ),
      languages: this.fb.array(
        this.cvData.languages.map(lang => this.createLanguageGroup(lang))
      )
    });
  }

  createExperienceGroup(exp: any) {
    return this.fb.group({
      company: [exp.company, [Validators.required]],
      position: [exp.position, [Validators.required]],
      startDate: [exp.startDate, [Validators.required]],
      endDate: [exp.endDate, [Validators.required]],
      description: [exp.description, [Validators.required]]
    });
  }

  createEducationGroup(edu: any) {
    return this.fb.group({
      institution: [edu.institution, [Validators.required]],
      degree: [edu.degree, [Validators.required]],
      city: [edu.city, [Validators.required]],
      startDate: [edu.startDate, [Validators.required]],
      endDate: [edu.endDate, [Validators.required]]
    });
  }

  createLanguageGroup(lang: any) {
    return this.fb.group({
      language: [lang.language, [Validators.required]],
      level: [lang.level, [Validators.required]]
    });
  }

  get experienceArray() {
    return this.cvForm.get('experience') as FormArray;
  }

  get educationArray() {
    return this.cvForm.get('education') as FormArray;
  }

  get skillsArray() {
    return this.cvForm.get('skills') as FormArray;
  }

  get languagesArray() {
    return this.cvForm.get('languages') as FormArray;
  }

  addExperience() {
    const newExp = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    this.experienceArray.push(this.createExperienceGroup(newExp));
  }

  removeExperience(index: number) {
    this.experienceArray.removeAt(index);
  }

  addEducation() {
    const newEdu = {
      institution: '',
      degree: '',
      city: '',
      startDate: '',
      endDate: ''
    };
    this.educationArray.push(this.createEducationGroup(newEdu));
  }

  removeEducation(index: number) {
    this.educationArray.removeAt(index);
  }

  addSkill() {
    this.skillsArray.push(this.fb.control('', [Validators.required]));
  }

  removeSkill(index: number) {
    this.skillsArray.removeAt(index);
  }

  addLanguage() {
    const newLang = {
      language: '',
      level: ''
    };
    this.languagesArray.push(this.createLanguageGroup(newLang));
  }

  removeLanguage(index: number) {
    this.languagesArray.removeAt(index);
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 0:
        const personalInfo = this.cvForm.get('personalInfo');
        return personalInfo?.valid || false;
      case 1:
        return this.experienceArray.length > 0 && this.experienceArray.valid;
      case 2:
        return this.educationArray.length > 0 && this.educationArray.valid;
      case 3:
        return this.skillsArray.length > 0 && this.skillsArray.valid;
      case 4:
        return this.languagesArray.length > 0 && this.languagesArray.valid;
      default:
        return false;
    }
  }

  onSave() {
    if (this.cvForm.valid) {
      const formValue = this.cvForm.value;
      this.dataChanged.emit(formValue);
      this.message.success('CV salvato con successo!');
    } else {
      this.message.error('Completa tutti i campi obbligatori');
    }
  }

  onBack() {
    this.backToPreview.emit();
  }
}