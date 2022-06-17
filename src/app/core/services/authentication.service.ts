import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private messageSourceLogin = new BehaviorSubject(true);
  currentMessageLogin = this.messageSourceLogin.asObservable();

  public changeMessageLogin(message: boolean) {
    this.messageSourceLogin.next(message)
  }

  public registerUser(data) {
    return this.http.post(
      `${environment.prodUrl}/auth/register`,
      data,
      this.getAccessHttpOptions()
    );
  }

  public verifyOtp(verifyEndPoint, data) {
    return this.http
      .post(
        `${environment.prodUrl}/auth/${verifyEndPoint}`,
        data,
        this.getAccessHttpOptions()
      )
      .pipe(
        map((res: any) => {
          localStorage.setItem("userToken", JSON.stringify(res));
          return res;
        })
      );
  }

  public googleAuthLogin(payload) {
    return this.http
      .post(`${environment.baseUrl}/oauth/login-verify`, payload)
      .pipe(
        map((res: any) => {
          localStorage.setItem("userToken", JSON.stringify(res));
          return res;
        })
      );
  }

  public isLoggedIn() {
    let token = localStorage.getItem("userToken");
    if (token == undefined || token == "" || token == null) {
      // console.log("false");

      return false;
    } else {
      // console.log("true");

      return true;
    }
  }

  public getToken() {
    let token: any = localStorage.getItem("userToken");
    return JSON.parse(token);
  }
  public getUser(){
    let userInfo:any = localStorage.getItem('genericUserData');
    return JSON.parse(userInfo);
  }

  public logout() {
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.setItem('inDashboard', JSON.stringify(true))
    sessionStorage.setItem('logged', JSON.stringify(false))
    return true;
  }

  getAccessHttpOptions(): object {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
  }
}
