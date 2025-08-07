import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
wishlist: any = [];

constructor(private wishlistService: WishlistService) {}

ngOnInit() {
  this.wishlist = this.wishlistService.getWishlist();
}
remove(id: number) {
  this.wishlistService.removeFromWishlist(id);
  this.wishlist = this.wishlistService.getWishlist();
}
}
