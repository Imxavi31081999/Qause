import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { MapsAPILoader } from "@agm/core";
import { Location } from "@angular/common";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-desktop-location",
  templateUrl: "./desktop-location.component.html",
  styleUrls: ["./desktop-location.component.scss"],
})
export class DesktopLocationComponent implements OnInit {
  item: any;
  isaddress = false;
  disableaddress = true;
  isChecked: boolean = false;
  checkedItem: string = "";
  click(event: any, item: any) {
    this.checkedItem = item;
  }
  phone: string;
  userType: string;
  name: string;
  language: string[];
  checkedCategoryList: string[] = [];
  addressField: string;

  // google address
  @ViewChild("addressSearch") addressSearch: GooglePlaceDirective;
  isDropDownTouched: boolean = false;
  address: any;
  detail: object;

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.item = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhad",
      "Karnataka",
      "Kerela",
      "Maharastra",
    ];
    if (sessionStorage.getItem("formattedAddress")) {
      let persistenAddress = sessionStorage.getItem("formattedAddress");
      this.addressField = persistenAddress;
      this.disableaddress = false;
    }
  }

  changeHandler() {
    this.isaddress = false;
    console.log("run");
  }
  detectInput(event) {
    if (event.target.value.replace(/ /g, "").length > 2) {
      this.disableaddress = false;
    } else {
      this.disableaddress = true;
    }
  }

  next() {
    if (!this.addressField) {
      this.isaddress = true;
    }

    if (this.address || this.addressField) {
      sessionStorage.setItem("location", this.checkedItem);
      this.router.navigate(["/auth/notification"]);
    }
  }

  public handleAddressChange(address: any) {
    this.disableaddress = false;
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

    sessionStorage.setItem("formattedAddress", this.address.formattedAddress);
    sessionStorage.setItem("street", this.address.street);
    sessionStorage.setItem("city", this.address.city);
    sessionStorage.setItem("state", this.address.state);
    sessionStorage.setItem("zip", this.address.zip);
    sessionStorage.setItem("country", this.address.country);
    sessionStorage.setItem("lat", this.address.lat);
    sessionStorage.setItem("long", this.address.long);

    console.log(this.address.city);
  }
}
