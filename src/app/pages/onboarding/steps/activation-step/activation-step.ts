import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-activation-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activation-step.html',
  styleUrls: ['./activation-step.scss']
})
export class ActivationStepComponent {
  @Input({ required: true }) parentForm!: FormGroup;

  // We define the documents here to easily loop them in HTML
  legalDocs = [
    { 
      id: 'agreePrivacy', 
      label: 'Privacy Policy & Cookie Policy', 
      desc: 'How we collect, use, and protect your data.',
      link: '#' 
    },
    { 
      id: 'agreeTerms', 
      label: 'Platform Terms of Service', 
      desc: 'The rules and guidelines for using Pkenya.',
      link: '#' 
    },
    { 
      id: 'agreeAML', 
      label: 'Anti-Money Laundering (AML) Policy', 
      desc: 'Our commitment to preventing financial crime.',
      link: '#' 
    }
  ];

  // Helper method to check if a specific box is checked
  isChecked(controlName: string): boolean {
    return this.parentForm.get(controlName)?.value === true;
  }

  // Toggle method for the custom checkboxes
  toggleCheck(controlName: string) {
    const control = this.parentForm.get(controlName);
    if (control) {
      control.setValue(!control.value);
    }
  }
}