import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-center.html',
  styleUrls: ['./support-center.scss']
})
export class SupportCenterComponent implements OnInit {
  // --- Tab States ---
  activeMainTab: 'help' | 'support' | 'system' = 'support';
  activeHelpSubTab: 'docs-legal' | 'service-security' = 'docs-legal';
  activeSupportSubTab: 'issue-reporting' | 'account-access' | 'history-escalation' = 'issue-reporting';
  activeTicketWizardStep: number = 1;

  // --- Modal States ---
  isTicketModalOpen: boolean = false;
  isAlarmModalOpen: boolean = false;
  isFraudModalOpen: boolean = false;
  isDisputeModalOpen: boolean = false;
  isRecoveryModalOpen: boolean = false;
  isVerificationModalOpen: boolean = false;
  isPaymentIssueModalOpen: boolean = false;
  isEscalationModalOpen: boolean = false;
  isMerchantModalOpen: boolean = false;
  isHistoryModalOpen: boolean = false;

  // --- Form States ---
  ticketForm = { category: '', subject: '', description: '' };
  alarmForm = { issue: '', contact: '0758489861', notes: '' };
  fraudForm = { date: '', description: '' };
  disputeForm = { txnId: '', reason: '' };
  recoveryForm = { email: '' };
  verificationForm = { type: '' };
  paymentIssueForm = { type: '', reference: '' };
  escalationForm = { ticketId: '', reason: '' };
  merchantForm = { merchantId: '', requestType: '' };

  // --- Mock Data ---
  supportHistory = [
    { id: 'SENDMO-2025-0748', subject: 'Failed KES Deposit - KSh 15,000', date: '2025-12-14', status: 'Resolved', badge: 'bg-success' },
    { id: 'SENDMO-2025-0745', subject: 'Account locked after 3 failed attempts', date: '2025-12-12', status: 'Pending Agent', badge: 'bg-warning text-dark' },
    { id: 'SENDMO-2025-0740', subject: 'Inquiry about Q4 Compliance Docs', date: '2025-12-09', status: 'Resolved', badge: 'bg-success' },
    { id: 'SENDMO-2025-0731', subject: 'Error with Merchant API endpoint', date: '2025-12-05', status: 'In Progress', badge: 'bg-primary' },
    { id: 'SENDMO-2025-0720', subject: 'KYC Document Upload Timeout', date: '2025-12-01', status: 'Resolved', badge: 'bg-success' }
  ];

  ngOnInit() {}

  // --- Tab Controllers ---
  setMainTab(tab: 'help' | 'support' | 'system') { this.activeMainTab = tab; }
  setHelpSubTab(tab: 'docs-legal' | 'service-security') { this.activeHelpSubTab = tab; }
  setSupportSubTab(tab: 'issue-reporting' | 'account-access' | 'history-escalation') { this.activeSupportSubTab = tab; }
  setTicketWizardStep(step: number) { this.activeTicketWizardStep = step; }

  // --- Modal Controllers ---
  // Ticket Wizard
  openTicketModal() { this.activeTicketWizardStep = 1; this.isTicketModalOpen = true; }
  closeTicketModal() { this.isTicketModalOpen = false; }
  
  // Single Form Modals
  openModal(modalName: string) {
    if (modalName === 'alarm') this.isAlarmModalOpen = true;
    if (modalName === 'fraud') this.isFraudModalOpen = true;
    if (modalName === 'dispute') this.isDisputeModalOpen = true;
    if (modalName === 'recovery') this.isRecoveryModalOpen = true;
    if (modalName === 'verification') this.isVerificationModalOpen = true;
    if (modalName === 'payment') this.isPaymentIssueModalOpen = true;
    if (modalName === 'escalation') this.isEscalationModalOpen = true;
    if (modalName === 'merchant') this.isMerchantModalOpen = true;
    if (modalName === 'history') this.isHistoryModalOpen = true;
  }

  closeModal(modalName: string) {
    if (modalName === 'alarm') this.isAlarmModalOpen = false;
    if (modalName === 'fraud') this.isFraudModalOpen = false;
    if (modalName === 'dispute') this.isDisputeModalOpen = false;
    if (modalName === 'recovery') this.isRecoveryModalOpen = false;
    if (modalName === 'verification') this.isVerificationModalOpen = false;
    if (modalName === 'payment') this.isPaymentIssueModalOpen = false;
    if (modalName === 'escalation') this.isEscalationModalOpen = false;
    if (modalName === 'merchant') this.isMerchantModalOpen = false;
    if (modalName === 'history') this.isHistoryModalOpen = false;
  }

  // --- Submission Handlers ---
  submitForm(modalName: string, successMessage: string) {
    alert(successMessage);
    this.closeModal(modalName);
  }
}