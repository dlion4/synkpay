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
  // Wizard State
  currentStep: number = 1;
  totalSteps: number = 11;
  isSubmitting: boolean = false;
  
  // Form Logic State
  isDigitalAddress: boolean = false;
  
  // Upload States
  uploadStatus: { [key: string]: 'idle' | 'scanning' | 'success' } = {
    front: 'idle',
    back: 'idle'
  };

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

  // Calculate Progress Bar Width
  get progressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  toggleManualAddress(isDigital: boolean) {
    this.isDigitalAddress = isDigital;
  }

  // Simulate AI Upload Scanning
  simulateUpload(side: 'front' | 'back') {
    this.uploadStatus[side] = 'scanning';
    
    // Simulate a 3-second API call/scan
    setTimeout(() => {
      this.uploadStatus[side] = 'success';
    }, 3000);
  }

  // Final Form Submission
  finalSubmit() {
    this.isSubmitting = true;
    
    setTimeout(() => {
      this.isSubmitting = false;
      alert("Success! Your KYC application has been submitted for review.");
      // In a real app, you would close the modal programmatically here or route away
      window.location.reload(); 
    }, 2500);
  }

  // Utility for Toast
  showMiniToast(msg: string) {
    alert(msg); // Replace with your preferred Toast library in Angular
  }


  saveYourData() {
    console.log("Draft saved!");
    // You can add your actual save logic here, or trigger your toast:
    this.showMiniToast('Your progress has been saved temporarily.');
  }
}