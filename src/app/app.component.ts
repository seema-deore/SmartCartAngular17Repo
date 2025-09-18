import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from './shared/header/header.component';
import { BannerComponent } from './customer/banner/banner.component';
import { ChatbotComponent} from './customer/chatbot/chatbot.component';
// import {StoreMapComponent} from './shared/store-map/store-map.component';
import { AuthService } from './services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,FooterComponent,ChatbotComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'  
})
export class AppComponent implements OnInit{
  title = 'SmartCart';
isAdminRoute = false;
features: any = [

{ heading:"✔ Chatbot Conversation - ",
  data: "Custom chatbot powered by OpenAI + SmartCart APIs to assist users with FAQs and product queries in real time."
},
{ heading : "✔ 25+ Free Live API Integration -",
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
{ heading:"✔ Route Lazy Loading - ",
  data:"Faster initial load with on-demand module/component loading"
},
{ heading:"✔ Admin Dashboard UI -", 
  data: "With charts, stats, and recent activity tracking."
},
{ heading:"✔ Interactive Data Visualization -", 
  data:"Implemented charts using Chart.js v4 and ng2-charts v5 for sales and analytics."
},
{ heading:"✔ Bootstrap 5 Integration - ",
  data: "Responsive layouts with utility classes and scoped styling."
},
{ heading:"✔ Interactive Store Locator - ",
  data: "Leaflet map integration to show SmartCart store locations."
}

]

  visibleFeatures: any = [];
  currentIndex = 0;
  showIntro : boolean= true;

  constructor( private authService: AuthService, private router: Router ){
        this.showFeaturesOneByOne();
       
    this.router.events.subscribe(() => {
      this.isAdminRoute = this.router.url.startsWith('/admin'); // adjest  margin if adminroute
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
