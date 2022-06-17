import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard.component.html',
})
export class DashboardDetailsComponent implements OnInit {
    public innerWidth: any;
    isMobileShow = false;
    isDesktopShow = true;
  constructor() { }

  ngOnInit(): void {
    if (this.innerWidth < 992 || window.outerWidth < 992) {
      this.isMobileShow = true;
      this.isDesktopShow = false;
    } else {
      console.log("hi");

      this.isMobileShow = false;
      this.isDesktopShow = true;
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
    console.log(window.outerWidth);
    // console.log(this.innerWidth);
    if (this.innerWidth < 992 || window.outerWidth < 992) {
      this.isMobileShow = true;
      this.isDesktopShow = false;
    } else {
      console.log("hi");

      this.isMobileShow = false;
      this.isDesktopShow = true;
    }
  }
}
