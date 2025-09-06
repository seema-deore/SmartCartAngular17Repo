import { Component,OnInit} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService} from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from'@angular/router';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [NgChartsModule, CommonModule ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit{

dashboardData:any;

constructor(private dbService: DashboardService){}

ngOnInit(){
  this.dbService.getDashboardData().subscribe((res:any) => {
    console.log(res);
    this.dashboardData = res;
  });  
}

}
