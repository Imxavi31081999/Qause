import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DatePipe, Location } from "@angular/common";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ProfileService } from "src/app/core/services/profile.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { MapsAPILoader } from "@agm/core";
@Component({
  selector: "app-mobile-edit-profile",
  templateUrl: "./mobile-edit-profile.component.html",
  styleUrls: ["./mobile-edit-profile.component.scss"],
})
export class MobileEditProfileComponent implements OnInit {
  @ViewChild("mobSearch") addressSearch: GooglePlaceDirective;
  isDropDownTouched: boolean = false;
  address: Object;

  addOnBlur = true;
  languageKnown: string[] = [];
  allLanguages: string[] = ["Hindi", "English", "Bengali", "Marathi", "French"];
  filteredLanguages: Observable<string[]>;

  passions = [];

  disabled: boolean = true;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [COMMA, ENTER];

  // personal info chips
  @ViewChild("languageInput") languageInput: ElementRef<HTMLInputElement>;
  @ViewChild("languageAtuo") matAutocomplete: MatAutocomplete;

  // old data
  userDetails;

  // forms
  personalInfoForm = new FormGroup({
    name: new FormControl("", [
      Validators.minLength(3),
      Validators.required,
      Validators.maxLength(40),
    ]),
    birth: new FormControl("", [Validators.required]),
    gender: new FormControl("", []),
    languageKnown: new FormControl("", []),
  });

  accountFormAndAddressForm = new FormGroup({
    email: new FormControl("", [
      Validators.pattern(
        "^[a-zA-Z]{1}[a-zA-Z0-9.-_]*@[a-zA-Z]{1}[a-zA-Z.-]*[a-zA-Z]{1}[.][a-zA-Z]{2,}$"
      ),
      Validators.required,
    ]),
    mobile: new FormControl("", [
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      Validators.required,
    ]),
    address: new FormControl("", [Validators.required]),
    street: new FormControl({ value: "", disabled: this.disabled }, []),
    city: new FormControl({ value: "", disabled: this.disabled }, []),
    state: new FormControl({ value: "", disabled: this.disabled }, []),
    country: new FormControl({ value: "", disabled: this.disabled }, []),
    zip: new FormControl({ value: "", disabled: this.disabled }, [
      Validators.pattern("^((\\?)|0)?[0-9]{6}$"),
    ]),
  });

  linksForm = {
    socialMediaLinks: {
      instagram: "",
      twitter: "",
      google: "",
      facebook: "",
    },
    portfolioLinks: [],
    tempWebsiteTitle: "",
    tempWebsiteValue: "",
  };

  bio: string;

  isEditBio = true;

  // modal references
  personalInfoModalReference;
  bioModalReference;
  interestModalReference;
  linksModalReference;
  accountSettingsModalReference;
  public closeResult: string;

