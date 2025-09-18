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
        this.loading = false;
      });
    } 
    else if (msg.includes('my orders')) {
      this.chatService.getOrders(this.customerId).subscribe((res:any) => {
        this.messages.push({ type: 'bot', text: `📦 You have ${res.data.length} past orders.` });
        this.loading = false;
      });
    } 
    else if (msg.includes('categories')) {
      this.chatService.getCategories().subscribe((res:any) => {
        const cats = res.data.map((c: any) => c.categoryName).join(', ');
        this.messages.push({ type: 'bot', text: `📂 Available categories: ${cats}` });
        this.loading = false;
      });
    } 
    else if (msg.includes('Special Offers')) {
      this.chatService.getReadyChat('Special Offers').subscribe((res:any) => {       
        this.messages.push({ type: 'bot', text: `${res.special_offers.text}` });
        this.loading = false;
      });
    } 
    else if (msg.includes('Return Policy')) {
      this.chatService.getReadyChat('Return Policy').subscribe((res:any) => {       
        this.messages.push({ type: 'bot', text: `${res.return_policy.text}` });
        this.loading = false;
        
      });
    } 
    else if (msg.includes('Shipping Charges')) {
      this.chatService.getReadyChat('Shipping Charges').subscribe((res:any) => {       
        this.messages.push({ type: 'bot', text: `${res.shipping_charges.text}` });
        this.loading = false;
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
  // this.chatService.sendMessage(msg).subscribe((data:any)=>{
  //   console.log(data);
  // });
}
}

// handleQuickReply(query: string) {
//   this.userMessage = query; // fill input
//   this.sendMessage();       // trigger send
// }
onQuickClick(query: string) {
  this.userMessage = query; // fill input
  this.sendMessage();       // trigger send
}
}


// {
//   "Special offers": {
//     "title": "Special Offers",
//     "text": "🔥 Today's top deals: Up to 50% off on selected electronics, 25% off on fashion, and free shipping on orders above ₹999. Limited time only!"
//   },
//   "Return Policy": {
//     "title": "Return Policy",
//     "text": "↩️ You may return most items within 14 days of delivery in original condition. Refunds processed within 5-7 business days after we receive the item."
//   },
//   "Shipping charges": {
//     "title": "Shipping Charges",
//     "text": "🚚 Standard shipping: ₹49. Free shipping for orders over ₹999. Express delivery available at extra cost depending on location and weight."
//   }
// }
