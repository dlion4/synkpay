import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-receive-money-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './receive-money-page.html',
  styleUrls: ['./receive-money-page.scss']
})
export class ReceiveMoneyPageComponent {
  // Main Tab State
  activeTab: string = 'request';

  // --- 1. Request Money State ---
  payerName: string = '';
  paymentPurpose: string = '';
  notifyEmail: boolean = true;
  notifyPhone: boolean = false;
  recipientEmail: string = 'test.user@wallet.com';
  recipientPhone: string = '071234567890';
  requestAmount: number = 125.00;
  requestCurrency: string = 'USD';
  generatedRequestLink: string = 'https://sendmo.me/pay/req-992x';
  
  // --- 2. Track Requests State ---
  trackSearchQuery: string = '';
  requests = [
    {
      id: '#REQ-90125',
      time: 'Created 2 mins ago',
      initial: 'GR',
      name: 'Global Retail',
      email: 'retail@global.co',
      amount: '10,200.00',
      currency: 'GBP',
      status: 'VIEWED',
      statusClass: 'bg-info bg-opacity-10 text-info',
      link: 'sendmo.me/req-x1'
    }
  ];

  // --- 3. Payment Link (Tip/Widget) State ---
  linkPurpose: string = 'Buy me a coffee';
  linkCurrency: string = 'USD';
  linkAmount: number = 2.00;
  linkValidity: string = 'never';
  generatedTipLink: string = 'sendmo.me/tip/jdoe-24';
  
  // Channels
  channels = {
    mobile: true,
    card: true,
    crypto: false,
    bank: false
  };

  // --- UI Triggers ---
  setTab(tab: string) {
    this.activeTab = tab;
  }

  setCurrency(curr: string) {
    this.requestCurrency = curr;
  }

  toggleChannel(channel: 'mobile' | 'card' | 'crypto' | 'bank') {
    this.channels[channel] = !this.channels[channel];
  }

  copyLink(link: string) {
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard: ' + link);
    });
  }

  copyRequestLink() {
    this.copyLink(this.generatedRequestLink);
  }

  copyTipLink() {
    this.copyLink(this.generatedTipLink);
  }

  generateRequestLink() {
    // API Call logic goes here
  }

  generateTipLink() {
    // API Call logic goes here
  }
}