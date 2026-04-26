import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet-referrals-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet-referrals-page.html',
  styleUrls: ['./wallet-referrals-page.scss']
})
export class WalletReferralsPageComponent {
  referralLink: string = 'https://sendmo.app/join/merchant_29x4';
  selectedRedeemDestination: string = 'primary'; // default radio selection

  // Dynamic Data for Network Invitations
  invitations = [
    {
      name: 'Kipepeo Coffee Ltd',
      initial: 'K',
      category: 'Retail & Logistics',
      date: 'Mar 15, 2026',
      progress: 100,
      volumeText: 'KES 12,400 / 10k',
      reward: '+ 50 USD',
      status: 'Active',
      statusClass: 'badge-success',
      avatarClass: 'bg-light-danger text-danger'
    },
    {
      name: 'Jambo Safari Group',
      initial: 'J',
      category: 'Hospitality',
      date: 'Mar 19, 2026',
      progress: 42,
      volumeText: 'KES 4,200 / 10k',
      reward: 'Pending',
      status: 'Pending',
      statusClass: 'badge-light-warning text-warning',
      avatarClass: 'bg-light-info text-info'
    }
  ];

  copyToClipboard() {
    navigator.clipboard.writeText(this.referralLink).then(() => {
      alert('Referral link copied to clipboard!');
    });
  }

  setRedeemDestination(dest: string) {
    this.selectedRedeemDestination = dest;
  }

  confirmRedemption() {
    alert(`Redemption requested to: ${this.selectedRedeemDestination.toUpperCase()}`);
    // Implement actual modal close and API call here
  }
}