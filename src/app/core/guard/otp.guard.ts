import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpGuard implements CanActivate {
  otp = JSON.parse(sessionStorage.getItem('otp'))
  constructor(private router: Router) {}
  canActivate(){
    console.log(this.otp);
    
    if (this.otp == true) {
      return true;
    } else {
      this.router.navigate(['/dashboard'])
      return false
    }
  }
  
}
