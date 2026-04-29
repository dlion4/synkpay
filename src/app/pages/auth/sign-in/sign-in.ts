import { Component, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss']
})
export class SignInComponent {
  
  // Form Model
  credentials = {
    email: '',
    password: '',
    trustDevice: false
  };

  // UI States
  isSubmitting: boolean = false;
  showPassword: boolean = false;
  capsLockOn: boolean = false;

  // Toast Notification System
  toast = { show: false, message: '', type: 'success', icon: '' };

  constructor(private router: Router) {}

  // --- Feature 1: Smart Caps Lock Detection ---
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capsLockOn = true;
    } else {
      this.capsLockOn = false;
    }
  }

  // --- Toggle Password Visibility ---
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // --- Form Submission & Validation ---
  onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      this.showToast('Please enter both email and password.', 'error', 'fa-exclamation-circle');
      return;
    }

    // Simulate API Call & Encryption
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;

      // Mock Authentication Check
      if (this.credentials.email === 'admin@pkenya.com') {
        this.showToast('Login Successful! Securing session...', 'success', 'fa-shield-check');
        
        // Route to the dashboard or 2FA page after delay
        setTimeout(() => {
          this.router.navigate(['/']); // Or '/auth/two-factor'
        }, 1500);
      } else {
        this.showToast('Invalid credentials or unrecognized device.', 'error', 'fa-lock');
      }

    }, 2000);
  }

  // --- Dynamic Toast Helper ---
  showToast(message: string, type: 'success' | 'error' | 'warning', icon: string) {
    this.toast = { show: true, message, type, icon };
    setTimeout(() => this.toast.show = false, 3500);
  }
}