import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard-page-component.html',
  styleUrls: ['./dashboard-page-component.scss']
})
export class DashboardPageComponent {
  
  activeMainTab: 'personal' | 'business' = 'personal';
  activeBizTab: 'overview' | 'compliance' | 'developer' = 'overview';
  apiEnv: 'sandbox' | 'live' = 'sandbox';
  isCollapsed: boolean = false;

  depositState = { step: 1, max: 5, method: 'mpesa', amount: 0, phone: '' };
  withdrawState = { step: 1, max: 5, method: 'bank', amount: 0, to: '' };
  sendState = { step: 1, max: 4, amount: 0, recipient: null as any };
  transferState = { step: 1, max: 4, amount: 0, from: '', to: '' };
  receiveState = { step: 1, max: 4, amount: 0 };

  isProcessing: boolean = false;

  recipients = [
    { name: 'John Doe', email: 'john@example.com', initials: 'JD', color: 'primary' },
    { name: 'Sarah Smith', email: 'sarah@example.com', initials: 'SS', color: 'success' }
  ];

  toastMessage: string = '';
  showToast: boolean = false;

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2500);
  }

  nextStep(wizardType: 'deposit' | 'withdraw' | 'send' | 'transfer' | 'receive') {
    const state = (this as any)[wizardType + 'State'];
    
    if (wizardType === 'deposit' && state.step === 3 && (!state.amount || state.amount <= 0)) {
        alert("Please enter a valid amount"); 
        return;
    }
    if (wizardType === 'send' && state.step === 1 && (!state.amount || !state.recipient)) {
        alert("Please enter amount and select recipient"); 
        return;
    }

    const processingSteps: any = { deposit: 4, withdraw: 4, send: 3, transfer: 3, receive: 2 };
    
    if (state.step === processingSteps[wizardType]) {
      this.isProcessing = true;
      setTimeout(() => {
        this.isProcessing = false;
        state.step++;
      }, 1500);
      return;
    }

    if (state.step < state.max) {
      state.step++;
    }
  }

  prevStep(wizardType: 'deposit' | 'withdraw' | 'send' | 'transfer' | 'receive') {
    const state = (this as any)[wizardType + 'State'];
    if (state.step > 1) {
      state.step--;
    }
  }

  resetWizard(wizardType: 'deposit' | 'withdraw' | 'send' | 'transfer' | 'receive') {
    const state = (this as any)[wizardType + 'State'];
    state.step = 1;
    state.amount = 0;
    if (state.recipient !== undefined) {
      state.recipient = null;
    }
  }

  selectRecipient(rec: any) {
    this.sendState.recipient = rec;
  }

  setDepositMethod(method: string) {
    this.depositState.method = method;
  }

  autoNextNode(event: any) {
    const el = event.target;
    if (el.value.length >= 1 && el.nextElementSibling) {
      el.nextElementSibling.focus();
    }
    if (event.key === "Backspace" && el.previousElementSibling) {
      el.previousElementSibling.focus();
    }
  }
}