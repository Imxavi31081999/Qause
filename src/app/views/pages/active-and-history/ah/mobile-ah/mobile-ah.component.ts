import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ActiveAndHistoryService } from "src/app/core/services/active-and-history.service";

@Component({
  selector: "app-mobile-ah",
  templateUrl: "./mobile-ah.component.html",
  styleUrls: ["./mobile-ah.component.scss"],
})
export class MobileAhComponent implements OnInit {
  historyAwaitingGigPageNumber = 1;
  historyDonationGigPageNumber = 1;
  historyReviewGigPageNumber = 1;
  activeGigPageNumber = 1;

  activeGig = [];
  historyAwaitingGig = [];
  historyDonationGig = [];
  historyReviewGig = [];

  activeGigResponseLength: number = 0;
  historyAwaitingGigResponseLength: number = 0;
  historyDonationGigResponseLength: number = 0;
  historyReviewGigResponseLength: number = 0;

  activeGigScroll: boolean = true;
  historyAwaitingScroll: boolean = true;
  historyDonationScroll: boolean = true;
  historyReviewScroll: boolean = true;

  allActiveGig = [];
  allHistoryAwaitingGig = [];
  allHistoryDonationGig = [];
  allHistoryReviewGig = [];

  allActiveUniqueGig = [];
  allHistoryAwaitingUniqueGig = [];
  allHistoryDonationUniqueGig = [];
  allHistoryReviewUniqueGig = [];

  totalActiveItem: number;
  totalHistoryAwaitingItem: number;
  totalHistoryDonationItem: number;
  totalHistoryReviewItem: number;

  selectedIndexBindingHistory = 1;
  selectedIndexBindingActive = 1;

  totalDonation: Array<number> = [];

  constructor(
    private location: Location,
    private activeAndHistoryService: ActiveAndHistoryService,
    private spinner: NgxSpinnerService,
    private router:Router
  ) {}

  @ViewChild('tabGroupActive', {static: false}) tabActive: MatTabGroup;
  @ViewChild('tabGroupHistory', {static: false}) tabHistory: MatTabGroup;

  ngOnInit(): void {
    this.getActiveGigs(this.activeGigPageNumber);
    this.getHistoryAwaitingGigs(this.historyAwaitingGigPageNumber);
    this.getHistoryDonationGigs(this.historyDonationGigPageNumber);
    this.getHistoryReviewGigs(this.historyReviewGigPageNumber);
  }
  getActiveGigs(pageNumber) {
    this.activeAndHistoryService.getActiveGig(pageNumber).subscribe((res) => {
      console.log(res);
      if (res.data.length === 0) {
        this.spinner.hide();
      }
      Array.prototype.push.apply(this.allActiveGig, res.data);
      this.activeGigResponseLength = res.data.length;
      this.allActiveUniqueGig = this.getUniqueGigs(this.allActiveGig, "_id");
      this.activeGig = this.allActiveUniqueGig;
      console.log(this.activeGig);
      this.totalActiveItem = res.total;
    });
  }
  getHistoryAwaitingGigs(pageNumber) {
    
    this.activeAndHistoryService
      .getHistoryAwaitingGig(pageNumber)
      .subscribe((res) => {
        console.log(res);
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
        console.log(this.historyAwaitingGig);
        this.totalHistoryAwaitingItem = res.total;
      });
  }
  getHistoryDonationGigs(pageNumber) {
    this.activeAndHistoryService.getHistoryDonationGig(pageNumber).subscribe((res) => {
      console.log(res);
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
      console.log(this.historyDonationGig);
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
    });
  }
  getHistoryReviewGigs(pageNumber) {
    this.activeAndHistoryService
      .getHistoryReviewGig(pageNumber)
      .subscribe((res) => {
        console.log(res);
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
        console.log(this.historyReviewGig);
        this.totalHistoryReviewItem = res.total;
      });
  }
  getUniqueGigs(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  goBack() {
    this.location.back();
  }
  onScrollActive() {
    if (this.activeGigScroll == true) {
      this.spinner.show();
      this.loadNextActiveGig();
    }
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
  loadNextActiveGig() {
    let totalPage = Math.ceil(this.totalActiveItem % 10);
    if (
      this.activeGigResponseLength == 0 &&
      this.activeGigPageNumber >= totalPage
    ) {
      this.activeGigScroll = false;
      this.spinner.hide();
    } else {
      this.getActiveGigs(++this.activeGigPageNumber);
      this.activeGigScroll = true;
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
  awating(){
    this.selectedIndexBindingActive = 1;
    this.selectedIndexBindingHistory = 0;
  }
  donation(){
    this.selectedIndexBindingActive = 1;
    this.selectedIndexBindingHistory = 2;
  }
  review(){
    this.selectedIndexBindingActive = 1;
    this.selectedIndexBindingHistory = 1;
  }
  active(){
    this.selectedIndexBindingActive = 0;
    this.selectedIndexBindingHistory = 0;
  }
  routerToSingleVolunteeringGigDetails(gigId){
    this.router.navigateByUrl(`/gigDetails/singleVolunter?gigId=${gigId}&isApplied=${true}`);
   }
   routerToMultipleVolunteeringGigDetails(gigId){
    this.router.navigateByUrl(`/gigDetails/singleVolunter?gigId=${gigId}&isApplied=${true}`);
   }

   routerToActiveSingleVolunteeringGigDetails(gigId){
    this.router.navigateByUrl(`/active-gig-details/singleVolunter?gigId=${gigId}`);
   }
   routerToActiveMultipleVolunteeringGigDetails(gigId){
    this.router.navigateByUrl(`/active-gig-details/multipleVolunter?gigId=${gigId}`);
   }
}
