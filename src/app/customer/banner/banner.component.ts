import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'


@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],// NgOptimizedImage used for  ngSrc
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit, AfterViewInit{

  @ViewChildren('animateOnScroll', { read: ElementRef }) elements!: QueryList<ElementRef>;

 largeViewImages: string[] = [
  'assets/images/scrollImg1.jpg',
  'assets/images/ring.jpg',
  'assets/images/hats2.jpg',
  'assets/images/scrollImg2.jpg',  
];

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
ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-out');
          // Optional: unobserve so animation happens only once
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    this.elements.forEach(el => observer.observe(el.nativeElement));
  }
  
}



