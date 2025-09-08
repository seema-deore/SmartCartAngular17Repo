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
  imports: [NgChartsModule, CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit{

dashboardData: any;
revenueChartData: any;
categoryChartData: any;
monthlySalesLabels:any;
monthlySalesValues:any; 
monthlySalesChart!: ChartConfiguration;

  categoryLabels :any;
  categoryValues :any;
  categoryChart!: ChartConfiguration;

  topProductLabels: any ;
  topProductRevenues : any;
  topProductsChart!: ChartConfiguration;
  dualAxisChart!: ChartConfiguration;


constructor(private dbService: DashboardService){}

ngOnInit(){
  this.dbService.getDashboardData().subscribe((res:any) => {
    console.log(res);
    this.dashboardData = res;     
    this.getChartData();
})
}
getChartData(){

this.monthlySalesLabels = this.dashboardData?.monthlySales.map((m: any) => m.month);
this.monthlySalesValues = this.dashboardData?.monthlySales.map((m: any) => m.sales);
  this.monthlySalesChart = {
    type: 'line',
    data: {
      labels: this.monthlySalesLabels,
      datasets: [
        {
          data: this.monthlySalesValues,
          label: 'Monthly Sales',
          fill: true,
          borderColor: '#214c6fff',
          backgroundColor: 'rgba(185, 216, 242, 0.3)',
          tension: 0.3
        }
      ]
    }
  };

  // Category Pie Chart
 this. categoryLabels = this.dashboardData?.categoryData.map((c: any) => c.name);
  this.categoryValues = this.dashboardData?.categoryData.map((c: any) => c.value);
  this.categoryChart = {
    type: 'pie',
    data: {
      labels: this.categoryLabels,
      datasets: [
        {
          data: this.categoryValues,
          backgroundColor: [
            '#c2d9ebff', '#c5f9c6ff', '#f7d9acff', '#f2c9f9ff', '#ebb19fff', '#b3f2ecff'
          ]
        }
      ]
    }
  };

  // Top Products Bar Chart
  this.topProductLabels = this.dashboardData?.topProducts.map((p: any) => p.productName);
  this.topProductRevenues = this.dashboardData?.topProducts.map((p: any) => p.revenue);
  this.topProductsChart = {
    type: 'bar',
    data: {
      labels: this.topProductLabels,
      datasets: [
        {
          data: this.topProductRevenues,
          label: 'Revenue',
          backgroundColor: '#677f93ff'
        }
      ]
    },
    options: { indexAxis: 'y' }
  };

  // Dual Axis Chart (Revenue vs Orders)
  this.dualAxisChart= {
    type: 'line',
    data: {
      labels: this.monthlySalesLabels,
      datasets: [
        {
          data: this.dashboardData?.monthlySales.map((m: any) => m.sales),
          label: 'Revenue',
          borderColor: '#42A5F5',
          yAxisID: 'y',
          fill: false
        },
        {
          data: this.dashboardData?.monthlySales.map((m: any) => m.sales / 1000), // demo orders
          label: 'Orders',
          borderColor: '#66BB6A',
          yAxisID: 'y1',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { position: 'left' },
        y1: { position: 'right' }
      }
    }
  };

}
}


