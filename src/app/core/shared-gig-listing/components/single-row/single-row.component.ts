import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { GigsService } from "src/app/core/services/gigs.service";

@Component({
  selector: "app-single-row",
  templateUrl: "./single-row.component.html",
  styleUrls: ["./single-row.component.scss"],
})
export class SingleRowComponent implements OnInit, OnChanges {
  singleGigs = [];
  singleGigsNextPagination = null;

  @Input() category = "";
  @Input() queryData = "";

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
    this.singleGigs = [];
    this.singleGigsNextPagination = null;

    this.defaultCardsDisplayed = 3;
    this.cardsDisplayed = this.defaultCardsDisplayed;
    this.highestCardDispayed = 0;

    this.getSingleGigs();
  }

  ngOnInit(): void {
    this.getSingleGigs();
  }

  getSingleGigs(page = 0, initialLoading = "Yes") {
    this.gigsService
      .getSingleGigs(page, this.category, this.queryData)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (initialLoading == "No") {
            res.data.forEach((item) => {
              this.singleGigs.push(item);
            });
            if (res.singlePagination.next) {
              this.singleGigsNextPagination =
                res.singlePagination.next.singlePage;
            } else {
              this.singleGigsNextPagination = null;
            }
          } else if (this.singleGigs.length == 0) {
            this.singleGigs = res.data;

            if (res.singlePagination.next) {
              this.singleGigsNextPagination =
                res.singlePagination.next.singlePage;
            } else {
              this.singleGigsNextPagination = null;
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
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

  activeNeedPage(e, initialLoading) {
    // console.log(e);

    this.cardsDisplayed = this.defaultCardsDisplayed + e.page;
    console.log(this.cardsDisplayed);

    if (this.highestCardDispayed < this.cardsDisplayed) {
      let remainder = (this.cardsDisplayed - 1) % 3;

      if (remainder == 0) {
        console.log("hi");

        if (initialLoading == "No" && this.singleGigsNextPagination) {
          console.log("by");

          this.getSingleGigs(this.singleGigsNextPagination, initialLoading);
        }
      }

      this.highestCardDispayed = this.cardsDisplayed;
    }
  }
  viewSingleGig(gig) {
    this.router.navigateByUrl(`/gigDetails/singleVolunter?gigId=${gig._id}`);
  }
}
