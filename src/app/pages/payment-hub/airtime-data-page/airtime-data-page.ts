import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-airtime-data-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './airtime-data-page.html',
  styleUrls: ['./airtime-data-page.scss']
})
export class AirtimeDataPageComponent {
  // Main Tab State
  activeProductTab: 'airtime' | 'data' = 'airtime';

  // Input State
  selectedCountry: string = 'Choose Country...';
  countryCode: string = '+234';
  mobileNumber: string = '';
  
  // Carrier State
  carrierName: string = '';
  carrierInitial: string = '';

  // Product State
  selectedProduct: any = null;
  fundingAccount: string = 'USD Account: $1,200.50';

  // Modal State
  paymentStep: number = 1;
  authCode: string = '';
  isProcessing: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;

  // Mock Carrier Data Dictionary
  mockCarriers: any = {
    'NGN': { '+23480': 'MTN Nigeria', '+23490': 'Glo Nigeria', default: 'Airtel NG' },
    'KES': { '+25472': 'Safaricom', '+25470': 'Airtel KE', default: 'Telkom KE' },
    'USD': { default: 'T-Mobile US' },
    'ZAR': { default: 'Vodacom ZA' },
    'GHS': { default: 'MTN Ghana' }
  };

  // --- UI Methods ---
  setProductTab(tab: 'airtime' | 'data') {
    this.activeProductTab = tab;
    this.selectedProduct = null; // Reset selection on tab change
  }

  onCountryChange(event: any) {
    const select = event.target;
    this.countryCode = select.options[select.selectedIndex].dataset.code;
    this.detectCarrier();
  }

  onNumberChange() {
    this.detectCarrier();
  }

  detectCarrier() {
    const cleanNumber = this.mobileNumber.replace(/\s/g, '');
    
    if (cleanNumber.length >= 10 && this.selectedCountry !== 'Choose Country...') {
      const countryData = this.mockCarriers[this.selectedCountry];
      const fullNumber = this.countryCode + cleanNumber;
      
      let detectedName = countryData.default;

      for (const prefix in countryData) {
        if (prefix !== 'default' && fullNumber.startsWith(prefix)) {
          detectedName = countryData[prefix];
          break;
        }
      }

      this.carrierName = detectedName;
      this.carrierInitial = detectedName.charAt(0);
    } else {
      this.carrierName = '';
      this.carrierInitial = '';
    }
  }

  selectProduct(type: string, amount: number, formattedAmount: string, details: string) {
    this.selectedProduct = { type, amount, formattedAmount, details };
  }

  get isReadyToProceed(): boolean {
    return this.mobileNumber.replace(/\s/g, '').length >= 10 && this.selectedProduct !== null;
  }

  // --- Modal Logic ---
  resetPaymentModal() {
    this.paymentStep = 1;
    this.authCode = '';
    this.isProcessing = false;
    this.isSuccess = false;
    this.isError = false;
  }

  nextPaymentStep(step: number) {
    if (step === 3) {
      if (this.authCode !== '123456') {
        alert('Invalid 2FA Code. Try 123456.');
        return;
      }
      this.paymentStep = 3;
      this.simulateProcessing();
    } else {
      this.paymentStep = step;
    }
  }

  simulateProcessing() {
    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      // 80% chance of success mock
      if (Math.random() < 0.8) {
        this.isSuccess = true;
      } else {
        this.isError = true;
      }
    }, 2500);
  }
}