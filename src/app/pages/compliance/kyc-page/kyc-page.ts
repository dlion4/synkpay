import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kyc-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./kyc-page.html',
  styleUrls: ['./kyc-page.scss']
})
export class KycPageComponent {
  currentStep: number = 1;
  totalSteps: number = 11;
  isSubmitting: boolean = false;
    isDigitalAddress: boolean = false;
    uploadStatus: { [key: string]: 'idle' | 'scanning' | 'success' } = {
    front: 'idle',
    back: 'idle'
  };

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

  simulateUpload(side: 'front' | 'back') {
    this.uploadStatus[side] = 'scanning';
        setTimeout(() => {
      this.uploadStatus[side] = 'success';
    }, 3000);
  }

  finalSubmit() {
    this.isSubmitting = true;
    
    setTimeout(() => {
      this.isSubmitting = false;
      alert("Success! Your KYC application has been submitted for review.");
      window.location.reload(); 
    }, 2500);
  }

  // Utility for Toast
  showMiniToast(msg: string) {
    alert(msg);
  }


  saveYourData() {
    console.log("Draft saved!");
    this.showMiniToast('Your progress has been saved temporarily.');
  }
}