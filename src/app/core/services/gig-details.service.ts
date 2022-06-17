import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GigDetailsService {
  constructor(private http: HttpClient) {}

  public getGigDetails(gigId) {
    return this.http.get(`${environment.gigDetailsURL}/need/card/${gigId}`);
  }

  public getTransactionDetails(gigId, page) {
    return this.http.get(
      `${environment.baseUrl}/gig/${gigId}/transition/all?page=${page}`
    );
  }
}
