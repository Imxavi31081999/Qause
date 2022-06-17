import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-review-details',
  templateUrl: './mobile-review-details.component.html',
  styleUrls: ['./mobile-review-details.component.scss']
})
export class MobileReviewDetailsComponent implements OnInit {
gig;
  constructor(private location:Location) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('reviewDetails')) {
      this.gig = JSON.parse (sessionStorage.getItem('reviewDetails'))
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
goBack(){
  this.location.back()
}
}
