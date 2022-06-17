import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GigsService } from "src/app/core/services/gigs.service";

@Component({
  selector: "app-gig",
  templateUrl: "./gig.component.html",
  styleUrls: ["./gig.component.scss"],
})
export class GigComponent implements OnInit {
  public innerWidth: any;
  isMobileShow = false;
  isDesktopShow = true;

  gigId;
  gigDetails;
  gigCreatedAt;

  dummyDesc =
    " consectetur adipisicing elit. Quo quos amet minima suscipit asdfaf";

  applicantExperience = 0;
  constructor(public router: Router) {}

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
