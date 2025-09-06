import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from './shared/header/header.component';
import { BannerComponent } from './customer/banner/banner.component';
// import { OverviewComponent}from './admin/overview/overview.component';
import { AuthService } from './services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'  
})
export class AppComponent implements OnInit{
  title = 'SmartCart';
isAdminRoute = false;
features: any = [
{ heading : "✔ Free API Integration -",
  data : "To implement and maintain  E-commerce flow"
},
{ heading:"✔ Token-based Authentication -",
  data: "For verified Registration to Login via Authguard"
},
{ heading:"✔ Role-based Authorization - ",
  data: "To control flow access Admin/ Customer/ User via RoleGuard"
},
{ heading:"✔ Declarative Control Flow - ", 
  data: "Used @if, @for, @switch instead of legacy *ngIf / *ngFor"
},
{ heading:"✔ Standalone Components -" ,
  data:"No NgModule needed, making code lightweight and modular."
},
{ heading:"✔ Deferrable Views (@defer) - ",
  data: "Lazy-loaded login/register and product modules for faster initial load."
},
{ heading:"✔ Built-in Image Optimization -",
  data:" Applied lazy loading (loading='lazy') and responsive images."
},
{ heading:"✔ Signals (Reactivity Model) - ",
  data:"Simplified state management in cart and wishlist."
},
{ heading:"✔ Enhanced Router - ",
  data:"Used loadComponent for lazy standalone component routing."
},
{ heading:"✔ Strong Typed Forms -", 
  data:" Leveraged Angular 17 typed reactive forms for product add/update."
},
{ heading:"✔ Modern CSS Integration - ",
  data: "Scoped styles and utility classes with Bootstrap integration for Responsive Web design."
}]

  visibleFeatures: any = [];
  currentIndex = 0;
  showIntro : boolean= false;

  constructor( private authService: AuthService, private router: Router ){
        this.showFeaturesOneByOne();
       
    this.router.events.subscribe(() => {
      this.isAdminRoute = this.router.url.startsWith('/admin');
    });
  }
  
showFeaturesOneByOne() {
    const interval = setInterval(() => {
      if (this.currentIndex < this.features.length) {
        this.visibleFeatures.push(this.features[this.currentIndex]);
        this.currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 300);
  }

  startDemo() {
    this.showIntro = false;
    this.router.navigate(['']); // 
    this.authService.logout();
  }


  ngOnInit(): void {
    // this.router.navigate(['']);
      this.authService.logout();
  }
}
