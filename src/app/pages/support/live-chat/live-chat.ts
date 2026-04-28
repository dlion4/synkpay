import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'user' | 'ai' | 'system';
  text: string;
  time: Date;
  isQuickAction?: boolean;
}

@Component({
  selector: 'app-live-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './live-chat.html',
  styleUrls: ['./live-chat.scss']
})
export class LiveChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatScrollContainer') private chatScrollContainer!: ElementRef;

  // --- Layout State ---
  activeMainTab: 'ai-chat' | 'human-support' | 'history' | 'settings' = 'ai-chat';
  activeModal: string | null = null;
  
  // --- Chat State ---
  userInput: string = '';
  isAiTyping: boolean = false;
  chatMessages: ChatMessage[] = [];
  
  // --- Support Queue State ---
  agentsOnline: number = 14;
  estWaitTime: string = '< 2 mins';
  coBrowsePin: string = '';

  // --- Preferences State ---
  chatPrefs = {
    language: 'en-US',
    personality: 'Professional',
    saveTranscripts: true,
    endToEndEncryption: true
  };

  // --- Mock Data ---
  quickActions = [
    "Check my account balance",
    "Where is my recent transfer?",
    "Freeze my virtual card",
    "Help me with a chargeback"
  ];

  chatHistory = [
    { id: 'CHAT-8839', date: '2026-04-28', topic: 'Failed Transfer Reversal', agent: 'AI + Human', sentiment: 'Positive', duration: '12m' },
    { id: 'CHAT-8812', date: '2026-04-25', topic: 'KYC Document Upload', agent: 'AI Assistant', sentiment: 'Neutral', duration: '4m' },
    { id: 'CHAT-8790', date: '2026-04-20', topic: 'Virtual Card Creation', agent: 'AI Assistant', sentiment: 'Positive', duration: '2m' }
  ];

  ngOnInit() {
    // Initial Greeting
    this.pushMessage('ai', 'Welcome to the SendMO Intelligence Hub. I am your secure AI assistant. How can I assist you today?');
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  // --- Navigation & Modals ---
  setMainTab(tab: 'ai-chat' | 'human-support' | 'history' | 'settings') {
    this.activeMainTab = tab;
  }

  openModal(modalId: string) {
    this.activeModal = modalId;
    if (modalId === 'cobrowse') {
      this.generateCoBrowsePin();
    }
  }

  closeModal() {
    this.activeModal = null;
  }

  // --- Chat Logic ---
  sendMessage() {
    if (!this.userInput.trim()) return;

    const text = this.userInput;
    this.pushMessage('user', text);
    this.userInput = '';
    this.simulateAiResponse(text);
  }

  triggerQuickAction(action: string) {
    this.pushMessage('user', action, true);
    this.simulateAiResponse(action);
  }

  private pushMessage(sender: 'user' | 'ai' | 'system', text: string, isQuickAction = false) {
    this.chatMessages.push({
      sender,
      text,
      time: new Date(),
      isQuickAction
    });
  }

  private simulateAiResponse(triggerText: string) {
    this.isAiTyping = true;
    
    // Simulate network delay
    setTimeout(() => {
      this.isAiTyping = false;
      let response = "I'm processing your request. One moment please.";
      
      if (triggerText.toLowerCase().includes('balance')) {
        response = "Your current available balance across all wallets is $42,500.00 USD. Would you like a detailed breakdown?";
      } else if (triggerText.toLowerCase().includes('freeze')) {
        response = "I can help with that. Please verify your action by opening the 'Limits & Security' tab or confirm here with your 4-digit PIN.";
      } else if (triggerText.toLowerCase().includes('agent') || triggerText.toLowerCase().includes('human')) {
        response = "I am transferring you to a live human agent. Current estimated wait time is < 2 mins.";
        this.pushMessage('system', 'Transferring to Live Queue...');
      }

      this.pushMessage('ai', response);
    }, 1800);
  }

  // --- Integrations ---
  generateCoBrowsePin() {
    this.coBrowsePin = Math.floor(100000 + Math.random() * 900000).toString();
  }

  requestLiveAgent() {
    this.setMainTab('ai-chat');
    this.pushMessage('system', 'You requested a live agent from the support dashboard.');
    this.simulateAiResponse('agent');
  }

  downloadTranscript(id: string) {
    alert(`Downloading encrypted transcript for session ${id}...`);
  }
}