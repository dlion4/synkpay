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
  
  credentials = {
    newPassword: '',
    confirmPassword: ''
  };

  showNewPass: boolean = false;
  showConfPass: boolean = false;
  isSubmitting: boolean = false;
  passwordsMatch: boolean = false;

  reqs = {
    length: false,
    upper: false,
    number: false,
    symbol: false
  };
  score: number = 0;

  timeLeft: number = 900;
  timerDisplay: string = '15:00';
  private timerInterval: any;

  toast = { show: false, message: '', type: 'success', icon: '' };

  constructor(private router: Router) {}

  ngOnInit() {
    this.startSessionTimer();
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  evaluatePassword() {
    const pw = this.credentials.newPassword;
    
    this.reqs.length = pw.length >= 8;
    this.reqs.upper = /[A-Z]/.test(pw);
    this.reqs.number = /[0-9]/.test(pw);
    this.reqs.symbol = /[^A-Za-z0-9]/.test(pw);

    this.score = Object.values(this.reqs).filter(Boolean).length;
    this.checkMatch();
  }

  checkMatch() {
    if (this.credentials.confirmPassword.length > 0) {
      this.passwordsMatch = this.credentials.newPassword === this.credentials.confirmPassword;
    } else {
      this.passwordsMatch = false;
    }
  }

  preventPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.showToast('Security Alert: Pasting is disabled for confirmation.', 'warning', 'fa-shield-alt');
  }

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

  togglePass(field: 'new' | 'conf') {
    if (field === 'new') this.showNewPass = !this.showNewPass;
    if (field === 'conf') this.showConfPass = !this.showConfPass;
  }

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