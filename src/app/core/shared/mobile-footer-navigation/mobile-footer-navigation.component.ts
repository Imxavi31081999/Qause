import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-mobile-footer-navigation",
  templateUrl: "./mobile-footer-navigation.component.html",
  styleUrls: ["./mobile-footer-navigation.component.scss"],
})
export class MobileFooterNavigationComponent implements OnInit {
  constructor(private router: Router) {}
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
      this.isMobileShow = false;
      this.isDesktopShow = true;
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
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
  home() {
    this.router.navigate(["/"]);
  }
  myFeed() {}
  engagements() {}
  support() {}
  profile() {
    this.router.navigate(["/user-profile/profile"]);
  }
}
