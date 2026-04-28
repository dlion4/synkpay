import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-cards-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cards-page.html',
  styleUrls: ['./cards-page.scss']
})
export class CardsPageComponent implements OnDestroy {
  // Main Navigation State
  activeMainTab: 'cards' | 'virtual' | 'security' | 'transactions' = 'cards';
  
  // Card Management State
  activeCardId: string = '4242';
  isCardFrozen: boolean = false;
  isSettingsDrawerOpen: boolean = false;
  isDetailsDrawerOpen: boolean = false;

  // Modals State
  isAddCardModalOpen: boolean = false;
  isChangePinModalOpen: boolean = false;
  isReportLostModalOpen: boolean = false;
  isReplaceCardModalOpen: boolean = false;
  isDeleteCardModalOpen: boolean = false;
  isGeoLockModalOpen: boolean = false;

  // PIN Change State
  currentPin: string = '';
  newPin: string = '';
  confirmPin: string = '';

  // VCC Details State
  isVccAuthenticated: boolean = false;
  vccTimer: number = 30;
  private timerInterval: any;

  ngOnDestroy() {
    this.clearVccTimer();
  }

  // --- UI Triggers ---
  setMainTab(tab: 'cards' | 'virtual' | 'security' | 'transactions') {
    this.activeMainTab = tab;
  }

  selectCard(cardId: string) {
    this.activeCardId = cardId;
    // Reset frozen state simulation based on selection
    this.isCardFrozen = cardId === '9011'; 
  }

  toggleFreeze() {
    this.isCardFrozen = !this.isCardFrozen;
    alert(this.isCardFrozen ? 'Card has been frozen.' : 'Card is active again.');
  }

  // --- Drawer Management ---
  openSettingsDrawer() { this.isSettingsDrawerOpen = true; }
  closeSettingsDrawer() { this.isSettingsDrawerOpen = false; }
  
  openDetailsDrawer() { this.isDetailsDrawerOpen = true; }
  closeDetailsDrawer() { this.isDetailsDrawerOpen = false; }

  // --- Modal Management ---
  openAddCardModal() { this.isAddCardModalOpen = true; }
  closeAddCardModal() { this.isAddCardModalOpen = false; }

  openChangePinModal() { this.isChangePinModalOpen = true; }
  closeChangePinModal() { 
    this.isChangePinModalOpen = false;
    this.currentPin = '';
    this.newPin = '';
    this.confirmPin = '';
  }

  openReportLostModal() { this.isReportLostModalOpen = true; }
  closeReportLostModal() { this.isReportLostModalOpen = false; }

  openReplaceCardModal() { this.isReplaceCardModalOpen = true; }
  closeReplaceCardModal() { this.isReplaceCardModalOpen = false; }

  openDeleteCardModal() { this.isDeleteCardModalOpen = true; }
  closeDeleteCardModal() { this.isDeleteCardModalOpen = false; }

  openGeoLockModal() { this.isGeoLockModalOpen = true; }
  closeGeoLockModal() { this.isGeoLockModalOpen = false; }

  // --- Virtual Card Reveal Logic ---
  revealCardData() {
    this.isVccAuthenticated = true;
    this.vccTimer = 30;
    
    this.clearVccTimer();
    this.timerInterval = setInterval(() => {
      this.vccTimer--;
      if (this.vccTimer <= 0) {
        this.clearVccTimer();
        this.isVccAuthenticated = false;
      }
    }, 1000);
  }

  clearVccTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}