import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-onboarding-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './onboarding-layout.html',
  styleUrl: './onboarding-layout.scss' 
})
export class OnboardingLayoutComponent {}