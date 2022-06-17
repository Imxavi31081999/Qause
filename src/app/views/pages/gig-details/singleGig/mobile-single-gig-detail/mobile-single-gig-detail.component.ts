import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { GigDetailsService } from "src/app/core/services/gig-details.service";
import { ApplyForSingleGigService } from "src/app/core/services/apply-for-single-gig.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GigsService } from "src/app/core/services/gigs.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthenticationService } from "src/app/core/services/authentication.service";

@Component({
  selector: "app-mobile-single-gig-detail",
  templateUrl: "./mobile-single-gig-detail.component.html",
  styleUrls: ["./mobile-single-gig-detail.component.scss"],
})
export class MobileSingleGigDetailComponent implements OnInit {
  gigId = "6238acb726f691ac36df3b74";
  singleVolunteerData: any;
  constructor(
    private location: Location,
    public gigDetailsService: GigDetailsService,
    private activatedroute: ActivatedRoute,
    public applyForGigService: ApplyForSingleGigService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService:AuthenticationService,
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
  applyForGig() {
    let payload = {
      gigId: this.gigId,
    };

    this.applyForGigService.applyingForSingleGig(payload).subscribe(
      (data) => {
        console.log(data);
        let isApplied = true;
        // this.router.navigate(["/pages/applied-for-gig"]);
        this.router.navigateByUrl(`/pages/applied-for-gig?ngoName=${this.singleVolunteerData.ngo.name}&userName=${this.authService.getUser().name}&isApplied=${isApplied}&title=${this.singleVolunteerData.title}`);
      },
      (err) => {
        this.snackBar.open(err.error.error, "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });
        console.log(err);
      }
    );
  }
  getGigDetails() {
    this.gigDetailsService.getGigDetails(this.gigId).subscribe(
      (res: any) => {
        console.log(res);
        this.singleVolunteerData = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
