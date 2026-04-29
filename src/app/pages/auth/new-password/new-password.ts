import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './new-password.html',
  styleUrls: ['./new-password.scss']
})
export class NewPasswordComponent implements OnInit, OnDestroy {
  
  // Form Model
  credentials = {
    newPassword: '',
    confirmPassword: ''
  };

  // UI & Security States
  showNewPass: boolean = false;
  showConfPass: boolean = false;
  isSubmitting: boolean = false;
  passwordsMatch: boolean = false;

  // Security Matrix
  reqs = {
    length: false,
    upper: false,
    number: false,
    symbol: false
  };
  score: number = 0;

  // Session Timer
  timeLeft: number = 900; // 15 minutes in seconds
  timerDisplay: string = '15:00';
  private timerInterval: any;

  // Toast Notification System
  toast = { show: false, message: '', type: 'success', icon: '' };

  constructor(private router: Router) {}

  ngOnInit() {
    this.startSessionTimer();
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  // --- Feature 1: Dynamic Security Matrix ---
  evaluatePassword() {
    const pw = this.credentials.newPassword;
    
    this.reqs.length = pw.length >= 8;
    this.reqs.upper = /[A-Z]/.test(pw);
    this.reqs.number = /[0-9]/.test(pw);
    this.reqs.symbol = /[^A-Za-z0-9]/.test(pw);

    this.score = Object.values(this.reqs).filter(Boolean).length;
    this.checkMatch(); // Re-evaluate match if base password changes
  }

  // --- Feature 4: Real-Time Match Validator ---
  checkMatch() {
    if (this.credentials.confirmPassword.length > 0) {
      this.passwordsMatch = this.credentials.newPassword === this.credentials.confirmPassword;
    } else {
      this.passwordsMatch = false;
    }
  }

  // --- Feature 2: Anti-Paste Enforcement ---
  preventPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.showToast('Security Alert: Pasting is disabled for confirmation.', 'warning', 'fa-shield-alt');
  }

  // --- Feature 3: Session Expiry Timer ---
  startSessionTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      } else {
        clearInterval(this.timerInterval);
        this.showToast('Session Expired. Redirecting...', 'error', 'fa-clock');
        setTimeout(() => this.router.navigate(['/auth/reset-password']), 2000);
      }
    }, 1000);
  }

  // --- Toggles ---
  togglePass(field: 'new' | 'conf') {
    if (field === 'new') this.showNewPass = !this.showNewPass;
    if (field === 'conf') this.showConfPass = !this.showConfPass;
  }

  // --- Form Submission ---
  onSubmit() {
    if (this.score < 4) {
      this.showToast('Password does not meet security requirements.', 'error', 'fa-times-circle');
      return;
    }
    if (!this.passwordsMatch) {
      this.showToast('Passwords do not match.', 'error', 'fa-exclamation-triangle');
      return;
    }

    this.isSubmitting = true;
    
    // Simulate API Call for updating password
    setTimeout(() => {
      this.isSubmitting = false;
      this.showToast('Vault Secured! Password updated successfully.', 'success', 'fa-check-double');
      
      setTimeout(() => {
        this.router.navigate(['/auth/sign-in']);
      }, 2000);
    }, 2000);
  }

  showToast(message: string, type: 'success' | 'error' | 'warning', icon: string) {
    this.toast = { show: true, message, type, icon };
    setTimeout(() => this.toast.show = false, 3500);
  }
}