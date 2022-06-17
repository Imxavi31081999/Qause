import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoSetupDuringRegisterGuard implements CanActivate {
  info = JSON.parse(sessionStorage.getItem('settingInfo'))
  constructor(private router: Router) {}
  canActivate() {
    if (this.info == true) {
      return true;
    } else {
      this.router.navigate(['/dashboard'])
      return false;
    }
  }
  
}
