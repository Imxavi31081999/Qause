import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  errorMessage: any;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  public updateGetNotification(payload) {
    return this.http.post(
      `${environment.prodUrl}/notification`,
      payload,
      this.getAccessHttpOptions()
    );




  }

  signUp(postdetails: any){
   return  this.http.post<any>('https://qause.tech/api/v2/volunteer/post-signup', postdetails, this.getAccessHttpOptions())}; 

  getAccessHttpOptions(): object {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",

        // 'Access-Control-Allow-Origin': '*',
        Authorization: this.authenticationService.isLoggedIn()
          ? this.authenticationService.getToken().data.token
          : "",
      }),
    };
  }
}
