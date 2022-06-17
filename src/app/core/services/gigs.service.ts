import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GigsService {
  constructor(private http: HttpClient) {}

  public getGigs(pageNumber, category, queryData) {
    return this.http.get(
      `${environment.prodUrl}/gig?gigType=all&search=${queryData}&category=${category}`,
      this.getAccessHttpOptions()
    );
  }

  public mobileGetGigs(pageNumber, category, queryData) {
    return this.http.get(
      `${environment.prodUrl}/gig?page=${pageNumber}&category=${category}&search=${queryData}`,
      this.getAccessHttpOptions()
    );
  }

  public getFundraisingGigs(fundraisingPage, category, queryData) {
    return this.http.get(
      `${environment.prodUrl}/gig?gigType=fundraising&fundraisingPage=${fundraisingPage}&search=${queryData}&category=${category}`,
      this.getAccessHttpOptions()
    );
  }

  public getMultipleGigs(multiplePage, category, queryData) {
    return this.http.get(
      `${environment.prodUrl}/gig?gigType=multipleVolunteering&multiplePage=${multiplePage}&search=${queryData}&category=${category}`,
      this.getAccessHttpOptions()
    );
  }

  public getSingleGigs(singlePage, category, queryData) {
    return this.http.get(
      `${environment.prodUrl}/gig?gigType=singleVolunteering&singlePage=${singlePage}&search=${queryData}&category=${category}`,
      this.getAccessHttpOptions()
    );
  }

  public getGigById(gigId) {
    return this.http.get(
      `${environment.prodUrl}/gig/${gigId}`,
      this.getAccessHttpOptions()
    );
  }

  public getGigTags() {
    return this.http.get(
      `${environment.prodUrl}/category`
      // this.getAccessHttpOptions()
    );
  }

  getAccessHttpOptions(): object {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': '*',
        // Authorization: this.auth.currentUser ? "Bearer " + this.auth.currentUser.token : '',
      }),
    };
  }
}
