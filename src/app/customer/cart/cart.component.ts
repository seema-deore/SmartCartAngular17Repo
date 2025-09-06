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
currentCartId: number=0;
quantity:number=0;
 cartProductList:any;
  constructor(private productService:ProductService, private cartService: CartService){}
  ngOnInit(): void {
      this.getCartProductList();
  }
getCartProductList(){
  this.productService.getCartProductByCustomerId(379).subscribe({
  next: (res: any) => {
    if (res.data) {
      this.cartProductList = res.data.map((item: any) => {
        const discount = Math.round(Math.round(item.productPrice) * 0.25); // 25% discount
        const discountedPrice = Math.round(item.productPrice - discount);
        return {
          ...item,
          discount,
          discountedPrice
        };
      });
    }
  },
  error: (err) => {
    console.error(err);
  }
});
}
  getCartSubtotal(): number {
  return this.cartProductList.reduce(
    (sum: number, item: any) => sum + (item.discountedPrice * item.quantity),
    0
  );
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
  
getCartId(cartId:number){
  this.currentCartId=cartId;
}
  onRemoveCartItem() {
    this.productService.deleteProductFromCartById(this.currentCartId).subscribe((res:any)=>{
    
    this.cartService.notifyCartUpdated();
    this.getCartProductList(); // Refresh cart list when updated       
 })
}

getDiscountedPrice(price: number): number {
  const discount = Math.round(price * 0.25);
  return price - discount;
}
  
}

