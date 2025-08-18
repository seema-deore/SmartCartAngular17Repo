import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  cartProductList:any;
  checkoutForm = this.fb.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    paymentMethod: ['COD', Validators.required]
  });

  
  constructor(private fb: FormBuilder, private productService:ProductService) {}
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
 
  placeOrder() {
    // if (this.checkoutForm.invalid) return;
    // console.log('Order placed:', {
    //   customer: this.checkoutForm.value,
    //   items: this.cartItems,
    //   total: this.totalPrice
    // });
    // alert('Order placed successfully!');
    // this.checkoutForm.reset({ paymentMethod: 'COD' });
  }

}