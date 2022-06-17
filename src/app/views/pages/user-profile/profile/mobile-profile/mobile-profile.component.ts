import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActiveAndHistoryService } from 'src/app/core/services/active-and-history.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-mobile-profile',
  templateUrl: './mobile-profile.component.html',
  styleUrls: ['./mobile-profile.component.scss']
})
export class MobileProfileComponent implements OnInit {
  active = 1;
  userDetails;
  birthDate;
  userPassion;
  userPortfolio;
  userLanguages: [];
  gigs:Array<any> = [];
  userName;

  constructor(
    private profileService: ProfileService,
    private location: Location,
    private activeAndHistoryService: ActiveAndHistoryService,
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.getActiveGigs(1)
  }
  getActiveGigs(pageNumber){
    this.activeAndHistoryService
      .getActiveGig(pageNumber)
      .subscribe((res) => {
        if (res.data.length > 3) {
          this.gigs[0] = res.data[0];
          this.gigs[1] = res.data[1];
          this.gigs[2] = res.data[2];
        } else {
          this.gigs = res.data;
        }
        console.log(res);
      
      });
  }
  getUserDetails() {
    this.profileService.getUserProfileDetails().subscribe(
      (res: any) => {
        console.log(res);
        this.userDetails = res.data;
        // localStorage.setItem("userId", JSON.stringify(this.userDetails._id));

        this.userPassion = this.userDetails.passions;
        if (this.userPassion == undefined) {
          this.userPassion = "Passions";
        }
        this.userLanguages = this.userDetails.languageKnown;
        // if (this.userLanguages == undefined) {
        //   this.userLanguages = "languageKnown not provided"
        // }
        this.userPortfolio = this.userDetails.portfolio;
       
        // this.formatDateOfBirth();
        this.userName = this.userDetails.name
        this.birthDate = this.userDetails.birth
      },
      (err) => {
        console.log(err);
      }
    );
  }
  formatDateOfBirth() {
    let dataDate = new Date(this.userDetails.birth);
    let data = dataDate.toString();
    let arr = data.split(" ");
    this.birthDate = arr;
    console.log(this.birthDate);

    // console.log(arr);

    //     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // const d = new Date();
    // let month = months[d.getMonth()];
  }
  goBack() {
    this.location.back();
  }
  acceptedOn(data: string) {
    let slicedData = data.slice(0, 10);

    return slicedData;
  }
}
