import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

export interface Review {
  name: string;
  email: string;
  comment: string;
  rating: number; // 1–5
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent implements OnInit{

 
  product:any=[];
  cartProductList:any=[];

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) {}

  reviews: Review[] = [
    {
      name: 'Alice',
      email: 'alice@example.com',
      comment: 'Great product! Good value for money.',
      rating: 4
    },
    {
      name: 'Rahul',
      email: 'rahul@example.com',
      comment: 'Quality is okay but delivery was delayed.',
      rating: 3
    },
    {
      name: 'Sneha',
      email: 'sneha@example.com',
      comment: 'Exactly what I wanted. Will buy again.',
      rating: 5
}
  ];

  // model for new review form
  newReview: Review = {
    name: '',
    email: '',
    comment: '',
    rating: 0
  };

  addReview() {
    // simple push; in real app you'd validate, maybe POST to server
    this.reviews.push({ ...this.newReview });
    // reset form
    this.newReview = { name: '', email: '', comment: '', rating: 0 };
  }

sameCategoryProducts: any = [];

ngOnInit() {

  this.product = this.productService.getProduct(); // get selected product from product-list
  console.log(this.product);
  if (!this.product) {
    // fallback: route param
  }
 
  this.productService.getAllProductsCategoryIdWise(this.product.categoryId).subscribe((res:any)=>{
    this.sameCategoryProducts = res.data;
    
  });
  
  this.sameCategoryProducts = (this.sameCategoryProducts).slice(0,10); //10 similar cat products
    
}

quantity = 1;

increaseQty() {
  if (this.quantity < 10) this.quantity++;
}

decreaseQty() {
  if (this.quantity > 1) this.quantity--;
}

onAddToCart(product:any){
 const data= {
  "CartId": 1010,
  "CustId": 379,
  "ProductId": product.productId,
  "Quantity": this.quantity,
  "AddedDate": new Date()
}
this.productService.addProductToCart(data).subscribe({
  next:(res:any)=>{
     alert("added");  
   this.cartService.notifyCartUpdated(); 
    //  this.getCartProductList(); 
  },
  error:(err:any)=>{

  },
})
}
getCartProductList(){
  this.productService.getCartProductByCustomerId(101).subscribe({
  next:(res:any)=>{
     this.cartProductList=res.data;
     console.log(this.cartProductList);
  },
  error:(err:any)=>{

  },
})}
}