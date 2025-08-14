
// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  [x: string]: any;

constructor(private http: HttpClient, private route: Router)  {}
//  apiUrl='https://freeapi.miniprojectideas.com'; // set in proxy.conf.json ; no need to attach

  adminId:string='';
  redirectUrl: string='';
  isauthenticate:boolean=false;
  
  
  private roleSubject = new BehaviorSubject<string>(localStorage.getItem('role') || 'User');
  role$ = this.roleSubject.asObservable();

  setRole(role: string) {
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  getRole(): string {
    return this.roleSubject.value;
  }

  login(obj:any) {

    //hardcoded admin role
    this.adminId=obj.EmailId;// get emailid from login form

    return this.http.post<any>('/api/User/Login', obj);    
  }

  isLoggedIn() {
    const currentToken = localStorage.getItem('token');

    if(currentToken){   

        if(this.adminId==='seema.ideore@gmail.com') {
              this.isauthenticate=true;
              localStorage.setItem('role','Admin');        
    }
    if(this.adminId!='seema.ideore@gmail.com') {
        this.isauthenticate=true;
        localStorage.setItem('role','Customer');    
        }

        console.log(this.adminId);
        console.log(this.isauthenticate);
        console.log(localStorage.getItem('role'));
        console.log(this.roleSubject.value)
    return true;
    }
    else{      
      this.isauthenticate=false;  
      return false;
    }    
  }  

  isAdmin(): boolean {
    return this.roleSubject.value === 'Admin';
  }

  isCustomer(): boolean {
    return this.roleSubject.value === 'Customer';
  }

  register(obj:any){
  return this.http.post<any>('/api/User/CreateNewUser',obj)
}
  logout() {
    localStorage.clear();
    this.roleSubject.next('User');
    
    localStorage.setItem('role','User');
    this.route.navigate(['']);
  }

}





// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private role: string = '';

//   setRole(role: string) {
//     this.role = role;
//   }

//   getRole(): string {
//     return this.role;
//   }

//   isAdmin(): boolean {
//     return this.role === 'admin';
//   }

//   isCustomer(): boolean {
//     return this.role === 'customer';
//   }

  
// }
