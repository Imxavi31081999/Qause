import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit {
  constructor(
    private router: Router,
    private notificatinService: NotificationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  getNotify: boolean;
  details: any;

  ngOnInit(): void {}

  saveData(value) {
    sessionStorage.setItem("getNotification", value);
    let name = sessionStorage.getItem("name");
    let languageKn = JSON.parse(sessionStorage.getItem("languageKnown"));
    let finalCity = sessionStorage.getItem("city");
    let finalPassion = JSON.parse(sessionStorage.getItem("category"));
    let finalStreet = sessionStorage.getItem("street");
    let finalZip = sessionStorage.getItem("zip");
    let finalstate = sessionStorage.getItem("state");
    let finalCountry = sessionStorage.getItem("country");
    let finalLat = sessionStorage.getItem("lat");
    let finalLong = sessionStorage.getItem("long");
    let finalforAddress = sessionStorage.getItem("formattedAddress");

    this.details = {
      languageKnown: languageKn && languageKn.length > 0 ? languageKn : [],
      name: name ? name : " ", // required
      passions: finalPassion && finalPassion.length > 0 ? finalPassion : [],
      street: finalStreet ? finalStreet : " ",
      city: finalCity ? finalCity : " ",
      zip: finalZip ? finalZip : " ",
      state: finalstate ? finalstate : " ", // required
      country: finalCountry ? finalCountry : " ", // required
      lat: finalLat ? finalLat : " ",
      long: finalLong ? finalLong : " ",
      getNotification: sessionStorage.getItem("getNotification"), // required
      formattedAddress: finalforAddress ? finalforAddress : " ",
    };

    console.log(this.details);
    this.notificatinService.signUp(this.details).subscribe(
      (res: any) => {
        console.log(res);

        localStorage.setItem("genericUserData", JSON.stringify(res.data.user));

        this.snackBar.open("Details have been saved", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });

        sessionStorage.clear();
        this.router.navigateByUrl("");
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

  updateNotification() {
    let payload = {
      getNotification: true,
    };

    // console.log("hi", value);
    this.notificatinService.updateGetNotification(payload).subscribe(
      (response) => {
        console.log(response);
        sessionStorage.setItem("logged", "true");
        sessionStorage.removeItem("settingInfo");
        if (this.dialog.openDialogs.length == 0) {
          this.router.navigateByUrl("");
        } else {
          this.dialog.closeAll();
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
