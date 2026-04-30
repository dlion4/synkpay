import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employment-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employment-step.html',
  styleUrls: ['./employment-step.scss']
})
export class EmploymentStepComponent {
  @Input({ required: true }) parentForm!: FormGroup;

 employmentStatuses = [
    { 
      value: 'full_time', 
      title: 'Full-time Employee', 
      desc: 'Salaried position with a steady monthly income.',
      iconClass: 'bi-briefcase' // Professional briefcase
    },
    { 
      value: 'self_employed', 
      title: 'Self-Employed / Freelancer', 
      desc: 'Variable income from personal business or contracts.',
      iconClass: 'bi-laptop' // Laptop for remote/freelance work
    },
    { 
      value: 'student', 
      title: 'Student', 
      desc: 'Primary focus on education with limited or parental support.',
      iconClass: 'bi-mortarboard' // Graduation cap
    },
    { 
      value: 'unemployed_retired', 
      title: 'Unemployed / Retired', 
      desc: 'Living on savings, pension, or social support.',
      iconClass: 'bi-cup-hot' // Relaxing cup of coffee / taking a break
    }
  ];

  incomeRanges = [
    { value: '0_25k', label: '$0 – $25,000' },
    { value: '25k_75k', label: '$25,000 – $75,000' },
    { value: '75k_150k', label: '$75,000 – $150,000' },
    { value: '150k_plus', label: '$150,000+' }
  ];
}