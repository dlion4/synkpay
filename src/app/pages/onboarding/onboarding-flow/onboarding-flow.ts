import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PurposeStepComponent } from '../steps/purpose-step/purpose-step';
import { AccountFeaturesStepComponent } from '../steps/account-features-step/account-features-step';
// import { PurposeStepComponent } from '../steps/purpose-step/purpose-step.component';
import { EmploymentStepComponent } from '../steps/employment-step/employment-step';
import { TransactionVolumeStepComponent } from '../steps/transaction-volume-step/transaction-volume-step';
// import { AccountFeaturesStepComponent } from '../steps/account-features-step/account-features-step.component';
import { SecurityStepComponent } from '../steps/security-step/security-step';
import { ActivationStepComponent } from '../steps/activation-step/activation-step';

@Component({
  selector: 'app-onboarding-flow',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    PurposeStepComponent, 
    EmploymentStepComponent,
    TransactionVolumeStepComponent,
    AccountFeaturesStepComponent,
    SecurityStepComponent,
    ActivationStepComponent,
  ],
  templateUrl: './onboarding-flow.html',
  styleUrl: './onboarding-flow.scss'
})
export class OnboardingFlowComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  currentStep = 1;
  readonly totalSteps = 6;

  onboardingForm: FormGroup = this.fb.group({
    purpose: ['', Validators.required],
    employment: ['', Validators.required],
    incomeRange: ['', Validators.required],
    volume: ['', Validators.required],
    frequency: ['', Validators.required],
    features: [[]], 
    security: [['Push Notifications']],
  });

  get progressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  next() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    } else {
      this.completeOnboarding();
    }
  }

  back() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  completeOnboarding() {
    if (this.onboardingForm.valid) {
      this.router.navigate(['/dashboard']);
    } else {
      this.onboardingForm.markAllAsTouched();
    }
  }
}