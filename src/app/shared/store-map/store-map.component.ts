import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Icon, Marker } from 'leaflet';
import { StoreLocationService, StoreLocation } from '../../services/store-location.service';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
});
@Component({
  selector: 'app-store-map',
  standalone: true,
  imports: [],
  templateUrl: './store-map.component.html',
  styleUrl: './store-map.component.css'
})
export class StoreMapComponent implements AfterViewInit {

  constructor(private storeService: StoreLocationService) {}

  ngAfterViewInit(): void {
    const map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Fetch store data dynamically
    this.storeService.getStoreLocations().subscribe((stores: StoreLocation[]) => {
      stores.forEach((store) => {
        L.marker([store.lat, store.lng])
          .addTo(map)
          .bindPopup(`<b>${store.name}</b>`);
      });
    });
  }
}
