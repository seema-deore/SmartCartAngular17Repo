import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  //  role: string | null = null; // or 'customer' or 'admin'
   currentRole: string | null = null;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.currentRole = 'Admin';// null
    this.auth.role$.subscribe(role => {
      this.currentRole = role;
      console.log(this.currentRole);
    });
  }

  logout() {
    this.auth.logout();
     }
  }

  


