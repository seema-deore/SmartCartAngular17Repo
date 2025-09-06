import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
// this.authService.setRole(response.role); // 'admin' or 'customer'
  loginForm!: FormGroup;
  submitted = false;
  returnUrl: string='';
  error:any;
  errorMsg:string=''
  loginError: string='';
  currentRole:string='';
  admintoken:string='';
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }  

  ngOnInit(): void {  
  
  localStorage.removeItem('token');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    });

    // this.authService.logout();        
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  
 onTry(){
   this.loginForm.reset();
   this.loginError='';
 }
  
  onSubmit() {   

      this.submitted = true;

      const loginData = {
          EmailId: this.email?.value,
          Password: this.password?.value
      };

    // Call login function
this.authService.login(loginData).subscribe({
        next: (res: any) => {
         
          if(!res.data)
            this.errorMsg=res.message;
          // alert(res.message);
        else{
          localStorage.setItem('token', res.data.token);
        }
        if(this.authService.isLoggedIn()){
           this.currentRole= localStorage.getItem('role')||'';
           this.authService.setRole(this.currentRole);
        
             if(this.authService.isAdmin()){
            
                this.router.navigate(['/admin/overview']);
             }
             else if(this.authService.isCustomer()){ 
               this.authService.setRole("Customer"); 
                 this.router.navigate(['/customer/products']);
         }    }


          console.log(localStorage.getItem('token'));
        },
        error: (err: any) => {
          console.error('Login failed:', err);
          alert('failed. Please try again.');
        },
        complete: () => {
          console.log('Request completed.');
        }
      });
    
    }  

  onCancel(){
    this.loginForm.reset();
    this.errorMsg='';
  }
}
 