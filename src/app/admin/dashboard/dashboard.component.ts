import { Component,OnInit} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService} from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from'@angular/router';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
dashboardData:any;
isSidebarCollapsed = false;


currentRoute: string = ''; 
  

constructor(private dbService: DashboardService,public auth: AuthService, private router: Router){
  this.router.events.subscribe(() => {
      const url = this.router.url;

      // Example: /admin/dashboard => Dashboard
      if (url.includes('overview')) this.currentRoute = 'Dashboard';
      else if (url.includes('products')) this.currentRoute = 'Products';
      else if (url.includes('categories')) this.currentRoute = 'Categories';
      else if (url.includes('orders')) this.currentRoute = 'Orders';
      else this.currentRoute = '';
    });
}

ngOnInit(){
  this.dbService.getDashboardData().subscribe((res:any) => {
    console.log(res);
    this.dashboardData = res;
  });  
}
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
logout() {
    this.auth.logout();
     }

    }