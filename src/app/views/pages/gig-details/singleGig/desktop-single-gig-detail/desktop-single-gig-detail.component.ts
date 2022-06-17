import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { ApplyForSingleGigService } from "src/app/core/services/apply-for-single-gig.service";
import { GigDetailsService } from "src/app/core/services/gig-details.service";
import { DesktopAppliedForGigComponent } from "../../../miscellaneous/appliedForGig/desktop-applied-for-gig/desktop-applied-for-gig.component";

@Component({
  selector: "app-desktop-single-gig-detail",
  templateUrl: "./desktop-single-gig-detail.component.html",
  styleUrls: ["./desktop-single-gig-detail.component.scss"],
})
export class DesktopSingleGigDetailComponent implements OnInit {
  gigId = "6238acb726f691ac36df3b74";
  singleVolunteerData: any;

  constructor(
    public dialog: MatDialog,
    public gigDetailsService: GigDetailsService,
    private activatedroute: ActivatedRoute,
    public applyForGigService: ApplyForSingleGigService,
    public snackBar: MatSnackBar
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

  openApplyModal() {
    let payload = {
      gigId: this.gigId,
    };

    this.applyForGigService.applyingForSingleGig(payload).subscribe(
      (data) => {
        console.log(data);
        if (this.dialog.openDialogs.length == 0) {
          this.dialog.open(DesktopAppliedForGigComponent, {
            data: {
              ngoName: this.singleVolunteerData.ngo.name,
              title: this.singleVolunteerData.title,
            },
          });
        }
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
        // this.dialog.open(DesktopAppliedForGigComponent); //remove it
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
