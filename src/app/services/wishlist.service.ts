import { Injectable } from '@angular/core';
// import { Product } from '../models/product.model'; // Create interface as needed

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist:any = [];

  constructor() {
    const storedList = localStorage.getItem('wishlist');
    if (storedList) {
      this.wishlist = JSON.parse(storedList);
    }
  }

  getWishlist():  any {
    return this.wishlist;
  }

  addToWishlist(product: any): void {
    if (!this.wishlist.find((p:any) => p.productId === product.id)) {
      this.wishlist.push(product);
      this.save();
    }
  }

  removeFromWishlist(productId: number): void {
    this.wishlist = this.wishlist.filter((p:any) => p.productId !== productId);
    this.save();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist.some((p:any) => p.productId === productId);
  }

  private save(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }
}
