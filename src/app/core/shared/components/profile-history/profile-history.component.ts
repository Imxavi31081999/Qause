import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ActiveAndHistoryService } from "src/app/core/services/active-and-history.service";

@Component({
  selector: "app-profile-history",
  templateUrl: "./profile-history.component.html",
  styleUrls: ["./profile-history.component.scss"],
})
export class ProfileHistoryComponent implements OnInit {
  historyAwaitingGigPageNumber = 1;
  historyDonationGigPageNumber = 1;
  historyReviewGigPageNumber = 1;

  historyAwaitingGig = [];
  historyDonationGig = [];
  historyReviewGig = [];

  historyAwaitingGigResponseLength: number = 0;
  historyDonationGigResponseLength: number = 0;
  historyReviewGigResponseLength: number = 0;

  historyAwaitingScroll: boolean = true;
  historyDonationScroll: boolean = true;
  historyReviewScroll: boolean = true;

  allHistoryAwaitingGig = [];
  allHistoryDonationGig = [];
  allHistoryReviewGig = [];

  allHistoryAwaitingUniqueGig = [];
  allHistoryDonationUniqueGig = [];
  allHistoryReviewUniqueGig = [];

  totalHistoryAwaitingItem: number;
  totalHistoryDonationItem: number;
  totalHistoryReviewItem: number;

  totalDonation: Array<number> = [];

  constructor(
    private activeAndHistoryService: ActiveAndHistoryService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.totalDonation[0] = 0;
    this.getHistoryAwaitingGigs(this.historyAwaitingGigPageNumber);
    this.getHistoryDonationGigs(this.historyDonationGigPageNumber);
    this.getHistoryReviewGigs(this.historyReviewGigPageNumber);
  }
  getHistoryAwaitingGigs(pageNumber) {
    this.activeAndHistoryService
      .getHistoryAwaitingGig(pageNumber)
      .subscribe((res) => {
        // console.log(res);
        if (res.data.length === 0) {
          this.spinner.hide();
        }
        Array.prototype.push.apply(this.allHistoryAwaitingGig, res.data);
        this.historyAwaitingGigResponseLength = res.data.length;
        this.allHistoryAwaitingUniqueGig = this.getUniqueGigs(
          this.allHistoryAwaitingGig,
          "_id"
        );
        this.historyAwaitingGig = this.allHistoryAwaitingUniqueGig;
        // console.log(this.historyAwaitingGig);
        this.totalHistoryAwaitingItem = res.total;
      });
  }
  getHistoryDonationGigs(pageNumber) {
    this.activeAndHistoryService
      .getHistoryDonationGig(pageNumber)
      .subscribe((res) => {
        // console.log(res);
        if (res.data.length === 0) {
          this.spinner.hide();
        }
        Array.prototype.push.apply(this.allHistoryDonationGig, res.data);
        this.historyDonationGigResponseLength = res.data.length;
        this.allHistoryDonationUniqueGig = this.getUniqueGigs(
          this.allHistoryDonationGig,
          "_id"
        );
        this.historyDonationGig = this.allHistoryDonationUniqueGig;
        // console.log(this.historyDonationGig);
        this.totalHistoryDonationItem = res.total;
        if (
          this.totalHistoryDonationItem >= this.historyDonationGigPageNumber
        ) {
          for (
            let responseLength = 0;
            responseLength < this.historyDonationGig.length;
            responseLength++
          ) {
            let temp = 0;
            for (
              let totalDonation = 0;
              totalDonation <
              this.historyDonationGig[responseLength].donates.length;
              totalDonation++
            ) {
              temp =
                this.historyDonationGig[responseLength].donates[totalDonation]
                  .amount + temp;
              this.totalDonation[responseLength] = temp;
            }
          }
        }
        console.log(this.totalDonation);
      });
  }
  getHistoryReviewGigs(pageNumber) {
    this.activeAndHistoryService
      .getHistoryReviewGig(pageNumber)
      .subscribe((res) => {
        // console.log(res);
        if (res.data.length === 0) {
          this.spinner.hide();
        }
        Array.prototype.push.apply(this.allHistoryReviewGig, res.data);
        this.historyReviewGigResponseLength = res.data.length;
        this.allHistoryReviewUniqueGig = this.getUniqueGigs(
          this.allHistoryReviewGig,
          "_id"
        );
        this.historyReviewGig = this.allHistoryReviewUniqueGig;
        // console.log(this.historyReviewGig);
        this.totalHistoryReviewItem = res.total;
      });
  }
  getUniqueGigs(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  onScrollAwating() {
    if (this.historyAwaitingScroll == true) {
      this.spinner.show();
      this.loadNextHistoryAwaitingGig();
    }
  }
  onScrollReview() {
    if (this.historyReviewScroll == true) {
      this.spinner.show();
      this.loadNextHiestoryReviewGig();
    }
  }
  onScrollDonation() {
    if (this.historyDonationScroll == true) {
      this.spinner.show();
      this.loadNextHistoryDonationGig();
    }
  }

  loadNextHistoryAwaitingGig() {
    let totalPage = Math.ceil(this.totalHistoryAwaitingItem % 10);
    if (
      this.historyAwaitingGigResponseLength == 0 &&
      this.historyAwaitingGigPageNumber >= totalPage
    ) {
      this.historyAwaitingScroll = false;
      this.spinner.hide();
    } else {
      this.getHistoryAwaitingGigs(++this.historyAwaitingGigPageNumber);
      this.historyAwaitingScroll = true;
    }
  }
  loadNextHistoryDonationGig() {
    let totalPage = Math.ceil(this.totalHistoryDonationItem % 10);
    if (
      this.historyDonationGigResponseLength == 0 &&
      this.historyDonationGigPageNumber >= totalPage
    ) {
      this.historyDonationScroll = false;
      this.spinner.hide();
    } else {
      this.getHistoryDonationGigs(++this.historyDonationGigPageNumber);
      this.historyDonationScroll = true;
    }
  }
  loadNextHiestoryReviewGig() {
    let totalPage = Math.ceil(this.totalHistoryReviewItem % 10);
    if (
      this.historyReviewGigResponseLength == 0 &&
      this.historyReviewGigPageNumber >= totalPage
    ) {
      this.historyReviewScroll = false;
      this.spinner.hide();
    } else {
      this.getHistoryReviewGigs(++this.historyReviewGigPageNumber);
      this.historyReviewScroll = true;
    }
  }
  acceptedOn(data: string) {
    let slicedData = data.slice(0, 10);

    return slicedData;
  }
  getDate(date) {
    // return date.replaceAll('-', '/');
    let newFormat: any = new Date(date);
    let dd = newFormat.getDate();
    let mm = newFormat.getMonth() + 1;
    let yyyy = newFormat.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    newFormat = dd + "-" + mm + "-" + yyyy;
    return newFormat;
  }
  storeDataToSessionStorageDonation(gig: any) {
    sessionStorage.setItem("donationReviewDetails", JSON.stringify(gig));
  }
  storeDataToSessionStorageReview(gig: any) {
    sessionStorage.setItem("reviewDetails", JSON.stringify(gig));
  }
  routerToSingleVolunteeringGigDetails(gigId) {
    this.router.navigateByUrl(
      `/gigDetails/singleVolunter?gigId=${gigId}&isApplied=${true}`
    );
  }
  routerToMultipleVolunteeringGigDetails(gigId) {
    this.router.navigateByUrl(
      `/gigDetails/singleVolunter?gigId=${gigId}&isApplied=${true}`
    );
  }
}
