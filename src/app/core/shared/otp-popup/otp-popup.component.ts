import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { environment } from "src/environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "@angular/common";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-otp-popup",
  templateUrl: "./otp-popup.component.html",
  styleUrls: ["./otp-popup.component.scss"],
})
export class OtpPopupComponent implements OnInit {
  otp: number;
  countryCode;
  showError: boolean = false;
  phone: string;
  invalid: boolean;
  email: string;
  initialDisabled: boolean = true;
  verifyEndPoint: string;
  isLoggin: boolean = false;
  userType: string = "volunteer";
  donationPopup: boolean = false;
  genericUserData = {
    _id: "",
    name: "",
    mobile: "",
    email: "",
    isPostSignupComplete: false,
    getNotification: false,
    languageKnown: [],
    passions: [],
    address: { country: "" },
    location: {},
  };

  constructor(
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    public router: Router,
    private location: Location,
    private dialog: MatDialogRef<OtpPopupComponent>
  ) {}

  ngOnInit(): void {
    this.isLoggin = JSON.parse(sessionStorage.getItem("isLogin"));
    this.phone = sessionStorage.getItem("phone");
    this.email = sessionStorage.getItem("email");
    this.countryCode = sessionStorage.getItem("countryCode");
  }

  isChecked(value: string) {
    console.log(value);
    this.userType = value;
  }

  checkForOTPValidation(data) {
    if (data.length < 6) {
      this.invalid = true;
    } else {
      this.invalid = false;
      this.initialDisabled = false;
    }
    if (isNaN(data) == true) {
      this.invalid = true;
    } else if (data.length == 6) {
      this.invalid = false;
    }
  }
  validateOtp() {
    console.log("FDSFDFD");

    if (this.otp) {
      this.showError = false;
    } else {
      this.showError = true;
      return;
    }
    if (this.isLoggin == true) {
      this.verifyEndPoint = "login-verify";
    } else {
      this.verifyEndPoint = "register-verify";
    }
    // console.log(this.email);
    // console.log(this.phone);

    if (
      this.email == "undefined" ||
      this.email == null ||
      this.email == undefined
    ) {
      let data = {
        mobile: `${this.countryCode + "-" + this.phone}`,
        otp: `${this.otp}`,
      };
      console.log(data);

      this.authenticationService.verifyOtp(this.verifyEndPoint, data).subscribe(
        (res) => {
          console.log(res);
          if (this.isLoggin == true) {
            sessionStorage.setItem("logged", JSON.stringify(true));
            sessionStorage.removeItem("otp");
            localStorage.setItem(
              "genericUserData",
              JSON.stringify(res.data.user)
            );
            this.dialog.close("LoggedIn");
            this.snackBar.open("Your are logged in", "cancel", {
              duration: 4000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
              panelClass: ["blue-snackbar"],
            });
          } else {
            let phone = JSON.parse(sessionStorage.getItem("phone"));
            this.genericUserData.mobile = phone
            localStorage.setItem("genericUserData", JSON.stringify(this.genericUserData));
            this.dialog.close("LoggedIn");
          }
        },
        (err) => {
          this.snackBar.open("Somethig went wrong! Try Again", "cancel", {
            duration: 4000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
            panelClass: ["blue-snackbar"],
          });
          console.log(err);
        }
      );
    }
    if (
      this.phone == "undefined" ||
      this.phone == null ||
      this.phone == undefined
    ) {
      let data = {
        email: `${sessionStorage.getItem("email")}`,
        otp: `${this.otp}`,
      };

      this.authenticationService.verifyOtp(this.verifyEndPoint, data).subscribe(
        (res) => {
          console.log(res);
          if (this.userType == "ngo") {
            window.location.href = "https://qause.tech/";
            return;
          }
          if (this.isLoggin == true) {
            sessionStorage.setItem("logged", JSON.stringify(true));
            sessionStorage.removeItem("otp");
            localStorage.setItem(
              "genericUserData",
              JSON.stringify(res.data.user)
            );
            this.dialog.close("LoggedIn");
            this.snackBar.open("Your are logged in", "cancel", {
              duration: 4000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
              panelClass: ["blue-snackbar"],
            });
          } else {
            let email = (sessionStorage.getItem("email"));
            this.genericUserData.email = email;
            localStorage.setItem("genericUserData", JSON.stringify(this.genericUserData));
            this.dialog.close("LoggedIn");
          }
        },
        (err) => {
          this.snackBar.open("Somethig went wrong! Try Again", "cancel", {
            duration: 4000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
            panelClass: ["blue-snackbar"],
          });
          console.log(err);
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }
  closeOtpPopup() {
    this.dialog.close("CloseAll");
  }
}
