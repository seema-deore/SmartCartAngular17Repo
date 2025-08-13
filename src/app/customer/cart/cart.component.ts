import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

 cartProductList:any;
  constructor(private productService:ProductService){}
  ngOnInit(): void {
      this.getCartProductList();
  }
getCartProductList(){
  this.productService.getCartProductByCustomerId(379).subscribe({
  next:(res:any)=>{
     this.cartProductList=res.data;
     console.log(this.cartProductList);
  },
  error:(err:any)=>{

  },
})}
  get totalAmount(): number {
    return this.cartProductList.reduce((sum:number, item:any) => sum + (item.productPrice * item.quantity), 0);
  }

  updateQuantity(item: any, qty: number) {
    if (qty < 1) {
      item.quantity = 1;
    } else {
      item.quantity = qty;
    }
  }

  removeItem(cartId: number) {
    this.cartProductList = this.cartProductList.filter((item:any) => item.cartId !== cartId);
  }
}
