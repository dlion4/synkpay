import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transfers-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfers-page.html',
  styleUrls: ['./transfers-page.scss']
})
export class TransfersPageComponent implements OnDestroy {
  // Main Tab State
  activeTab: string = 'how_it_works'; // 'how_it_works', 'set_account', 'remittance'
  
  // Set Account Tab State
  activeVirtualAccount: string = 'usd';

  // Remittance Tab State
  remitFundingSource: string = 'usd_virtual';
  remitRecipientBank: string = '';
  remitRecipientAccount: string = '';
  remitSwiftCode: string = '';
  remitRecipientName: string = '';
  remitTransferTag: string = '';
  remitPurpose: string = 'Supplier Payment';
  remitSpeed: string = 'instant';
  remitCurrency: string = 'USD';
  remitAmount: number = 125.00;
  remitMemo: string = '';

  // Add Beneficiary Modal State
  benType: string = 'business';
  benCountry: string = '';
  benCurrency: string = 'kes';
  benBankName: string = '';
  benAccount: string = '';
  benSwift: string = '';
  benRouting: string = '';

  // Dynamic Calculation Helpers
  get remitBaseFee(): number { return 10.00; }
  get remitFxMargin(): number { return this.remitAmount * 0.005; }
  get remitTax(): number { return 1.50; }
  get remitTotalDebit(): number { return this.remitAmount + this.remitBaseFee + this.remitFxMargin + this.remitTax; }
  get remitReceiverGets(): number {
    if (this.remitCurrency === 'KES') return this.remitAmount * 132.40;
    if (this.remitCurrency === 'GBP') return this.remitAmount * 0.81;
    if (this.remitCurrency === 'EUR') return this.remitAmount * 0.92;
    return this.remitAmount; 
  }

  // Modal State Triggers
  isReviewModalOpen: boolean = false;
  isSuccessModalOpen: boolean = false;
  isDeactivateModalOpen: boolean = false;
  isAddCurrencyModalOpen: boolean = false;
  isAddBeneficiaryModalOpen: boolean = false;
  
  countdownTimer: number = 5;
  isConfirming: boolean = false;
  private intervalRef: any;

  ngOnDestroy() {
    this.clearTimers();
  }

  clearTimers() {
    if (this.intervalRef) clearInterval(this.intervalRef);
  }

  // --- UI Methods ---
  setTab(tab: string) { this.activeTab = tab; }
  setVirtualAccount(account: string) { this.activeVirtualAccount = account; }
  setCurrency(curr: string) { this.remitCurrency = curr; }
  setProcessingSpeed(speed: string) { this.remitSpeed = speed; }

  // --- Modal Logic ---
  openReviewModal() {
    this.isReviewModalOpen = true;
    this.isConfirming = false;
    this.isSuccessModalOpen = false;
    this.countdownTimer = 5;

    this.intervalRef = setInterval(() => {
      this.countdownTimer--;
      if (this.countdownTimer <= 0) clearInterval(this.intervalRef);
    }, 1000);
  }

  cancelTransfer() {
    clearInterval(this.intervalRef);
    this.isReviewModalOpen = false;
  }

  confirmTransfer() {
    this.isConfirming = true;
    setTimeout(() => {
      this.isConfirming = false;
      this.isReviewModalOpen = false;
      this.isSuccessModalOpen = true;
    }, 1500);
  }

  copySuccessLink() {
    navigator.clipboard.writeText('sendmo.me/p/5521').then(() => alert('Proof of payment link copied!'));
  }

  closeSuccessModal() { this.isSuccessModalOpen = false; }
  
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard: ' + text));
  }

  openDeactivateModal() { this.isDeactivateModalOpen = true; }
  closeDeactivateModal() { this.isDeactivateModalOpen = false; }
  
  openAddCurrencyModal() { this.isAddCurrencyModalOpen = true; }
  closeAddCurrencyModal() { this.isAddCurrencyModalOpen = false; }

  openAddBeneficiaryModal() { this.isAddBeneficiaryModalOpen = true; }
  closeAddBeneficiaryModal() { this.isAddBeneficiaryModalOpen = false; }
  
  saveBeneficiary() {
    alert('Beneficiary Saved Successfully!');
    this.closeAddBeneficiaryModal();
  }
}