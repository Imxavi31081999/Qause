import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { ProfileService } from "src/app/core/services/profile.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "@angular/common";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-register-popup',
  templateUrl: './register-popup.component.html',
  styleUrls: ['./register-popup.component.scss']
})
export class RegisterPopupComponent implements OnInit {
  items: any;
  selectedCode: number = 91;
  checkedItem: string = "";
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private http: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: SocialAuthService,
    private location: Location,
    private dialog: MatDialog,
    private dialogRef:MatDialogRef<RegisterPopupComponent>
  ) 
  {}
  navigate() {
    this.router.navigate(["/auth/login"]);
  }
  showEmail = false;

  phoneSignUp: any;
  emailSignUp: any;
  // phone: number;
  // email: string;
  // showError: boolean = false;
  // errorText: string = "Please enter valid phone number";
  userType: string = "volunteer";
  // showErrorEmail: boolean = false;
  donationPopup: boolean = false;

  ngOnInit(): void {
    this.authService.authState.subscribe(
      (user) => {
        this.snackBar.open("Your are logged in", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });

        this.user = user;
        this.loggedIn = user != null;

        let payload = {
          token: user.idToken,
        };
        this.authenticationService.googleAuthLogin(payload).subscribe(
          (res: any) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );

        console.log("user", this.user);
        console.log("loggedIn", this.loggedIn);
        if (this.loggedIn) {
          this.router.navigateByUrl("/");
        }
      },
      (err) => {
        console.log(err);
        this.snackBar.open("Somethig went wrong! Try Again", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });
      }
    );

    this.selectedCode = 91;
    this.profileService.getCountryCodeList().subscribe((list) => {
      this.items = [];
      for (let i = 0; i < list.length; i++) {
        this.items.push({
          label: list[i].country_code,
          value: list[i].phone_code,
        });
      }
    });

    this.phoneSignUp = this.fb.group({
      phone: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
    });
    this.emailSignUp = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z]{1}[a-zA-Z0-9.-_]*@[a-zA-Z]{1}[a-zA-Z.-]*[a-zA-Z]{1}[.][a-zA-Z]{2,}$"
          ),
        ],
      ],
    });
    if (this.dialog.openDialogs.length !== 0) {
      this.donationPopup = true;
    }
  }

  gOauth() {}

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  isChecked(value: string) {
    console.log(value);
    this.userType = value;
  }

  signUpWithPhone() {
    if (this.userType == "ngo") {
      window.location.href = "https://qause.tech/";
      return;
    }
    let data = {
      mobile: `${this.selectedCode}-${this.phoneSignUp.value.phone}`,
    };
    this.authenticationService.registerUser(data).subscribe(
      (res) => {
        console.log(res);
        this.dialog.closeAll();
        sessionStorage.setItem("phone", this.phoneSignUp.value.phone);
        sessionStorage.setItem(
          "countryCode",
          JSON.stringify(this.selectedCode)
        );
        sessionStorage.setItem("isLogin", JSON.stringify(false));
        sessionStorage.setItem("otp", "true");
        sessionStorage.setItem("isRegister", JSON.stringify(true));
        if (
          sessionStorage.getItem("otp") &&
          this.dialog.openDialogs.length == 0
        ) {
          this.router.navigate(["/auth/otp"]);
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
  signUpWithEmail() {
    if (this.userType == "ngo") {
      window.location.href = "https://qause.tech/";
      return;
    }
    let data = {
      email: `${this.emailSignUp.value.email}`,
    };
    this.authenticationService.registerUser(data).subscribe(
      (res) => {
        console.log(res);
        this.dialog.closeAll();
        sessionStorage.setItem("email", this.emailSignUp.value.email);
        sessionStorage.setItem("isLogin", JSON.stringify(false));
        sessionStorage.setItem("otp", "true");
        sessionStorage.setItem("isRegister", JSON.stringify(true));
        if (
          sessionStorage.getItem("otp") &&
          this.dialog.openDialogs.length == 0
        ) {
          this.router.navigate(["/auth/otp"]);
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

  get phone() {
    return this.phoneSignUp.get("phone");
  }
  get email() {
    return this.emailSignUp.get("email");
  }

  onRegister(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedin", "true");
    if (localStorage.getItem("isLoggedin")) {
      this.router.navigate(["/"]);
    }
  }

  goBack() {
    this.location.back();
  }
  closeRegisterPopup() {
    this.dialogRef.close('CloseAll')
  }
}
