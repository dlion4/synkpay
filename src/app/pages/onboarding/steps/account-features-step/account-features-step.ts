import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-features-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-features-step.html',
  styleUrl: './account-features-step.scss'
})
export class AccountFeaturesStepComponent {
  @Input({ required: true }) parentForm!: FormGroup;

 features = [
    { 
      id: 'virtual_card', 
      title: 'Virtual Card', 
      desc: 'Issue a digital card for instant online shopping.',
      iconClass: 'bi-credit-card-2-front'
    },
    { 
      id: 'auto_save', 
      title: 'Auto-Save', 
      desc: 'Enable "spare change" round-ups for automatic saving.',
      iconClass: 'bi-piggy-bank'
    },
    { 
      id: 'recurring', 
      title: 'Recurring Payments', 
      desc: 'Activate automatic send or receive transactions.',
      iconClass: 'bi-arrow-repeat'
    },
    { 
      id: 'overdraft', 
      title: 'Overdraft Cushion', 
      desc: 'Opt-in for a small credit cushion for bills.',
      iconClass: 'bi-shield-plus'
    }
  ];

  toggleFeature(featureId: string) {
    const control = this.parentForm.get('features');
    if (!control) return;
    let currentValues: string[] = control.value || [];
    
    if (currentValues.includes(featureId)) {
      currentValues = currentValues.filter(val => val !== featureId);
    } else {
      currentValues = [...currentValues, featureId];
    }
    control.setValue(currentValues);
  }

  isChecked(featureId: string): boolean {
    const control = this.parentForm.get('features');
    return control?.value?.includes(featureId) || false;
  }
}