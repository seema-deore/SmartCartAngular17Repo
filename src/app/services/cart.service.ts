// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUpdatedSubject = new BehaviorSubject<boolean>(false);
  cartUpdated$ = this.cartUpdatedSubject.asObservable();

  constructor() {}
notifyCartUpdated() {
    this.cartUpdatedSubject.next(true);
  }
  
}
