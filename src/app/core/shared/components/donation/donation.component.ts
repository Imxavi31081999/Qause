import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DonationService } from "src/app/core/services/donation.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginPopupComponent } from "../../login-popup/login-popup.component";
import { RegisterPopupComponent } from "../../register-popup/register-popup.component";
import { OtpPopupComponent } from "../../otp-popup/otp-popup.component";

declare var Razorpay: any;

@Component({
  selector: "app-donation",
  templateUrl: "./donation.component.html",
  styleUrls: ["./donation.component.scss"],
})
export class DonationComponent implements OnInit {
  donationModal: boolean;
  // numberOfToken = 1;
  gigId: any = null;
  ngoId: any = null;
  name: string = "";
  email: string = "";
  mobile: string = "";
  guest: boolean = false;
  isLogin: boolean = false;
  donationWithLogin: FormGroup;

  constructor(
    private donationService: DonationService,
    public dialog: MatDialog,
    public authService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.authService.getUser()) {
      console.log(this.authService.getUser());
      
      this.mobile = this.authService.getUser().mobile;
      this.name = this.authService.getUser().name;
      this.email = this.authService.getUser().email;
    } else {
      this.isLogin = false;
    }
    this.donationWithLogin = this.fb.group({
      nameControl: [this.name, [Validators.required]],
      emailControl: [
        this.email,
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z]{1}[a-zA-Z0-9.-_]*@[a-zA-Z]{1}[a-zA-Z.-]*[a-zA-Z]{1}[.][a-zA-Z]{2,}$"
          ),
        ],
      ],
      phoneControl: [
        this.mobile,
        [Validators.required, Validators.pattern("^[0-9]+[-]*[0-9]+$")],
      ],
      anonymouslyControl: [false],
      donationInput: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(3),
        ],
      ],
      guestControl: [true],
    });
    this.authService.currentMessageLogin.subscribe(res=>{
      console.log(res);
      
      if (res == false) {
        this.donationWithLogin.patchValue({
          nameControl: '',
          emailControl: '',
          phoneControl: '',
        }); 
      }
    })
  }
  OpenDonationModal(gigId, ngoId) {
    this.gigId = gigId;
    this.ngoId = ngoId;
    this.donationModal = true;
  }

  makeNewPayment() {
    if (!this.gigId) {
      return;
    }
    console.log(this.donationWithLogin.value);
    this.name = this.donationWithLogin.value.nameControl;
    this.email = this.donationWithLogin.value.emailControl;
    this.mobile = this.donationWithLogin.value.phoneControl;
    console.log(this.mobile);

    if (this.donationWithLogin.value.donationInput > 0) {
      this.donationService
        .createDonationOrder({
          gigId: this.gigId,
          name: this.name,
          email: this.email,
          mobile: this.mobile,
          amount: this.donationWithLogin.value.donationInput * 100,
          ngo: this.ngoId,
          anonymous: this.donationWithLogin.value.anonymouslyControl,
          currency: "INR",
        })
        .subscribe(
          (res: any) => {
            let options = {
              amount: res.data.amount,
              currency: res.data.currency,
              order_id: res.data.id ? res.data.id : null,

              callback_url: (res: any) => {
                //console.log("callback url: ", res);
              },
              prefill: {
                name: this.name,
                email: this.email,
                contact: this.mobile,
              },
              handler: this.paymentResponseHandler.bind(this),
              payment: {
                failed: (response: any) => {
                  //console.log('payment failed response: ', response);
                },
              },
            };

            var rzp1 = new Razorpay(options);

            rzp1.on("payment.failed", (response: any) => {
              //console.log('falid response: ', response);
              // this.dataService.errorLog(response.error).subscribe((resp) => {
              //console.log("err", resp);
              // });
            });
            rzp1.open();
            //console.log('opened')
          },
          (err) => {
            // this.errors = err.error.errors;
            console.log("===>", err);
          }
        );
    }
  }

  paymentResponseHandler(resData: any) {
    console.log(resData);
    console.log(this.donationWithLogin.value.guestControl);

    if (this.donationWithLogin.value.guestControl) {
      let payload = {
        ...resData,
      };

      this.donationService
        .verifyGuestDontaionOrder(payload, this.gigId)
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      let payload = {
        ...resData,
        gigId: this.gigId,
      };

      this.donationService.verifyDonationOrder(payload).subscribe((res) => {
        console.log(res);

        // this.ref = this.dialogService.close()
      });
    }
  }
  openLoginPopup() {
    let dialogRef;
    if (this.dialog.openDialogs.length == 0) {
      dialogRef = this.dialog.open(LoginPopupComponent, { disableClose: true });
    }
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result == "CloseAll") {
        return;
      }
      let otp;
      if (this.dialog.openDialogs.length == 0) {
        otp = this.dialog.open(OtpPopupComponent, { disableClose: true });
      }
      otp.afterClosed().subscribe((res) => {
        console.log(res);
        if (res == "LoggedIn") {
          console.log(this.authService.getUser().name);
          this.donationWithLogin.patchValue({
            nameControl: this.authService.getUser().name,
            emailControl: this.authService.getUser().email,
            phoneControl: this.authService.getUser().mobile,
          });
        }
      });
    });
  }
  openRegisterPopup() {
    let dialogRef;
    let otp;
    if (this.dialog.openDialogs.length == 0) {
      dialogRef = this.dialog.open(RegisterPopupComponent, {
        disableClose: true,
      });
    }
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "CloseAll") {
        return;
      }
      if (this.dialog.openDialogs.length == 0) {
        otp = this.dialog.open(OtpPopupComponent, { disableClose: true });
      }
      otp.afterClosed().subscribe((res) => {
        console.log(res);
        if (res == "LoggedIn") {
          console.log(this.authService.getUser().name);
          this.donationWithLogin.patchValue({
            nameControl: this.authService.getUser().name,
            emailControl: this.authService.getUser().email,
            phoneControl: this.authService.getUser().mobile,
          });
        }
      });
    });
  }

  get nameControl() {
    return this.donationWithLogin.get("nameControl");
  }
  get emailControl() {
    return this.donationWithLogin.get("emailControl");
  }
  get phoneControl() {
    return this.donationWithLogin.get("phoneControl");
  }
  get anonymouslyControl() {
    return this.donationWithLogin.get("anonymouslyControl");
  }
  get donationInput() {
    return this.donationWithLogin.get("donationInput");
  }
  get guestControl() {
    return this.donationWithLogin.get("guestControl");
  }
}
