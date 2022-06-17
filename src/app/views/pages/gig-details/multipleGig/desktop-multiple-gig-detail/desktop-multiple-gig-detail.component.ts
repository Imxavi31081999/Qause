import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { ApplyForSingleGigService } from "src/app/core/services/apply-for-single-gig.service";
import { GigDetailsService } from "src/app/core/services/gig-details.service";
import { DesktopAppliedForGigComponent } from "../../../miscellaneous/appliedForGig/desktop-applied-for-gig/desktop-applied-for-gig.component";

@Component({
  selector: "app-desktop-multiple-gig-detail",
  templateUrl: "./desktop-multiple-gig-detail.component.html",
  styleUrls: ["./desktop-multiple-gig-detail.component.scss"],
})
export class DesktopMultipleGigDetailComponent implements OnInit {
  gigId = "62395f02451892bc6319965d"; //this has to be dynamic
  multipleVolunteerData: any;

  ngo;
  questionsFormat;
  questionsValues;
  requests;

  needQuestions;

  questionKeys = [];
  questionAns = [];

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
              ngoName: this.multipleVolunteerData.ngo.name,
              title: this.multipleVolunteerData.title,
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

  // openApplyModal() {
  //   let dialogRef
  //   if (this.dialog.openDialogs.length == 0) {
  //      dialogRef = this.dialog.open(DesktopAppliedForGigComponent);
  // }
  // dialogRef.afterClosed().subscribe((result) => {
  //   console.log(result);
  // });
  // }

  getGigDetails() {
    this.gigDetailsService.getGigDetails(this.gigId).subscribe(
      (res: any) => {
        // console.log(res);

        this.multipleVolunteerData = res.data;
        this.ngo = this.multipleVolunteerData.ngo;
        this.questionsFormat = this.multipleVolunteerData.questionsFormat;
        this.questionsValues = this.multipleVolunteerData.questionsValues;
        this.needQuestions = this.questionsFormat.questions;

        console.log(this.questionsValues);

        console.log(this.needQuestions);

        this.filterQuestionValues();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filterQuestionValues() {
    this.questionKeys = Object.keys(this.questionsValues);

    this.questionAns = Object.values(this.questionsValues);

    console.log(this.questionKeys);
    console.log(this.questionAns);
  }

  checkForQuestionAns(question) {
    if (this.questionKeys.includes(question.key)) {
      return true;
    }

    return false;
  }
}
