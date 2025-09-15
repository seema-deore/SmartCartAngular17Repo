import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StoreLocation {
  name: string;
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoreLocationService {
  private jsonUrl = 'assets/store-locations.json'; // local file

  constructor(private http: HttpClient) {}

  getStoreLocations(): Observable<StoreLocation[]> {
    return this.http.get<StoreLocation[]>(this.jsonUrl);
  }
}
