import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { GigDetailsService } from "src/app/core/services/gig-details.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ApplyForSingleGigService } from "src/app/core/services/apply-for-single-gig.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthenticationService } from "src/app/core/services/authentication.service";

@Component({
  selector: "app-mobile-multiple-gig-detail",
  templateUrl: "./mobile-multiple-gig-detail.component.html",
  styleUrls: ["./mobile-multiple-gig-detail.component.scss"],
})
export class MobileMultipleGigDetailComponent implements OnInit {
  gigId = "62395f02451892bc6319965d"; //this has to be dynamic
  multipleVolunteerData: any;

  constructor(
    private location: Location,
    public gigDetailsService: GigDetailsService,
    private activatedroute: ActivatedRoute,
    public applyForGigService: ApplyForSingleGigService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService:AuthenticationService
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
        this.router.navigateByUrl(`/pages/applied-for-gig?ngoName=${this.multipleVolunteerData.ngo.name}&userName=${this.authService.getUser().name}&isApplied=${isApplied}&title=${this.multipleVolunteerData.title}`);
      },
      (err) => {
        this.snackBar.open(err.error.error, "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });

        // alert();
        console.log(err);
      }
    );
  }
  getGigDetails() {
    this.gigDetailsService.getGigDetails(this.gigId).subscribe(
      (res: any) => {
        console.log(res);

        this.multipleVolunteerData = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
