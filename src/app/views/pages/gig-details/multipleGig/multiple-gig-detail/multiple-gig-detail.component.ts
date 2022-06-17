
import { Component, HostListener, OnInit } from "@angular/core";


@Component({
  selector: "app-multiple-gig-detail",
  templateUrl: "./multiple-gig-detail.component.html",
  styleUrls: ["./multiple-gig-detail.component.scss"],
})
export class MultipleGigDetailComponent implements OnInit {
  public innerWidth: any;
  isMobileShow = false;
  isDesktopShow = true;
  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
    console.log(window.outerWidth);

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
