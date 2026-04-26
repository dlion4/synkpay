import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet-tokens-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet-tokens-page.html',
  styleUrls: ['./wallet-tokens-page.scss']
})
export class WalletTokensPageComponent {
  // Token State
  smoBalance: number = 500.00;
  fiatEquivalent: number = 5000.00;
  
  // VIP State
  vipTier: string = 'Gold Member';
  pointsToNextTier: number = 500;
  progressPercentage: number = 50;
  lifetimeEarned: number = 1250;
  savedOnFees: number = 7500;

  // Settings State
  useSmoForFees: boolean = true;

  // Dynamic Token Ledger Data
  tokenLedger = [
    {
      date: 'Today, 09:45 AM',
      title: 'Cashback: POS Collection',
      description: 'Generated from KES 45,000 sale',
      status: 'Minted',
      statusClass: 'badge-light-success text-success',
      amount: '+ 45.00 SMO',
      amountClass: 'text-success'
    },
    {
      date: 'Yesterday, 3:20 PM',
      title: 'Network Fee Payment',
      description: 'Covered fees for Invoice #INV-883',
      status: 'Burned',
      statusClass: 'badge-light-danger text-danger',
      amount: '- 2.50 SMO',
      amountClass: 'text-danger'
    },
    {
      date: '18 Mar 2026, 11:00 AM',
      title: 'P2P Transfer to Albert Flores',
      description: 'Memo: Split server costs',
      status: 'Transferred',
      statusClass: 'badge-light-primary text-primary',
      amount: '- 100.00 SMO',
      amountClass: 'text-gray-800'
    }
  ];

  // Action Handlers
  claimRewards() {
    alert('Processing your rewards claim...');
  }

  transferP2P() {
    alert('Opening P2P Transfer modal...');
  }

  convertToFiat() {
    alert('Opening Fiat Conversion modal...');
  }

  copyInviteLink() {
    navigator.clipboard.writeText('https://sendmo.app/join/merchant_29x4').then(() => {
      alert('Invite link copied to clipboard!');
    });
  }
}