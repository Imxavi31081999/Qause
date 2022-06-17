import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  public getUserProfileDetails() {
    return this.http
      .get(`${environment.prodUrl}/profile`, this.getAccessHttpOptions())
      .pipe(
        map((res: any) => {
          localStorage.setItem("userId", JSON.stringify(res.data._id));
          return res;
        })
      );
  }

  public deleteProfilePic() {
    return this.http.delete(
      `${environment.prodUrl}/picture`,
      this.getAccessHttpOptions()
    );
  }

  public updatePersonalDetails(payload) {
    return this.http.put(
      `${environment.prodUrl}/personal`,
      payload,
      this.getAccessHttpOptions()
    );
  }

  public updateBio(payload) {
    return this.http.put(
      `${environment.prodUrl}/bio`,
      payload,
      this.getAccessHttpOptions()
    );
  }

  public updatePassions(payload) {
    return this.http.put(
      `${environment.prodUrl}/passions`,
      payload,
      this.getAccessHttpOptions()
    );
  }

  public updateAccountInfo(payload) {
    return this.http.put(
      `${environment.prodUrl}/account`,
      payload,
      this.getAccessHttpOptions()
    );
  }

  public updateLinks(payload) {
    return this.http.put(
      `${environment.prodUrl}/links`,
      payload,
      this.getAccessHttpOptions()
    );
  }

  public getUserId() {
    let userId: any = localStorage.getItem("userId");
    userId = JSON.parse(userId);
    if (userId) {
      return userId;
    }
    return false;
  }

  getCountryCodeList(): Observable<any> {
    return this.http.get("assets/data/countryCode.json");
  }

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
