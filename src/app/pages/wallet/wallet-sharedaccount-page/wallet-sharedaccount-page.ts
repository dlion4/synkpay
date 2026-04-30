import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet-sharedaccount-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet-sharedaccount-page.html',
  styleUrls: ['./wallet-sharedaccount-page.scss']
})
export class WalletSharedAccountPageComponent implements OnInit {
  // Main Tabs
  activeTab: string = 'mo_overview';

  // --- Shared Wallet Creation State ---
  walletCurrency: string = 'KSH';
  totalAmount: number = 5000;
  includeMe: boolean = false;
  autoSplit: boolean = true;
  
  meSharePerc: number = 0;
  meAmount: number = 0;

  beneficiaries: Array<{ id: number, name: string, phone: string, sharePerc: number, amount: number }> = [];

  
  ngOnInit() {
    this.addBeneficiary(); // Start with one empty beneficiary row
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // --- Beneficiary Auto-Split Logic ---
  toggleMe() {
    this.calculateShares();
  }

  addBeneficiary() {
    this.beneficiaries.push({ id: Date.now(), name: '', phone: '', sharePerc: 0, amount: 0 });
    this.calculateShares();
  }

  removeBeneficiary(index: number) {
    this.beneficiaries.splice(index, 1);
    this.calculateShares();
  }

  calculateShares() {
    const count = this.beneficiaries.length + (this.includeMe ? 1 : 0);
    if (count === 0) {
      this.meSharePerc = 0;
      this.meAmount = 0;
      return;
    }

    if (this.autoSplit) {
      const basePerc = Math.floor(100 / count);
      const remainder = 100 % count;

      // Handle "Me" row
      if (this.includeMe) {
        this.meSharePerc = basePerc + remainder;
        this.meAmount = (this.meSharePerc / 100) * this.totalAmount;
      }

      // Handle other beneficiaries
      this.beneficiaries.forEach((b, index) => {
        let perc = basePerc;
        // Give remainder to first person if "Me" is not included
        if (!this.includeMe && index === 0) {
          perc += remainder;
        }
        b.sharePerc = perc;
        b.amount = (perc / 100) * this.totalAmount;
      });
    }
  }

  completeSharedWallet() {
    // Logic to save the shared wallet goes here
  }

}