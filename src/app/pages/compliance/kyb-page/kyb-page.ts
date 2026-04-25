import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kyb-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kyb-page.html',
  styleUrls: ['./kyb-page.scss']
})
export class KybPageComponent {
  // Wizard State
  currentStep: number = 1;
  totalSteps: number = 12;
  isSubmitting: boolean = false;
  
  // Step 4: Address Logic
  isDigitalAddress: boolean = false;

  // Step Navigation
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  setStep(step: number) {
    this.currentStep = step;
  }

  // Calculate Progress Bar Width dynamically
  get progressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  // Toggle manual address input in Step 4
  toggleManualAddress(isDigital: boolean) {
    this.isDigitalAddress = isDigital;
  }

  // Utility to show small alerts
  showMiniToast(msg: string) {
    alert(msg); // Replace with your actual Toast service
  }

  // Final Form Submission
  finalSubmit() {
    this.isSubmitting = true;
    
    setTimeout(() => {
      this.isSubmitting = false;
      alert("Success! Your Corporate KYB application has been submitted for review.");
      window.location.reload(); 
    }, 2500);
  }

  saveYourData() {
    console.log("Draft saved!");
    // You can add your actual save logic here, or trigger your toast:
    this.showMiniToast('Your progress has been saved temporarily.');
  }
}