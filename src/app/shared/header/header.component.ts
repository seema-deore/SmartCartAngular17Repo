import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../../auth/login/login.component";
import { RegisterComponent } from '../../auth/register/register.component';

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
    this.currentRole = null;
    this.auth.role$.subscribe(role => {
      this.currentRole = role;
      console.log(this.currentRole);
    });
  }

  logout() {
    this.auth.logout();
     }
  }

  


