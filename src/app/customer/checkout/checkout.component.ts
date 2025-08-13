import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm = this.fb.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    paymentMethod: ['COD', Validators.required]
  });

  cartItems = [
    { name: 'Product A', price: 100, qty: 2 },
    { name: 'Product B', price: 200, qty: 1 }
  ];

  constructor(private fb: FormBuilder) {}

  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  placeOrder() {
    if (this.checkoutForm.invalid) return;
    console.log('Order placed:', {
      customer: this.checkoutForm.value,
      items: this.cartItems,
      total: this.totalPrice
    });
    alert('Order placed successfully!');
    this.checkoutForm.reset({ paymentMethod: 'COD' });
  }
}
