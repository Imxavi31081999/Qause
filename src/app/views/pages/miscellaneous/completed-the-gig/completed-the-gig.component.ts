import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-the-gig',
  templateUrl: './completed-the-gig.component.html',
  styleUrls: ['./completed-the-gig.component.scss']
})
export class CompletedTheGigComponent implements OnInit {
  public innerWidth: any;
  isMobileShow = false;
  isDesktopShow = true;
  constructor(
    private location:Location
  ) { }

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
  goBack(){
    this.location.back()
  }
}