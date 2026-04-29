import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss']
})
export class ResetPasswordComponent {
  
  // Form Models
  recoveryMode: 'email' | 'phone' = 'email';
  email: string = '';
  phone: string = '';

  // UI States
  isSubmitting: boolean = false;
  cooldownTimer: number = 0;
  showDomainSuggestions: boolean = false;

  // Domain Suggestions
  commonDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'pkenya.com'];

  // Toast Notification System
  toast = { show: false, message: '', type: 'success', icon: '' };

  // --- Feature 1: Smart Domain Suggester ---
  onEmailType(event: any) {
    const value = event.target.value;
    // Show suggestions only if user typed '@' and hasn't finished the domain
    this.showDomainSuggestions = value.includes('@') && value.split('@')[1].length < 3;
  }

  appendDomain(domain: string) {
    const prefix = this.email.split('@')[0];
    this.email = `${prefix}@${domain}`;
    this.showDomainSuggestions = false;
  }

  // --- Toggle Recovery Mode ---
  switchMode(mode: 'email' | 'phone') {
    this.recoveryMode = mode;
  }

  // --- Form Submission & Rate Limiting ---
  onSubmit() {
    if (this.recoveryMode === 'email' && !this.email) {
      this.showToast('Please enter your registered email.', 'error', 'fa-exclamation-circle');
      return;
    }
    if (this.recoveryMode === 'phone' && !this.phone) {
      this.showToast('Please enter your registered phone number.', 'error', 'fa-exclamation-circle');
      return;
    }

    this.isSubmitting = true;
    
    // Simulate secure API Call
    setTimeout(() => {
      this.isSubmitting = false;
      this.showToast('Secure recovery link dispatched!', 'success', 'fa-shield-check');
      this.startCooldown();
    }, 1500);
  }

  // --- Feature 2: Security Cooldown Timer ---
  startCooldown() {
    this.cooldownTimer = 60; // 60 seconds lockout
    const interval = setInterval(() => {
      this.cooldownTimer--;
      if (this.cooldownTimer <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  // --- Dynamic Toast Helper ---
  showToast(message: string, type: 'success' | 'error' | 'warning', icon: string) {
    this.toast = { show: true, message, type, icon };
    setTimeout(() => this.toast.show = false, 4000);
  }
}