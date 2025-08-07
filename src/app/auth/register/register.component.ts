import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
registerForm!: FormGroup;
  submitted = false;
  returnUrl: string='';
  error: any;
  registerError: string='';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }  

  ngOnInit(): void {  

    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobnumber:['', [Validators.required]]    
    });

    this.authService.logout();
  }

  get first_name() { return this.registerForm.get('first_name'); }
  get last_name() { return this.registerForm.get('last_name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get mobnumber() { return this.registerForm.get('mobnumber'); }
 
  
  onSubmit() {

    const data = {
  "userId": 0,
  "firstName": this.first_name?.value,
  "middleName": "",
  "lastName": this.last_name?.value,
  "mobileNo": this.mobnumber?.value,
  "emailId": this.email?.value,
  "altMobileNo": "",
  "password": this.password?.value
};
    this.submitted = true;
    
    this.authService.register(data).subscribe({
        next: (res: any) => {
          console.log('Registration successful:', res);
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error('Registration failed:', err);
          alert('Registration failed. Please try again.');
        },
        complete: () => {
          console.log('Registration request completed.');
        }
      });
  }  
  onTry(){
   this.registerForm.reset();
   this.registerError='';
 }

  onCancel(){
    this.registerForm.reset();
  }

}
