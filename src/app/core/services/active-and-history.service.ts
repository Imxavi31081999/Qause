import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class ActiveAndHistoryService {
  constructor(private http: HttpClient, private authenticationService:AuthenticationService) {}

 public getActiveGig(pageNumber) {
    return this.http.get<any>(
      `${environment.baseUrl}/gig/my?type=active&page=${pageNumber}`,
      this.getAccessHttpOptions()
    );
  }

  public getHistoryAwaitingGig(pageNumber){
    return this.http.get<any>(
      `${environment.baseUrl}/gig/my?type=history&subType=awaiting&page=${pageNumber}`,
      this.getAccessHttpOptions()
    );
  }

  public getHistoryDonationGig(pageNumber){
    return this.http.get<any>(
      `${environment.baseUrl}/gig/my?type=history&subType=donate&page=${pageNumber}`,
      this.getAccessHttpOptions()
    );
  }

  public getHistoryReviewGig(pageNumber){
    return this.http.get<any>(
      `${environment.baseUrl}/gig/my?type=history&subType=review&page=${pageNumber}`,
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

