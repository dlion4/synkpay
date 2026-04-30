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
  currentStep: number = 1;
  totalSteps: number = 12;
  isSubmitting: boolean = false;
  
  isDigitalAddress: boolean = false;

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

  get progressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  toggleManualAddress(isDigital: boolean) {
    this.isDigitalAddress = isDigital;
  }

  showMiniToast(msg: string) {
    alert(msg);
  }

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
    this.showMiniToast('Your progress has been saved temporarily.');
  }
}