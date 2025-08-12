import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
successMessage:string='';
errorMessage:string='';

categoryList:any = [];
productList:any = [];
wishlist:any = [];
cartProductList:any = [];

constructor(private wishlistService: WishlistService, private cartService: CartService,
            private productService: ProductService,
            private router: Router) {}

ngOnInit(): void {
localStorage.setItem('wishlist', JSON.stringify([]));
  this.getProductList();
  this.getCategoryList();
  this.getCartProductList();
  this.cartService.cartUpdated$.subscribe(updated => {
    if (updated) {
      this.getCartProductList(); // Refresh cart list when updated
    }
  });
}

getCartProductList(){
  this.productService.getCartProductByCustomerId(379).subscribe({
  next:(res:any)=>{
     this.cartProductList=res.data;
  },
  error:(err:any)=>{

  },
})
}
getCategoryList(){
this.productService.getAllCategory().subscribe({
  next: (res) => {
    this.successMessage = 'Product added successfully!';
    this.errorMessage = ''; 

    this.categoryList=res.data;
    console.log(this.categoryList);
  },
  error: (err) => {
    this.errorMessage = 'Failed!! Please try again.';
    this.successMessage = '';
    console.error(err); 
  },
  complete: () => {
    // optional - any cleanup after complete
  }
});
}
getProductList(){
    this.productService.getAllProducts().subscribe({
        next: (res: any) => {
          console.log('Request successful:', res.data);
          this.productList=res.data;
        },
        error: (err: any) => {
          console.error('Request Failed:', err);
          // alert('failed');
        },
        complete: () => {
          console.log('Request completed.');
        }
      });
  }
onselectCategory(categoryId:any){
 this.productService.getAllProductsCategoryIdWise(categoryId).subscribe((res:any)=>{
 this.productList= res.data;
 console.log(this.productList);
 })

}

onViewDetails(product:any){
 this.productService.setProduct(product);
  this.router.navigate(['/customer/product-details']);
}

addToWishlist(product: any): void {
  if (this.wishlistService.isInWishlist(product.productId)) {
    this.wishlistService.removeFromWishlist(product.productId);
  } else {
    this.wishlistService.addToWishlist(product);
  }
  this.wishlist = this.wishlistService.getWishlist();
  console.log(this.wishlist);
}

isInWishlist(productId: number): boolean {
  return this.wishlistService.isInWishlist(productId);
}
onRemoveCartItem(cartItemId:number){
this.productService.deleteProductFromCartById(379).subscribe((res:any)=>{
  this.getCartProductList();
})
 }

}
