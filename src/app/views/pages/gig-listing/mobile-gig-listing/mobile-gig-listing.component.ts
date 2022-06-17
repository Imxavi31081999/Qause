import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { GigsService } from "src/app/core/services/gigs.service";
import { DonationComponent } from "src/app/core/shared/components/donation/donation.component";

@Component({
  selector: "app-mobile-gig-listing",
  templateUrl: "./mobile-gig-listing.component.html",
  styleUrls: ["./mobile-gig-listing.component.scss"],
})
export class MobileGigListingComponent implements OnInit {
  @ViewChild(DonationComponent) donationComponent: DonationComponent;
  pageNumber: number = 1; // dont tamper this
  itemsPerPage = 10;
  totalItems: number;
  isLogin = JSON.parse(sessionStorage.getItem("isLogin"));
  isRegister = JSON.parse(sessionStorage.getItem("isRegister"));
  category = "";
  arrCategory = [];
  innerWidth: any;
  isMobileShow: boolean;
  isDesktopShow: boolean;
  notscrolly: boolean;
  tags = [];
  query = "";

  gigs: any;
  allGigData = [];
  allFilterGigs = [];
  gigFilterResponseLength: number = 0;
  gigSearchResponseLength: number = 0;
  gigResponseLength: number = 0;
  notEmptyPost = true;
  filter: boolean = false;
  totalPage: number;
  allUniqueFilterGigs = [];
  allUniqueGigs = [];
  allSearchGigs = [];
  allUniqueSearchFilterGigs = [];
  search: boolean = false;
  constructor(
    private router: Router,
    public authService: AuthenticationService,
    public gigsService: GigsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllGigs(this.pageNumber);
    this.getAllTags();
    this.notscrolly = true;
    sessionStorage.setItem("inDashboard", JSON.stringify(true));
  }
  getAllGigs(page: number) {
    this.gigsService.mobileGetGigs(page, this.category, this.query).subscribe(
      (res: any) => {
        console.log(res);
        if (res.data.length === 0) {
          this.spinner.hide();
        }
        Array.prototype.push.apply(this.allGigData, res.data);
        this.gigResponseLength = res.data.length;
        this.allUniqueGigs = this.getUniqueGigs(this.allGigData, "_id");
        this.gigs = this.allUniqueGigs;
        this.pageNumber = page;
        this.totalItems = res.total;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getFilterGigs(page: number) {
    this.gigsService.mobileGetGigs(page, this.category, this.query).subscribe(
      (res: any) => {
        Array.prototype.push.apply(this.allFilterGigs, res.data);
        this.allUniqueFilterGigs = this.getUniqueGigs(
          this.allFilterGigs,
          "_id"
        );
        this.gigs = this.allUniqueFilterGigs;
        this.gigFilterResponseLength = res.data.length;
        this.gigs;
        this.pageNumber = page;
        this.totalItems = res.total;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSearchGigs(page: number) {
    this.gigsService.mobileGetGigs(page, this.category, this.query).subscribe(
      (res: any) => {
        Array.prototype.push.apply(this.allSearchGigs, res.data);
        this.allUniqueSearchFilterGigs = this.getUniqueGigs(
          this.allSearchGigs,
          "_id"
        );
        this.gigs = this.allUniqueSearchFilterGigs;
        this.gigSearchResponseLength = res.data.length;
        this.pageNumber = page;
        this.totalItems = res.total;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUniqueGigs(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  getAllTags() {
    this.gigsService.getGigTags().subscribe(
      (res: any) => {
        this.tags = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  viewSingleGig(gig) {
    this.router.navigateByUrl(`/gigDetails/singleVolunter?gigId=${gig._id}`);
  }
  viewMultipleGig(gig) {
    this.router.navigateByUrl(`/gigDetails/multipleVolunter?gigId=${gig._id}`);
  }
  viewFoundraisingGig(gig) {
    this.router.navigateByUrl(`/gigDetails/fundraising?gigId=${gig._id}`);
  }

  filterGig(tag) {
    if (!this.arrCategory.includes(tag)) {
      this.arrCategory.push(tag);
      this.category = this.arrCategory.toString();
    } else {
      const index = this.arrCategory.indexOf(tag);
      if (index > -1) {
        this.arrCategory.splice(index, 1); // 2nd parameter means remove one item only
      }
      this.category = this.arrCategory.toString();
    }
  }

  doFilter() {
    this.filter = true;
    this.allFilterGigs = [];
    if (this.pageNumber > 1) {
      this.getFilterGigs(1);
    }
    if (this.pageNumber == 1) {
      this.getFilterGigs(this.pageNumber);
    }
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

  searchQuery(query) {
    console.log(query);
    this.search = true;
    this.query = query;
    this.allSearchGigs = [];
    this.pageNumber = 1;
    this.getSearchGigs(this.pageNumber);
  }
  //need to find the good position to stop the spinner insted of onscroll in both mobile and desktop
  onScroll() {
    if (this.notscrolly == true) {
      this.spinner.show();
      this.loadNextGig();
    }
    if (this.filter == true) {
      this.search = false;
      this.spinner.show();
      this.loadNextFilterGig();
    }
    if (this.search == true) {
      this.filter = false;
      this.spinner.show();
      this.loadNextSearchGig();
    }
    console.log("hide");
  }
  loadNextGig() {
    if (this.gigResponseLength == 0) {
      this.notscrolly = false;
      this.spinner.hide();
    } else if (this.filter == false) {
      let nextPage = this.pageNumber + 1;
      this.getAllGigs(nextPage);
      this.notscrolly = true;
    }
  }
  loadNextFilterGig() {
    let totalPage = Math.ceil(this.totalItems % 10);
    for (let i = 1; i <= totalPage; i++) {
      if (
        this.gigFilterResponseLength >= 0 &&
        totalPage <= i &&
        totalPage >= this.pageNumber
      ) {
        let nextPage = this.pageNumber + 1;
        this.getFilterGigs(nextPage);
      } else {
        this.spinner.hide();
      }
    }
  }
  loadNextSearchGig() {
    let totalPage = Math.ceil(this.totalItems % 10);
    for (let i = 1; i <= totalPage; i++) {
      if (
        this.gigSearchResponseLength >= 0 &&
        totalPage <= i &&
        totalPage >= this.pageNumber
      ) {
        let nextPage = this.pageNumber + 1;

        this.getSearchGigs(nextPage);
      } else {
        this.spinner.hide();
      }
    }
  }
  OpenDonationModal(gigId, ngoId) {
    this.donationComponent.OpenDonationModal(gigId, ngoId);
  }
}
