import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    }
  };

  revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [40000, 55000, 42000, 61000, 75000, 67000],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
    };

  categoryChartData = {
    labels: ['Electronics', 'Fashion', 'Home', 'Books'],
    datasets: [
      {
        data: [300, 500, 200, 100],
        backgroundColor: ['#ffc107', '#17a2b8', '#28a745', '#dc3545']
      }
    ]
  };
}
