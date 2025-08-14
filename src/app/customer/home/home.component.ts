import { Component } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import { RouterOutlet } from'@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
