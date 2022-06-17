import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GigsService } from "src/app/core/services/gigs.service";

@Component({
  selector: "app-desktop-gig",
  templateUrl: "./desktop-gig.component.html",
  styleUrls: ["./desktop-gig.component.scss"],
})
export class DesktopGigComponent implements OnInit {
  gigId;
  gigDetails;
  gigCreatedAt;

  dummyDesc =
    " consectetur adipisicing elit. Quo quos amet minima suscipit asdfaf";

  applicantExperience = 0;
  constructor(
    public router: Router,
    private activatedroute: ActivatedRoute,
    private gigsService: GigsService
  ) {}

  ngOnInit(): void {
    this.activatedroute.queryParamMap.subscribe((params) => {
      this.gigId = params.get("gigId");
      console.log(this.gigId);
      if (this.gigId) {
        this.getGigDetails();
      }
    });
  }

  updateApplicantExperience(action) {
    // console.log("hi");

    if (action == "increase") {
      this.applicantExperience = this.applicantExperience + 1;
    } else if (action == "decrease" && this.applicantExperience != 0) {
      this.applicantExperience = this.applicantExperience - 1;
    }
  }

  getGigDetails() {
    this.gigsService.getGigById(this.gigId).subscribe(
      (res: any) => {
        console.log(res);
        this.gigDetails = res.data;
        this.getCreatedDate();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goToChatting() {
    let ngoId = this.gigDetails.ngo._id;
    this.router.navigate(["/apps/chat"], {
      state: { ngoId: ngoId },
    });
  }

  getCreatedDate() {
    let dataDate = new Date("2021-06-07T12:38:52.824Z");
    let data = dataDate.toString();
    let arr = data.split(" ");
    this.gigCreatedAt = arr;
    // console.log(arr);

    //     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // const d = new Date();
    // let month = months[d.getMonth()];
  }
}
