import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop-review-details',
  templateUrl: './desktop-review-details.component.html',
  styleUrls: ['./desktop-review-details.component.scss']
})
export class DesktopReviewDetailsComponent implements OnInit {
gig;
  constructor() { }

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

}
