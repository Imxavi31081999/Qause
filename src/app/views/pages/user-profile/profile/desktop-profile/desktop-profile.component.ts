import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActiveAndHistoryService } from 'src/app/core/services/active-and-history.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-desktop-profile',
  templateUrl: './desktop-profile.component.html',
  styleUrls: ['./desktop-profile.component.scss']
})
export class DesktopProfileComponent implements OnInit {
  active = 1;
  userDetails;
  birthDate;
  userPassion;
  userPortfolio;
  userLanguages: [];
  userName;

  constructor(
    private profileService: ProfileService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
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
        if (this.userPortfolio == undefined) {
          this.userPortfolio = "Portfolio";
        }
      this.birthDate = this.userDetails.birth 
        // this.formatDateOfBirth();
      },
      (err) => {
        console.log(err);
      }
    );
    this.userName = JSON.parse(localStorage.getItem('genericUserData')).name;
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
}
