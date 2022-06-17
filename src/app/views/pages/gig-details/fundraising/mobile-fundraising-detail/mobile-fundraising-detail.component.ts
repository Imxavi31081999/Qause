import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { GigDetailsService } from "src/app/core/services/gig-details.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-mobile-fundraising-detail",
  templateUrl: "./mobile-fundraising-detail.component.html",
  styleUrls: ["./mobile-fundraising-detail.component.scss"],
})
export class MobileFundraisingDetailComponent implements OnInit {
  gigId = "6238ac7a26f691ac36df3b01";
  fundraisingData: any;

  imgSrc = [
    {
      src: "/assets/images/cool-background.svg",
    },
    {
      src: "/assets/images/cool-background.svg",
    },
    {
      src: "/assets/images/cool-background.svg",
    },
  ];

  responsiveOptions = [
    {
      breakpoint: "4000px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1920px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1600px",
      numVisible: 1,
      numScroll: 1,
    },

    {
      breakpoint: "1024px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "768px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private gigDetailsService: GigDetailsService,
    private activatedroute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedroute.queryParamMap.subscribe((params) => {
      if (params.get("gigId")) {
        this.gigId = params.get("gigId");
      }
      console.log(this.gigId);
      if (this.gigId) {
        this.getGigDetails();
      }
    });
  }
  goBack() {
    this.location.back();
  }
  getGigDetails() {
    this.gigDetailsService.getGigDetails(this.gigId).subscribe(
      (res: any) => {
        console.log(res);
        this.fundraisingData = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
