import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:5000/chat'; // Your Node/Express + OpenAI backend
  // private smartCartApi = 'http://localhost:8080/api/amazon'; // SmartCart API base URL

  constructor(private http: HttpClient) {}

  // 🔹 Send a message to OpenAI backend
  sendMessage(message: string): Observable<any> {
    return this.http.post<{ reply: string }>(this.apiUrl, { message });
  }

   getReadyChat(message: string): Observable<any> {
    return this.http.get<any>('assets/chatbot-responses.json');
  }


  // 🔹 Fetch cart products by customerId
  getCartProducts(customerId: number): Observable<any> {
    // return this.http.get(`${this.smartCartApi}/GetCartProductsByCustomerId?id=${customerId}`);
      return this.http.get<any>('/api/amazon/GetCartProductsByCustomerId?id=' + customerId);
  }

  // 🔹 Fetch order history by customerId
  getOrders(customerId: number): Observable<any> {
    // return this.http.get(`${this.smartCartApi}/GetOrdersByCustomerId?id=${customerId}`);
    return this.http.get<any>('/api/amazon/GetCartProductsByCustomerId?id=' + customerId);
  }

  // 🔹 Fetch product categories
  getCategories(): Observable<any> {
    // return this.http.get(`${this.smartCartApi}/GetAllCategories`);
    return this.http.get<any>('/api/amazon/GetAllCategory');
  }
}