  constructor(
    private profileService: ProfileService,
    private datePipe: DatePipe,
    private location: Location,
    private modalService: NgbModal,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this is for personal info, Languages

    this.getUserDetails();

    this.filteredLanguages =
      this.personalInfoForm.controls.languageKnown.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) =>
          fruit ? this._filter(fruit) : this.allLanguages.slice()
        )
      );
    console.log("running");
  }

  openPersonalInfoModal(content) {
    this.personalInfoModalReference = this.modalService.open(content);
    this.personalInfoModalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openBioModal(content) {
    this.bioModalReference = this.modalService.open(content);
    this.bioModalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openInterestModal(content) {
    this.interestModalReference = this.modalService.open(content);
    this.interestModalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openLinksModal(content) {
    this.linksModalReference = this.modalService.open(content);
    this.linksModalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openAccountSettingsModal(content) {
    this.accountSettingsModalReference = this.modalService.open(content);
    this.accountSettingsModalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  closePersonalInfoModal() {
    console.log("closing");
    this.personalInfoModalReference.close();
  }

  closeBioModal() {
    console.log("closing");
    this.bioModalReference.close();
  }

  closeInterestModal() {
    console.log("closing");
    this.interestModalReference.close();
  }

  closeLinksModal() {
    console.log("closing");
    this.linksModalReference.close();
  }

  closeAccountSettingsModal() {
    console.log("closing");
    this.accountSettingsModalReference.close();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  goBack() {
    this.location.back();
  }

  addLanguage(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Language
    if ((value || "").trim()) {
      this.languageKnown.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.personalInfoForm.controls.languageKnown.setValue(null);
  }

  removeLanguage(fruit: string): void {
    const index = this.languageKnown.indexOf(fruit);

    if (index >= 0) {
      this.languageKnown.splice(index, 1);
    }
  }

  selectedLanguage(event: MatAutocompleteSelectedEvent): void {
    this.languageKnown.push(event.option.viewValue);
    this.languageInput.nativeElement.value = "";
    this.personalInfoForm.controls.languageKnown.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLanguages.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }

  addPassion(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Passion
    if ((value || "").trim()) {
      this.passions.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removePassion(fruit): void {
    const index = this.passions.indexOf(fruit);

    if (index >= 0) {
      this.passions.splice(index, 1);
    }
  }

  editBio(value: boolean) {
    this.isEditBio = value;
  }

  addNewLinks() {
    // console.log();

    // return;

    if (this.linksForm.tempWebsiteTitle && this.linksForm.tempWebsiteValue) {
      let title = this.linksForm.tempWebsiteTitle;
      let value = this.linksForm.tempWebsiteValue;
      this.linksForm.portfolioLinks.push({ title: title, value: value });
      this.linksForm.tempWebsiteTitle = "";
      this.linksForm.tempWebsiteValue = "";
    }
    console.log(this.linksForm);
  }

  getUserDetails() {
    this.personalInfoForm.disable();
    this.accountFormAndAddressForm.disable();

    this.profileService.getUserProfileDetails().subscribe(
      (res: any) => {
        // console.log(res);
        this.userDetails = res.data;
        console.log(this.userDetails);

        // setting user data

        // setting personal info
        this.personalInfoForm.patchValue({
          name: this.userDetails.name,
          birth: this.userDetails.birth
            ? this.datePipe.transform(
                new Date(this.userDetails.birth),
                "yyyy-MM-dd"
              )
            : "",
          gender: this.userDetails.gender,
        });
        this.languageKnown = this.userDetails.languageKnown;

        // setting bio

        this.bio = this.userDetails.bio;

        // setting passions/interest
        this.passions = this.userDetails.passions;

        this.linksForm.socialMediaLinks.facebook =
          this.userDetails.social.facebook;
        this.linksForm.socialMediaLinks.google = this.userDetails.social.google;
        this.linksForm.socialMediaLinks.twitter =
          this.userDetails.social.twitter;
        this.linksForm.socialMediaLinks.instagram =
          this.userDetails.social.instagram;

        this.userDetails.portfolio.forEach((ele) => {
          let title = ele.title;
          let value = ele.link;
          this.linksForm.portfolioLinks.push({ title: title, value: value });
        });

        // setting values of account setting

        // this.accountFormAndAddressForm.patchValue({
        //   email: this.userDetails,
        //   mobile: this.userDetails,
        //   oldPassword: this.userDetails,
        //   newPassword: this.userDetails,
        // })

        // this.addressForm.patchValue({
        //   address: this.userDetails,
        //   city: this.userDetails,
        //   state: this.userDetails,
        //   country: this.userDetails,
        //   zip: this.userDetails,
        // });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  personalInfoControlToggler(formControlName) {
    let formControl = this.personalInfoForm.controls[formControlName];
    let currentStatus = formControl.disabled;

    if (currentStatus) {
      formControl.enable();
    } else {
      formControl.disable();
    }
  }

  accountControlToggler(formControlName) {
    let formControl = this.accountFormAndAddressForm.controls[formControlName];
    let currentStatus = formControl.disabled;

    if (currentStatus) {
      formControl.enable();
    } else {
      formControl.disable();
    }
  }

  onPersonalInfoFormSubmit() {
    // console.log(this.personalInfoForm);
    console.log(this.personalInfoForm.value);

    if (this.personalInfoForm.invalid) {
      this.snackBar.open("Please enter correct details", "cancel", {
        duration: 4000,
        verticalPosition: "bottom",
        horizontalPosition: "center",
        panelClass: ["blue-snackbar"],
      });

      this.personalInfoModalReference.close();

      return;
    }

    this.updatePersonalDetails(this.personalInfoForm.value);
  }

  onSubmintBio() {
    console.log(this.bio);
    let data = {
      bio: this.bio,
    };
    this.profileService.updateBio(data).subscribe(
      (res) => {
        this.snackBar.open("Bio Updated Successfully!", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });
        console.log(res);
        this.closeBioModal();
      },
      (err) => {
        this.snackBar.open("Somethig went wrong! Try Again", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });
        console.log(err);
        this.closeBioModal();
      }
    );
  }

  onSubmitPassion() {
    console.log(this.passions);
    let data = {
      passions: this.passions,
    };
    this.profileService.updatePassions(data).subscribe(
      (res) => {
        this.snackBar.open("Updated Successfully!", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });
        console.log(res);
        this.closeInterestModal();
      },
      (err) => {
        this.snackBar.open("Somethig went wrong! Try Again", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });
        console.log(err);
        this.closeInterestModal();
      }
    );
  }

  onAccountFormSubmit() {
    // console.log(this.personalInfoForm);
    console.log(this.accountFormAndAddressForm.value);

    if (this.accountFormAndAddressForm.invalid) {
      this.snackBar.open("Please enter correct details", "cancel", {
        duration: 4000,
        verticalPosition: "bottom",
        horizontalPosition: "center",
        panelClass: ["blue-snackbar"],
      });

      return;
    }
    // return;
    this.updateAccountDetails(this.personalInfoForm.value);
  }

  onSubmitLinks() {
    console.log(this.linksForm);
    let socialMediaLinks = this.linksForm.socialMediaLinks;
    let portfolioLinks = this.linksForm.portfolioLinks;
    let data: any = { ...socialMediaLinks };
    data.portfolio = {};
    if (portfolioLinks.length > 0) {
      portfolioLinks.forEach((element) => {
        console.log(element);

        let title = element.title;
        let value = element.value;
        data.portfolio[title] = value;
      });
    }

    console.log(data);

    this.profileService.updateLinks(data).subscribe(
      (res) => {
        this.snackBar.open("Links Updated Successfully!", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });
        console.log(res);
        this.closeLinksModal();
      },
      (err) => {
        this.snackBar.open("Somethig went wrong! Try Again", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });
        console.log(err);
        this.closeLinksModal();
      }
    );
  }

  updatePersonalDetails(formData) {
    // console.log(formData);
    // console.log(this.personalInfoForm.controls.languageKnown);
    // console.log(this.languageKnown);

    let data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birth: formData.birth,
      gender: formData.gender,
      languageKnown: this.languageKnown,
    };

    console.log(data);

    // return;

    this.profileService.updatePersonalDetails(data).subscribe(
      (res) => {
        this.snackBar.open("Personal details Updated Successfully!", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });
        console.log(res);
        this.personalInfoModalReference.close();
      },
      (err) => {
        this.snackBar.open("Somethig went wrong! Try Again", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });
        console.log(err);
        this.personalInfoModalReference.close();
      }
    );
  }

  updateAccountDetails(data) {
    console.log(data);

    // return;

    this.profileService.updateAccountInfo(data).subscribe(
      (res) => {
        this.snackBar.open("Personal details Updated Successfully!", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
        });
        console.log(res);
        this.closeAccountSettingsModal();
      },
      (err) => {
        this.snackBar.open("Somethig went wrong! Try Again", "cancel", {
          duration: 4000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: ["blue-snackbar"],
        });
        console.log(err);
        this.closeAccountSettingsModal();
      }
    );
  }

  public handleAddressChange(address: any) {
    let selected_for_street = address.address_components.find((each) =>
      each.types.includes("sublocality_level_1")
    );
    let selected_for_state = address.address_components.find((each) =>
      each.types.includes("administrative_area_level_1")
    );
    let selected_for_city = address.address_components.find(
      (each) =>
        each.types.includes("administrative_area_level_2") ||
        each.types.includes("sublocality")
    );
    let selected_for_zip = address.address_components.find((each) =>
      each.types.includes("postal_code")
    );
    let selected_for_country = address.address_components.find((each) =>
      each.types.includes("country")
    );
    let exceptionState = [
      "jammu",
      "kashmir",
      "jammu and Kashmir",
      "jammu & kashmir",
    ];
    this.isDropDownTouched = true;
    exceptionState.forEach((each) => {
      if (address.formatted_address.toLowerCase().includes(each)) {
        if (
          each === "jammu" ||
          each === "kashmir" ||
          each === "jammu and kashmir" ||
          each === "jammu & kashmir"
        ) {
          selected_for_state = { long_name: "jammu and kashmir" };
          selected_for_country = { long_name: "india" };
        } else {
          selected_for_state = { long_name: each };
          selected_for_country = { long_name: "india" };
        }
      }
    });
    this.address = {
      formattedAddress: address.formatted_address
        ? address.formatted_address
        : "",
      street: selected_for_street ? selected_for_street.long_name : "",
      city: selected_for_city ? selected_for_city.long_name : "",
      state: selected_for_state.long_name ? selected_for_state.long_name : "",
      zip: selected_for_zip ? selected_for_zip.long_name : "",
      country: selected_for_country.long_name
        ? selected_for_country.long_name
        : "",
      lat: address.geometry.location.lat(),
      long: address.geometry.location.lng(),
    };

    console.log(this.address);
    this.updateValue(this.address);
  }

  updateValue(data) {
    // console.log(data.country);
    // console.log(this.addressForm.getRawValue());

    if (this.address != null) {
      this.accountFormAndAddressForm.patchValue({
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zip: data.zip,
      });
    }

    console.log(this.accountFormAndAddressForm.getRawValue());
  }
}
