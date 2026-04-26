import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet-soloaccount-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet-soloaccount-page.html',
  styleUrls: ['./wallet-soloaccount-page.scss']
})
export class WalletSoloaccountPageComponent implements OnInit, OnDestroy {
  // Main Tab State
  activeTab: string = 'checking';
  vaultCurrency: 'KES' | 'USD' = 'KES';
  instantPayoutActive: boolean = false;

  // Modals Step States
  depositStep: number = 1;
  depositType: string = 'online';
  
  withdrawStep: number = 1;
  withdrawOtpVisible: boolean = false;
  withdrawTimer: number = 5;
  private timerInterval: any;

  addSavingsStep: number = 1;
  
  autoSaverStep: number = 1;
  autoSaverActive: boolean = true;
  autoSaverPercentage: number = 5;

  // Terminal Simulation
  terminalLines: string[] = [];
  private traceInterval: any;

  // Exchange Estimator State
  estAmount: number = 5000;
  estFX: string = '1 USD = 129.50 KES';
  estFee: number = 40;
  estTotal: number = 647460.00;

  // --- Open Foreign Account Modal State ---
  foreignAccountStep: number = 1;
  selectedCurrency: string = 'GBP';
  accountNameType: string = 'default';
  customAccountName: string = '';
  
  // Terms & Notifications
  notifySms: boolean = false;
  notifyEmail: boolean = true;
  foreignTermsAccepted: boolean = false;
  isCreatingForeignAccount: boolean = false;

  ngOnInit() {}

  ngOnDestroy() {
    this.clearTimers();
  }

  clearTimers() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.traceInterval) clearInterval(this.traceInterval);
  }

  // --- UI Methods ---
  exportReport() {
    alert('Exporting PDF Report...');
  }

  showInfoAlert(msg: string) {
    alert('Info: ' + msg);
  }

  showMiniToast(msg: string) {
    alert(msg);
  }

  toggleInstantPayout() {
    if (this.instantPayoutActive) {
      alert("Warning: Instant Settlement activated. 0.5% fee applies to next transaction.");
    }
  }

  // --- Main Actions ---
  setTab(tab: string) {
    this.activeTab = tab;
  }

  toggleVaultCurrency() {
    this.vaultCurrency = this.vaultCurrency === 'KES' ? 'USD' : 'KES';
  }

  // --- Deposit Modal Logic ---
  resetDeposit() {
    this.depositStep = 1;
    this.clearTimers();
  }

  setDepositType(type: string) {
    this.depositType = type;
    this.depositStep = 3;
  }

  nextDepositStep(step: number) {
    this.depositStep = step;
    if (step === 4) {
      this.simulateDepositTrace();
    }
  }

  simulateDepositTrace() {
    this.terminalLines = ['> Initializing TLS 1.3 encryption...'];
    const messages = [
      "Connection established with Gateway...",
      "User Payload Generated...",
      "Waiting for PIN entry on device...",
      "Auth Token Received.",
      "Clearing Funds..."
    ];

    let i = 0;
    this.traceInterval = setInterval(() => {
      if (i >= messages.length) {
        clearInterval(this.traceInterval);
        setTimeout(() => this.depositStep = 7, 1000);
        return;
      }
      this.terminalLines.push(`> ${messages[i]}`);
      i++;
    }, 1000);
  }

  // --- Withdraw Modal Logic ---
  resetWithdraw() {
    this.withdrawStep = 1;
    this.withdrawOtpVisible = false;
    this.clearTimers();
  }

  nextWdStep(step: number) {
    this.withdrawStep = step;
    if (step === 4) {
      this.startWithdrawTimer();
    }
  }

  showOtpInput() {
    this.withdrawOtpVisible = true;
  }

  startWithdrawTimer() {
    this.withdrawTimer = 5;
    this.timerInterval = setInterval(() => {
      this.withdrawTimer--;
      if (this.withdrawTimer <= 0) {
        clearInterval(this.timerInterval);
        this.withdrawStep = 5;
      }
    }, 1000);
  }

  cancelWithdraw() {
    this.clearTimers();
    alert('Transaction Cancelled Safely.');
  }

  // --- Auto Saver Logic ---
  handleAutoSaverToggle(event: any) {
    if (!event.target.checked) {
      event.target.checked = true; 
    } else {
      this.autoSaverActive = true;
    }
  }

  resetAsSteps() {
    this.autoSaverStep = 1;
  }

  nextAsStep(step: number) {
    this.autoSaverStep = step;
  }

  confirmAutoSaver() {
    this.autoSaverActive = true;
  }

  finalizeDisable() {
    this.autoSaverActive = false;
  }

  // --- Add Savings Logic ---
  resetAddSavings() {
    this.addSavingsStep = 1;
    this.clearTimers();
  }

  nextAdsStep(step: number, simulate: boolean = false) {
    if (simulate && step === 6) {
      this.addSavingsStep = 6; 
      setTimeout(() => this.addSavingsStep = 7, 1500); 
    } else {
      this.addSavingsStep = step;
    }
  }

  // --- Exchange Logic ---
  updateEstimator() {
    this.estTotal = (this.estAmount * 129.50) - this.estFee;
  }

  // --- Open Foreign Account Modal Logic ---
  resetForeignAccountModal() {
    this.foreignAccountStep = 1;
    this.selectedCurrency = 'GBP';
    this.accountNameType = 'default';
    this.customAccountName = '';
    this.notifySms = false;
    this.notifyEmail = true;
    this.foreignTermsAccepted = false;
    this.isCreatingForeignAccount = false;
  }

  nextForeignStep(step: number) {
    this.foreignAccountStep = step;
  }

  prevForeignStep() {
    if (this.foreignAccountStep > 1) {
      this.foreignAccountStep--;
    }
  }

  createForeignAccount() {
    this.isCreatingForeignAccount = true;
    // Simulate API call delay
    setTimeout(() => {
      this.isCreatingForeignAccount = false;
      this.foreignAccountStep = 5; // Success Step
    }, 2000);
  }

}