import { Component, HostListener, OnInit } from "@angular/core";

@Component({
  selector: "app-active-multiple",
  templateUrl: "./active-multiple.component.html",
  styleUrls: ["./active-multiple.component.scss"],
})
export class ActiveMultipleComponent implements OnInit {
  public innerWidth: any;
  isMobileShow = false;
  isDesktopShow = true;

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
