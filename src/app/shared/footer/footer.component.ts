import { Component } from '@angular/core';
import {StoreMapComponent} from '../store-map/store-map.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [StoreMapComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
