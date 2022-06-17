import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop-donation-details',
  templateUrl: './desktop-donation-details.component.html',
  styleUrls: ['./desktop-donation-details.component.scss']
})
export class DesktopDonationDetailsComponent implements OnInit {

  gig;
  totalDonation = 0;
  lastDonated;
  constructor() { }

  ngOnInit(): void {
    if (sessionStorage.getItem('donationReviewDetails')) {
     this.gig = JSON.parse(sessionStorage.getItem('donationReviewDetails')) 
     this.gig.donates.forEach(element => {
       this.totalDonation = element.amount + this.totalDonation;
       this.lastDonated = this.getDate(element.donateAt)
     });
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

}
