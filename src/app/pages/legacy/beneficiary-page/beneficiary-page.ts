import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beneficiary-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beneficiary-page.html',
  styleUrls: ['./beneficiary-page.scss']
})
export class BeneficiaryPageComponent implements OnInit {
  // --- Main Layout State ---
  activeMainTab: 'beneficiaries' | 'pledges' | 'legal' = 'beneficiaries';
  lastUpdated: string = '2025-11-27';

  // --- Toast State ---
  toasts: { message: string, type: string, id: number }[] = [];
  private toastIdCounter = 0;

  // --- Add Beneficiary Wizard State ---
  isWizardOpen: boolean = false;
  wizardStep: number = 1;
  isSubmittingWizard: boolean = false;
  newBene = {
    name: '',
    dob: '',
    relation: 'Spouse',
    country: 'Kenya',
    allocation: 25,
    trigger: 'Contingency (Death / Incapacitation)',
    instructions: '',
    otp: ''
  };

  // --- Charity Pledge Modal State ---
  isCharityModalOpen: boolean = false;
  pledgeTarget: string = 'Global Education Fund';
  pledgeType: string = 'percent';
  pledgeValue: number = 10;
  pledgeChannel: string = 'SendMo Account';

  // --- Legal & Inquiry State ---
  inquiryState: 'pending' | 'loading' | 'verified' = 'pending';
  inquiryForm = {
    name: '',
    contactMethod: 'Email (Primary)',
    contactDetails: '',
    country: '',
    acknowledged: false
  };

  // --- Mock Data ---
  beneficiaries = [
    { name: 'Sarah Johnson', relation: 'Spouse', country: 'Nigeria', trigger: 'Death, Emergency', allocation: 50, method: 'SendMo Wallet' },
    { name: 'David Johnson', relation: 'Child (Adult)', country: 'Canada', trigger: 'Death', allocation: 20, method: 'Bank Transfer (CAD)' },
    { name: 'Grace Adebayo', relation: 'Sibling', country: 'Ghana', trigger: 'Death', allocation: 10, method: 'Mobile Money (GHS)' },
    { name: 'Emergency Reserve', relation: 'Self (Hospital Fund)', country: 'Global', trigger: 'Emergency Only', allocation: 10, method: 'SendMo Card' }
  ];

  pledges = [
    { target: 'Global Education Fund', type: 'Charity', value: '10% (Remainder)', trigger: 'Death/Contingency', status: 'Active' },
    { target: 'Acme University Scholarship', type: 'Sponsorship', value: 'Fixed $500', trigger: 'Death/Contingency', status: 'Inactive (Past)' }
  ];

  countries = ['Botswana', 'Canada', 'Germany', 'Ghana', 'Kenya', 'Malawi', 'Mozambique', 'Namibia', 'Netherlands', 'Nigeria', 'Rwanda', 'South Africa', 'Tanzania', 'Uganda', 'United Kingdom', 'United States', 'Zambia', 'Zimbabwe'];

  ngOnInit() {}

  // --- UI Methods ---
  setMainTab(tab: 'beneficiaries' | 'pledges' | 'legal') {
    this.activeMainTab = tab;
  }

  showToast(message: string, type: 'success' | 'danger' | 'info' | 'warning' = 'info') {
    const id = this.toastIdCounter++;
    this.toasts.push({ message, type, id });
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, 4000);
  }

  checkStatus() {
    this.showToast('Checking documentation status connected to local registries...', 'info');
    setTimeout(() => this.showToast('All documents are up to date and verified.', 'success'), 2000);
  }

  // --- Beneficiary Wizard Methods ---
  openWizard() {
    this.wizardStep = 1;
    this.isWizardOpen = true;
    this.isSubmittingWizard = false;
    this.newBene = { name: '', dob: '', relation: 'Spouse', country: 'Kenya', allocation: 25, trigger: 'Contingency (Death / Incapacitation)', instructions: '', otp: '' };
  }

  closeWizard() {
    this.isWizardOpen = false;
  }

  nextWizardStep() {
    if (this.wizardStep === 1 && !this.newBene.name) {
      this.showToast('Please enter the beneficiary\'s full name.', 'danger');
      return;
    }
    if (this.wizardStep === 2 && (this.newBene.allocation <= 0 || this.newBene.allocation > 100)) {
      this.showToast('Allocation must be between 1% and 100%.', 'danger');
      return;
    }
    if (this.wizardStep < 5) {
      this.wizardStep++;
    }
  }

  prevWizardStep() {
    if (this.wizardStep > 1) {
      this.wizardStep--;
    }
  }

  submitWizard() {
    if (this.newBene.otp.length < 4) {
      this.showToast('Please enter a valid 4-digit Security PIN/OTP.', 'danger');
      return;
    }
    this.isSubmittingWizard = true;
    setTimeout(() => {
      this.isSubmittingWizard = false;
      this.beneficiaries.unshift({
        name: this.newBene.name,
        relation: this.newBene.relation,
        country: this.newBene.country,
        trigger: this.newBene.trigger.split(' ')[0], // short version
        allocation: this.newBene.allocation,
        method: 'Pending Setup'
      });
      this.showToast(`${this.newBene.name} has been securely added as a beneficiary.`, 'success');
      this.closeWizard();
    }, 2000);
  }

  // --- Pledges Methods ---
  openCharityModal(preselectFoundation: boolean = false) {
    if (preselectFoundation) {
      this.pledgeTarget = 'SendMo Foundation (Financial Literacy)';
      this.pledgeValue = 5;
    } else {
      this.pledgeTarget = 'Global Education Fund';
      this.pledgeValue = 10;
    }
    this.isCharityModalOpen = true;
  }

  closeCharityModal() {
    this.isCharityModalOpen = false;
  }

  savePledge() {
    this.showToast('New Fund Pledge successfully securely created!', 'success');
    this.closeCharityModal();
  }

  removePledge(target: string) {
    if(confirm(`Are you sure you want to remove the pledge to ${target}?`)) {
      this.showToast('Pledge removed successfully.', 'warning');
    }
  }

  // --- Legal Inquiry Methods ---
  refreshStatus() {
    if (!this.inquiryForm.name) {
      this.showToast("Please enter your Full Name in the Profile Information card before running a check.", "danger");
      return;
    }
    this.inquiryState = 'loading';
    setTimeout(() => {
      this.inquiryState = 'verified';
      this.showToast("Refresh successful! The active pledge details are updated.", "success");
    }, 1500);
  }

  submitInquiry() {
    if (!this.inquiryForm.name) {
      this.showToast("Please enter your full name to start the inquiry.", "danger");
      return;
    }
    if (!this.inquiryForm.acknowledged) {
      this.showToast("Please check the acknowledgment box to authorize the verification process.", "danger");
      return;
    }
    this.inquiryState = 'loading';
    setTimeout(() => {
      this.inquiryState = 'verified';
      this.showToast("Success! We found an active pledge matching your profile.", "success");
    }, 2000);
  }
}