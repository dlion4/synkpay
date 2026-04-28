import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-continuity-saving-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './continuity-saving-page.html',
  styleUrls: ['./continuity-saving-page.scss']
})
export class ContinuitySavingPageComponent implements OnInit, OnDestroy {
  // --- Core State ---
  isProtectionActive: boolean = false;
  inactivityPeriod: string = '12'; // Default 12 months
  destinationType: string = 'internal'; // 'internal' or 'external'

  // --- Fund Destination Logic ---
  selectedInternalVault: string = 'Vault-A';
  selectedExternalBank: string = 'Bank-KCB';

  // --- Verification Rules ---
  requireOtp: boolean = true;
  requirePin: boolean = true;
  requireBiometric: boolean = false;
  trustedContactPing: boolean = true;

  // --- Post-Trigger Automation Actions (The 10+ Features) ---
  actions = {
    renderDormant: true,
    freezePhysicalCards: true,
    freezeVirtualCards: true,
    deactivateApiKeys: true,
    suspendWebhooks: true,
    cancelAutoSubscriptions: true,
    pauseRecurringCollections: true,
    notifyTrustedContacts: true,
    lockCryptoTrading: true,
    suspendB2bPayouts: true,
    generateTaxStatements: true,
    autoLiquidateAssets: false
  };

  // --- Modal & UI State ---
  isConfirmModalOpen: boolean = false;
  isSuccessModalOpen: boolean = false;
  isSaving: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  
  countdown: number = 5;
  private timerRef: any;

  ngOnInit() {
    // Initialization
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  clearTimer() {
    if (this.timerRef) clearInterval(this.timerRef);
  }

  // --- Methods ---
  toggleProtection() {
    this.isProtectionActive = !this.isProtectionActive;
    this.displayToast(this.isProtectionActive ? 'Continuity Protection Activated.' : 'Continuity Protection Paused.');
  }

  openConfirmModal() {
    this.isConfirmModalOpen = true;
    this.countdown = 5;
    this.isSaving = false;

    this.timerRef = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.clearTimer();
      }
    }, 1000);
  }

  closeConfirmModal() {
    this.isConfirmModalOpen = false;
    this.clearTimer();
  }

  confirmAndSave() {
    this.isSaving = true;
    setTimeout(() => {
      this.isSaving = false;
      this.isConfirmModalOpen = false;
      this.isSuccessModalOpen = true;
      this.isProtectionActive = true;
    }, 2000);
  }

  closeSuccessModal() {
    this.isSuccessModalOpen = false;
  }

  displayToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }
}