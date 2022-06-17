import { Component, OnInit} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActiveAndHistoryService } from 'src/app/core/services/active-and-history.service';

@Component({
  selector: 'app-profile-my-task',
  templateUrl: './profile-my-task.component.html',
  styleUrls: ['./profile-my-task.component.scss']
})
export class ProfileMyTaskComponent implements OnInit {
  activeGigPageNumber = 1;
  activeGig = [];
  activeGigResponseLength: number = 0;
  activeGigScroll: boolean = true;
  allActiveGig = [];
  allActiveUniqueGig = [];
  totalActiveItem: number;
  constructor(
    private activeAndHistoryService: ActiveAndHistoryService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getActiveGigs(this.activeGigPageNumber);
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
  getUniqueGigs(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  onScrollActive() {
    if (this.activeGigScroll == true) {
      this.spinner.show();
      this.loadNextActiveGig();
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

  routerToActiveSingleVolunteeringGigDetails(gigId){
    this.router.navigateByUrl(`/active-gig-details/singleVolunter?gigId=${gigId}`);
   }
   routerToActiveMultipleVolunteeringGigDetails(gigId){
    this.router.navigateByUrl(`/active-gig-details/multipleVolunter?gigId=${gigId}`);
   }
}
