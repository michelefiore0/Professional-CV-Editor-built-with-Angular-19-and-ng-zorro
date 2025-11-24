import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CVPreferences } from '../../models/cv-template.model';

@Component({
  selector: 'app-cv-wizard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzRadioModule,
    NzButtonModule,
    NzCardModule,
    NzIconModule
  ],
  templateUrl: './cv-wizard.component.html',
  styleUrls: ['./cv-wizard.component.less']
})
export class CVWizardComponent {
  @Output() preferencesSelected = new EventEmitter<CVPreferences>();
  
  wizardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.wizardForm = this.fb.group({
      userType: ['professional', Validators.required],
      hasPhoto: [true, Validators.required],
      experienceCount: ['1-3', Validators.required]
    });
  }

  onSubmit() {
    if (this.wizardForm.valid) {
      this.preferencesSelected.emit(this.wizardForm.value);
    }
  }
}
