import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { GigsService } from "src/app/core/services/gigs.service";
import { DonationComponent } from "src/app/core/shared/components/donation/donation.component";

@Component({
  selector: "app-desktop-gig-listing",
  templateUrl: "./desktop-gig-listing.component.html",
  styleUrls: ["./desktop-gig-listing.component.scss"],
})
export class DesktopGigListingComponent implements OnInit {
  @ViewChild(DonationComponent) donationComponent: DonationComponent;

  isFilters = false;
  totalItems: number;

  queryData = "";
  category = "";
  allCategories = [];
  arrOfCategory = [];

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    public gigsService: GigsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllTags();
  }

  OpenDonationModal(gigId, ngoId) {
    this.donationComponent.OpenDonationModal(gigId, ngoId);
  }

  getAllTags() {
    this.gigsService.getGigTags().subscribe(
      (res: any) => {
        this.allCategories = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fillterGigs() {
    // this.gigsService.getGigs(1, )
  }

  // function to toggle category form the array fo category
  toggleCategory(category) {
    if (!this.arrOfCategory.includes(category)) {
      this.arrOfCategory.push(category);
      this.category = this.arrOfCategory.toString();
    } else {
      const index = this.arrOfCategory.indexOf(category);
      if (index > -1) {
        this.arrOfCategory.splice(index, 1); // 2nd parameter means remove one item only
      }
      this.category = this.arrOfCategory.toString();
    }

    if (this.category.length > 0) {
      this.isFilters = true;
    }
  }

  doCategoryFilter() {
    console.log(this.category);
  }

  searchQuery(queryData) {
    console.log(queryData);
    this.queryData = queryData;
    if (this.queryData.length > 0) {
      this.isFilters = true;
    }
  }

  clearQueries() {
    this.queryData = "";
    this.category = "";
    this.arrOfCategory = [];
    this.isFilters = false;
  }
}
