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
  activeMainTab: 'cards' | 'virtual' | 'security' | 'transactions' = 'cards';
  
  activeCardId: string = '4242';
  isCardFrozen: boolean = false;
  isSettingsDrawerOpen: boolean = false;
  isDetailsDrawerOpen: boolean = false;

  isAddCardModalOpen: boolean = false;
  isChangePinModalOpen: boolean = false;
  isReportLostModalOpen: boolean = false;
  isReplaceCardModalOpen: boolean = false;
  isDeleteCardModalOpen: boolean = false;
  isGeoLockModalOpen: boolean = false;

  currentPin: string = '';
  newPin: string = '';
  confirmPin: string = '';

  isVccAuthenticated: boolean = false;
  vccTimer: number = 30;
  private timerInterval: any;

  ngOnDestroy() {
    this.clearVccTimer();
  }

  setMainTab(tab: 'cards' | 'virtual' | 'security' | 'transactions') {
    this.activeMainTab = tab;
  }

  selectCard(cardId: string) {
    this.activeCardId = cardId;
    this.isCardFrozen = cardId === '9011'; 
  }

  toggleFreeze() {
    this.isCardFrozen = !this.isCardFrozen;
    alert(this.isCardFrozen ? 'Card has been frozen.' : 'Card is active again.');
  }

  openSettingsDrawer() { this.isSettingsDrawerOpen = true; }
  closeSettingsDrawer() { this.isSettingsDrawerOpen = false; }
  
  openDetailsDrawer() { this.isDetailsDrawerOpen = true; }
  closeDetailsDrawer() { this.isDetailsDrawerOpen = false; }

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