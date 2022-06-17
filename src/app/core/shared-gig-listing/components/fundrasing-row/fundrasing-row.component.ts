import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { GigsService } from "src/app/core/services/gigs.service";
import { DonationComponent } from "src/app/core/shared/components/donation/donation.component";

@Component({
  selector: "app-fundrasing-row",
  templateUrl: "./fundrasing-row.component.html",
  styleUrls: ["./fundrasing-row.component.scss"],
})
export class FundrasingRowComponent implements OnInit, OnChanges {
  @ViewChild(DonationComponent) donationComponent: DonationComponent;

  @Input() category = "";
  @Input() queryData = "";

  fundraisingGigs = [];
  fundraisingGigsNextPagination = null;

  defaultCardsDisplayed = 3;
  cardsDisplayed = this.defaultCardsDisplayed;
  highestCardDispayed: number = 0;

  responsiveOptions = [
    {
      breakpoint: "4000px",
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: "1920px",
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: "1600px",
      numVisible: 3,
      numScroll: 2,
    },

    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  // fulfilledCards = [];

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    public gigsService: GigsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.category);
    console.log(this.queryData);

    this.fundraisingGigs = [];
    this.fundraisingGigsNextPagination = null;

    this.defaultCardsDisplayed = 3;
    this.cardsDisplayed = this.defaultCardsDisplayed;
    this.highestCardDispayed = 0;

    this.getFundraisingGigs();
  }

  ngOnInit(): void {
    this.getFundraisingGigs();
  }

  getPercentageOfDonation(gig) {
    let amt = gig.questionValues.amount;

    let don = gig.donates;

    let strDon = this.removeLastTwoDigits(don);

    don = parseInt(strDon);

    let n = (don / amt) * 100;
    if (n > 100) {
      n = 100;
    }
    let percent = n.toFixed(1) + "%";
    return percent;
  }

  getDays(data) {
    let dateCreated: any = new Date(data);
    let today: any = new Date();

    const diffTime = Math.abs(today - dateCreated);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return 30 - diffDays;
  }

  removeLastTwoDigits(data: Number) {
    let strData = data.toString();
    let str = strData.slice(0, strData.length - 2);

    if (str.length > 0) {
      return str;
    } else {
      return "0";
    }
  }

  getFundraisingGigs(page = 0, initialLoading = "Yes") {
    this.gigsService
      .getFundraisingGigs(page, this.category, this.queryData)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (initialLoading == "No") {
            res.data.forEach((item) => {
              this.fundraisingGigs.push(item);
            });
            if (res.fundraisingPagination.next) {
              this.fundraisingGigsNextPagination =
                res.fundraisingPagination.next.fundraisingPage;
            } else {
              this.fundraisingGigsNextPagination = null;
            }
          } else if (this.fundraisingGigs.length == 0) {
            this.fundraisingGigs = res.data;

            if (res.fundraisingPagination.next) {
              this.fundraisingGigsNextPagination =
                res.fundraisingPagination.next.fundraisingPage;
            } else {
              this.fundraisingGigsNextPagination = null;
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  route() {
    this.router.navigate(["/gigDetails/fundraising"]);
  }
  OpenDonationModal(gigId, ngoId) {
    this.donationComponent.OpenDonationModal(gigId, ngoId);
  }

  activeNeedPage(e, initialLoading) {
    // console.log(e);

    this.cardsDisplayed = this.defaultCardsDisplayed + e.page;
    console.log(this.cardsDisplayed);

    if (this.highestCardDispayed < this.cardsDisplayed) {
      let remainder = (this.cardsDisplayed - 1) % 3;

      if (remainder == 0) {
        console.log("hi");

        if (initialLoading == "No" && this.fundraisingGigsNextPagination) {
          console.log("by");

          this.getFundraisingGigs(
            this.fundraisingGigsNextPagination,
            initialLoading
          );
        }
      }

      this.highestCardDispayed = this.cardsDisplayed;
    }
  }

  viewFoundraisingGig(gig) {
    this.router.navigateByUrl(`/gigDetails/fundraising?gigId=${gig._id}`);
  }
}
