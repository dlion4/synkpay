import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-limits-security-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './limits-security-page.html',
  styleUrls: ['./limits-security-page.scss']
})
export class LimitsSecurityPageComponent implements OnInit {
  // --- Selected Card State ---
  selectedCardId: string = '4242';
  isCardFrozen: boolean = false;
  
  // --- Limits State ---
  dailyLimit: number = 1000;
  monthlyLimit: number = 15000;
  perTransactionLimit: number = 500;
  atmDailyLimit: number = 300;

  // --- Channel Toggles ---
  allowOnline: boolean = true;
  allowContactless: boolean = true;
  allowMagstripe: boolean = false; // Usually off by default for security
  allowInternational: boolean = false;
  allowAtm: boolean = true;

  // --- Advanced Security Features ---
  dynamicCvv: boolean = true; // Auto-rotates CVV
  locationMatching: boolean = true; // Matches phone GPS to POS location
  aiFraudBlock: boolean = true; // Auto-freezes on suspicious patterns
  strict3DS: boolean = false; // Always demand OTP

  // --- Merchant Category Blocks ---
  blockCrypto: boolean = true;
  blockGambling: boolean = true;
  blockAdult: boolean = true;

  // --- UI State ---
  isSaving: boolean = false;
  showSuccessToast: boolean = false;

  // Mock Cards List
  myCards = [
    { id: '4242', name: 'Primary Checking', network: 'VISA', type: 'Physical', last4: '4242' },
    { id: '9011', name: 'Euro Travel', network: 'Mastercard', type: 'Virtual', last4: '9011' }
  ];

  ngOnInit(): void {
    // Initialization logic if needed
  }

  selectCard(cardId: string) {
    this.selectedCardId = cardId;
    // In a real app, you would fetch the specific card's settings here
  }

  toggleFreeze() {
    this.isCardFrozen = !this.isCardFrozen;
  }

  saveSecuritySettings() {
    this.isSaving = true;

    // Simulate API save delay
    setTimeout(() => {
      this.isSaving = false;
      this.showSuccessToast = true;

      // Hide toast after 3 seconds
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 3000);
    }, 1500);
  }

  resetToDefaults() {
    if(confirm('Are you sure you want to reset all security settings to their default values?')) {
      this.dailyLimit = 1000;
      this.monthlyLimit = 15000;
      this.perTransactionLimit = 500;
      this.atmDailyLimit = 300;
      this.allowOnline = true;
      this.allowContactless = true;
      this.allowMagstripe = false;
      this.allowInternational = false;
      this.allowAtm = true;
      this.dynamicCvv = true;
      this.locationMatching = true;
      this.aiFraudBlock = true;
      this.strict3DS = false;
      this.blockCrypto = true;
      this.blockGambling = true;
      this.blockAdult = true;
    }
  }
}