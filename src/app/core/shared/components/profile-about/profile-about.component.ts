import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ProfileService } from "src/app/core/services/profile.service";
@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent implements OnInit {
  active = 1;
  userDetails;
  birthDate;
  userPassion;
  userPortfolio;
  userLanguages: [];

  constructor(
    private profileService: ProfileService,
    private location: Location
  ) {}

  ngOnInit(): void {
   
  }
}
