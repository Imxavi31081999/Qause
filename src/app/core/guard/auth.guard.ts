import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  logged = JSON.parse(sessionStorage.getItem('logged'))
  constructor(private router: Router) {}
  canActivate() {
    if (this.logged == true) {
      this.router.navigate(['/dashboard'])
      return false;
    } else {
      return true;
    }
  }
}
