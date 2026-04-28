import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-send-money-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-money-page.html',
  styleUrls: ['./send-money-page.scss']
})
export class SendMoneyPageComponent {
  // Main Tab State
  activeTab: string = 'bank'; // 'bank', 'wallet', 'sendmo'

  // Form State
  fundingSource: string = 'Personal Account ($4,250.00)';
  transferAmount: number = 500.00;
  memo: string = '';
  
  // Bank Form State
  bankName: string = 'First National Bank';
  accountNumber: string = 'IE93AIBK12903274291032';
  swiftCode: string = 'FNBSUS33XXX';
  recipientName: string = 'Sarah J. Connor';
  processingSpeed: string = 'instant'; // 'instant' or 'standard'

  // Digital Wallet Form State
  walletProvider: string = 'Select Provider';
  walletIdentifier: string = 'test.user@wallet.com';

  // Sendmo User Form State
  sendmoUserId: string = '@JaneDoe23';
  sendmoAccountTag: string = '';

  // Currency State (Shared)
  currencyType: string = 'USD';

  // Modal State
  isModalOpen: boolean = false;
  countdownTimer: number = 5;
  isConfirming: boolean = false;
  isSuccess: boolean = false;
  private intervalRef: any;

  // --- UI Methods ---
  setTab(tab: string) {
    this.activeTab = tab;
  }

  setCurrency(curr: string) {
    this.currencyType = curr;
  }

  setProcessingSpeed(speed: string) {
    this.processingSpeed = speed;
  }

  // --- Modal & Transfer Logic ---
  openReviewModal() {
    this.isModalOpen = true;
    this.isConfirming = false;
    this.isSuccess = false;
    this.countdownTimer = 5;

    this.intervalRef = setInterval(() => {
      this.countdownTimer--;
      if (this.countdownTimer <= 0) {
        clearInterval(this.intervalRef);
      }
    }, 1000);
  }

  cancelTransfer() {
    clearInterval(this.intervalRef);
    this.isModalOpen = false;
  }

  confirmTransfer() {
    this.isConfirming = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isConfirming = false;
      this.isSuccess = true;
    }, 1500);
  }

  copySuccessLink() {
    navigator.clipboard.writeText('sendmo.me/p/5521').then(() => {
      alert('Proof of payment link copied!');
    });
  }

  closeSuccessModal() {
    this.isModalOpen = false;
    this.isSuccess = false;
  }

  // Dynamic Calculation Helpers
  get serviceFee(): number {
    if (this.activeTab === 'sendmo') return 0.00;
    if (this.processingSpeed === 'instant') return this.transferAmount * 0.029; // 2.9%
    return this.transferAmount * 0.005; // 0.5%
  }

  get totalDebit(): number {
    return this.transferAmount + this.serviceFee;
  }
}