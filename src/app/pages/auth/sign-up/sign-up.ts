import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss']
})
export class SignUpComponent {
  
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  };

  isSubmitting: boolean = false;
  showPassword: boolean = false;
  passwordScore: number = 0;

  toast = { show: false, message: '', type: 'success' };

  constructor(private router: Router) {}

  checkPasswordStrength() {
    let score = 0;
    const pw = this.user.password;
    
    if (!pw) {
      this.passwordScore = 0;
      return;
    }

    if (pw.length > 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;

    this.passwordScore = score;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.user.firstName || !this.user.lastName || !this.user.email) {
      this.showToast('Please fill in all required fields.', 'error');
      return;
    }
    if (this.passwordScore < 3) {
      this.showToast('Please use a stronger password.', 'error');
      return;
    }
    if (this.user.password !== this.user.confirmPassword) {
      this.showToast('Passwords do not match.', 'error');
      return;
    }
    if (!this.user.agreedToTerms) {
      this.showToast('You must agree to the Terms & Conditions.', 'error');
      return;
    }

    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.showToast('Account created successfully!', 'success');
      
      setTimeout(() => {
        this.router.navigate(['/']); 
      }, 1500);

    }, 2000);
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toast = { show: true, message, type };
    setTimeout(() => this.toast.show = false, 3000);
  }
}