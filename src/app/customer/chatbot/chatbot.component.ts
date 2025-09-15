import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})

export class ChatbotComponent {

customerId:number=379;
isOpen: boolean = false;
  messages: { type: string; text: string }[] = [
    { type: 'bot', text: 'Hello 👋! I am SmartCart AI Assistant. How can I help you today?' }
  ];
  userMessage:string = '';
  loading:boolean = false;

  constructor(private chatService: ChatService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
  if (!this.userMessage.trim()) return;

  const msg = this.userMessage;
  this.messages.push({ type: 'user', text: msg });
  this.userMessage = '';
  this.loading = true;
  
if (msg.includes('my cart')) {
      this.chatService.getCartProducts(this.customerId).subscribe((res:any) => {
        this.messages.push({ type: 'bot', text: `🛒 You have ${res.data.length} products in your cart.` });
      });
    } 
    else if (msg.includes('my orders')) {
      this.chatService.getOrders(this.customerId).subscribe((res:any) => {
        this.messages.push({ type: 'bot', text: `📦 You have ${res.data.length} past orders.` });
      });
    } 
    else if (msg.includes('categories')) {
      this.chatService.getCategories().subscribe((res:any) => {
        const cats = res.data.map((c: any) => c.categoryName).join(', ');
        this.messages.push({ type: 'bot', text: `📂 Available categories: ${cats}` });
      });
    } 
    else {
      // 🔹 Fallback → AI response

  this.chatService.sendMessage(msg).subscribe({
    next: (res) => {
      console.log(res);
      this.messages.push({ type: 'bot', text: res.reply });
      this.loading = false;
    },
    error: () => {
      this.messages.push({ type: 'bot', text: "⚠️ Sorry, something went wrong." });
      this.loading = false;
    }
  });
}
}

handleQuickReply(query: string) {
  this.userMessage = query; // fill input
  this.sendMessage();       // trigger send
}
}


