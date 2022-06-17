import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { SocialAuthService, SocialUser } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from "angularx-social-login";

import { MatSnackBar } from "@angular/material/snack-bar";

import { FormBuilder, Validators } from "@angular/forms";
import { ProfileService } from "src/app/core/services/profile.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {
  returnUrl: any;

  user: SocialUser;
  loggedIn: boolean;

  showEmail = false;
  userType: string = "volunteer";
  phoneLogin: any;
  emailLogin: any;

  items: any;
  selectedCode: number = 91;
  donationPopup: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private profileService: ProfileService,
    private authService: SocialAuthService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private dialogRef:MatDialogRef<LoginPopupComponent>
  ) 
  {}

  navigate() {
    this.router.navigate(["/auth/register"]);
  }

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
    if (this.dialog.openDialogs.length !== 0) {
      this.donationPopup = true;
    }
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

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    this.phoneLogin = this.fb.group({
      phone: [
        "",
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      ],
    });
    this.emailLogin = this.fb.group({
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

  postWithPhone(phoneData, code): Observable<any> {
    const body = `{\n    \"mobile\":\"${code}-${phoneData}\"\n}`;
    const headers = { "content-type": "application/json" };
    // console.log("DDDDDDDDDDDDDDSSS");
    return this.http.post(`${environment.prodUrl}/auth/login`, body, {
      headers: headers,
    });
  }
  postWithEmail(emailData): Observable<any> {
    const body = `{\n    \"email\":\"${emailData}\"\n}`;
    const headers = { "content-type": "application/json" };
    // console.log("DDDDDDDDDDDDDDSSS");
    return this.http.post(`${environment.prodUrl}/auth/login`, body, {
      headers: headers,
    });
  }

  loginWithPhone() {
    sessionStorage.setItem("otp", "true");
    console.log(sessionStorage.setItem("otp", "true"));
    if (this.userType == "ngo") {
      window.location.href = "https://qause.tech/";
      return;
    }
    this.postWithPhone(
      this.phoneLogin.value.phone,
      this.selectedCode
    ).subscribe(
      (res) => {
        this.dialog.closeAll();
        console.log(res);
        sessionStorage.setItem("phone", this.phoneLogin.value.phone);
        sessionStorage.setItem(
          "countryCode",
          JSON.stringify(this.selectedCode)
        );
        sessionStorage.setItem("isLogin", JSON.stringify(true));
        sessionStorage.setItem("isRegister", JSON.stringify(false));
        sessionStorage.setItem("userType", this.userType);
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
  loginWithEmail() {
    sessionStorage.setItem("otp", "true");
    if (this.userType == "ngo") {
      window.location.href = "https://qause.tech/";
      return;
    }
    this.postWithEmail(this.emailLogin.value.email).subscribe(
      (res) => {
        this.dialog.closeAll();
        console.log(res);
        sessionStorage.setItem("email", this.emailLogin.value.email);
        sessionStorage.setItem("isLogin", JSON.stringify(true));
        sessionStorage.setItem("isRegister", JSON.stringify(false));
        sessionStorage.setItem("userType", this.userType);
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
    return this.phoneLogin.get("phone");
  }
  get email() {
    return this.emailLogin.get("email");
  }

  onLoggedin(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedin", "true");
    if (localStorage.getItem("isLoggedin")) {
      this.router.navigate([this.returnUrl]);
    }
  }
  isChecked(value: string) {
    console.log(value);
    this.userType = value;
  }
  closeLoginPopup() {
    this.dialogRef.close('CloseAll')
  }
}
