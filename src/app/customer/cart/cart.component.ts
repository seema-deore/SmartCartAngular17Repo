import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
quantity:number=0;
 cartProductList:any;
  constructor(private productService:ProductService, private cartService: CartService){}
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


addUpdatedToCart(item:any, newQuantity: number){
  
 const data= {
  "CartId": 0,
  "CustId": 379,
  "ProductId": item.productId,
  "Quantity": item.quantity,
  "AddedDate": new Date()
}
console.log(data);
// api not available
// this.productService.updateProductToCart(data).subscribe({
//   next:(res:any)=>{
     
//    this.cartService.notifyCartUpdated(); 
   
//      this.getCartProductList(); // in productList
//   },
//   error:(err:any)=>{

//   },
// })
}   
  

  removeItem(cartId: number) {
    this.productService.deleteProductFromCartById(cartId).subscribe((res:any)=>{
      alert("item removed")
    this.cartService.notifyCartUpdated();
    this.getCartProductList(); // Refresh cart list when updated       
 })
}
  }

