import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-security-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './security-step.html',
  styleUrls: ['./security-step.scss']
})
export class SecurityStepComponent {
  @Input({ required: true }) parentForm!: FormGroup;

 securityOptions = [
    { 
      id: 'biometrics', 
      title: 'Biometric Login', 
      desc: 'Use FaceID or Fingerprint for faster, secure access.',
      iconClass: 'bi-fingerprint' // The universal symbol for biometric security
    },
    { 
      id: '2fa', 
      title: 'Two-Factor Auth (2FA)', 
      desc: 'Require an SMS/Email code for every outgoing transfer.',
      iconClass: 'bi-shield-lock' // A shield with a lock to represent that extra layer of security
    },
    { 
      id: 'push_notifications', 
      title: 'Push Notifications', 
      desc: 'Real-time alerts for every dollar spent (Recommended).',
      iconClass: 'bi-bell' // Classic notification bell
    },
    { 
      id: 'marketing', 
      title: 'Marketing Updates', 
      desc: 'Be the first to hear about new features or interest rates.',
      iconClass: 'bi-megaphone' // Megaphone for announcements and marketing
    }
  ];

  toggleSecurity(optionId: string) {
    const control = this.parentForm.get('security');
    if (!control) return;
    let currentValues: string[] = control.value || [];
    
    if (currentValues.includes(optionId)) {
      currentValues = currentValues.filter(val => val !== optionId);
    } else {
      currentValues = [...currentValues, optionId];
    }
    control.setValue(currentValues);
  }

  isChecked(optionId: string): boolean {
    const control = this.parentForm.get('security');
    return control?.value?.includes(optionId) || false;
  }
}