import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './help-center.html',
  styleUrls: ['./help-center.scss']
})
export class HelpCenterComponent {
  // --- Tab States ---
  activeMainTab: 'guidance' | 'assistance' | 'audit' = 'assistance';
  activeGuidanceSubTab: 'legal' | 'service' | 'dev' = 'legal';
  activeAssistanceSubTab: 'reporting' | 'access' | 'escalation' = 'reporting';

  // --- Modal & Wizard States ---
  activeModal: string | null = null;
  ticketWizardStep: number = 1;
  isSubmitting: boolean = false;

  // --- Form States ---
  ticketForm = { category: '', subject: '', description: '' };
  alarmForm = { issue: '', contact: '0758489861', notes: '' };
  genericForm = { field1: '', field2: '', field3: '' };
  aiChatInput: string = '';

  // --- Toast State ---
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'danger' | 'warning' | 'info' = 'info';

  // --- Mock Data: Audit Logs ---
  auditLogs = [
    { event: 'Login Successful', ip: '197.232.14.55', location: 'Nairobi, KE', time: '10 mins ago', status: 'Safe' },
    { event: 'Password Changed', ip: '197.232.14.55', location: 'Nairobi, KE', time: '2 days ago', status: 'Safe' },
    { event: 'Failed Login Attempt', ip: '45.22.11.9', location: 'Unknown', time: '1 week ago', status: 'Flagged' },
    { event: 'New Device Authorized', ip: '197.232.14.55', location: 'Nairobi, KE', time: '1 month ago', status: 'Safe' }
  ];

  supportHistory = [
    { id: 'SENDMO-0748', subject: 'Failed KES Deposit', date: '2025-12-14', status: 'Resolved', badge: 'bg-success' },
    { id: 'SENDMO-0745', subject: 'Account locked', date: '2025-12-12', status: 'Pending Agent', badge: 'bg-warning text-dark' },
    { id: 'SENDMO-0731', subject: 'API endpoint issue', date: '2025-12-05', status: 'In Progress', badge: 'bg-primary' }
  ];

  activeDevices = [
    { name: 'iPhone 14 Pro', os: 'iOS 17.2', location: 'Nairobi, KE', lastActive: 'Active Now', current: true },
    { name: 'MacBook Pro', os: 'macOS Sonoma', location: 'Nairobi, KE', lastActive: '2 days ago', current: false }
  ];

  // --- Tab Controllers ---
  setMainTab(tab: 'guidance' | 'assistance' | 'audit') { this.activeMainTab = tab; }
  setGuidanceSubTab(tab: 'legal' | 'service' | 'dev') { this.activeGuidanceSubTab = tab; }
  setAssistanceSubTab(tab: 'reporting' | 'access' | 'escalation') { this.activeAssistanceSubTab = tab; }

  // --- Modal Controllers ---
  openModal(modalId: string) {
    this.genericForm = { field1: '', field2: '', field3: '' }; // Reset form
    this.ticketWizardStep = 1;
    this.activeModal = modalId;
  }

  closeModal() {
    this.activeModal = null;
  }

  submitGenericForm(successMessage: string) {
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.displayToast(successMessage, 'success');
      this.closeModal();
    }, 1500);
  }

  // --- Ticket Wizard Controller ---
  nextTicketStep(step: number) {
    this.ticketWizardStep = step;
  }

  submitTicket() {
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.ticketWizardStep = 3; // Show success screen
    }, 1500);
  }

  revokeDevice(device: any) {
    if(confirm(`Revoke access for ${device.name}?`)) {
      this.activeDevices = this.activeDevices.filter(d => d !== device);
      this.displayToast('Device revoked successfully.', 'success');
    }
  }

  exportData() {
    this.displayToast('GDPR Data Export initiated. You will receive an email shortly.', 'success');
  }

  // --- Global Toast ---
  displayToast(msg: string, type: 'success' | 'danger' | 'warning' | 'info' = 'info') {
    this.toastMessage = msg;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 4000);
  }
}