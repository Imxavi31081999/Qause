import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class DonationService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  createDonationOrder(payload) {
    return this.http.post(
      `${environment.baseUrl}/gig/fundraising/order`,
      payload,
      this.getAccessHttpOptions()
    );
  }

  verifyDonationOrder(payload) {
    return this.http.put(
      `${environment.baseUrl}/gig`,
      payload,
      this.getAccessHttpOptions()
    );
  }

  verifyGuestDontaionOrder(payload, gigId) {
    return this.http.put(
      `${environment.baseUrl}/gig/${gigId}/order/verify`,
      payload
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
