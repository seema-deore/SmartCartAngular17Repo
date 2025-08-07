import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit{
 productList:any=[];
  services = [
    {
      icon: 'bi bi-truck',
      title: 'Free Delivery',
      description: 'Fast and free delivery on all orders above ₹499.'
    },
    {
      icon: 'bi bi-arrow-counterclockwise',
      title: 'Easy Returns',
      description: 'Hassle-free 7-day return policy for all purchases.'
    },
    {
      icon: 'bi bi-lock',
      title: 'Secure Payments',
      description: '100% secure payments with encryption protection.'
    },
    {
      icon: 'bi bi-headset',
      title: '24x7 Support',
      description: 'Dedicated customer support available round the clock.'
    }
  ];
  constructor( private authService: AuthService,private productService: ProductService){}
  ngOnInit(): void {
      this.getProductList();
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
}


