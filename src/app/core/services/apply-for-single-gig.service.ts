import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class ApplyForSingleGigService {
  apply = environment.baseUrl + "/gig";
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  public applyingForSingleGig(payload) {
    return this.http.put(
      `${environment.baseUrl}/gig`,
      payload,
      this.getAccessHttpOptions()
    );
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
