import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication-service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss']
})
export class SignInComponent {

fm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required]),
  trustDevice: new FormControl(false)
});

authService = inject(AuthenticationService);
  

  isSubmitting = signal(false);
  showPassword: boolean = false;
  capsLockOn: boolean = false;
  toast = { show: false, message: '', type: 'success', icon: '' };

  constructor(private router: Router) {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capsLockOn = true;
    } else {
      this.capsLockOn = false;
    }
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);

      if (this.fm.invalid) {
        this.showToast('Please enter a valid email and password.', 'error', 'fa-exclamation-circle');
        return;
      }

      this.authService.login(this.fm.getRawValue().email!, this.fm.getRawValue().password!);
      if (this.authService.isLoggedIn()) {
        this.showToast('Login successful! Redirecting...', 'success', 'fa-check-circle');
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      }

    }, 2000);
  }

  showToast(message: string, type: 'success' | 'error' | 'warning', icon: string) {
    this.toast = { show: true, message, type, icon };
    setTimeout(() => this.toast.show = false, 3500);
  }
}