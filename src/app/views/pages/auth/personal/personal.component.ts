import { Component, OnInit } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { map, startWith } from "rxjs/operators";
import { Location } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"],
})
export class PersonalComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // languagesKnown = new FormControl();
  personalInfoForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    languageKnown: new FormControl("", [Validators.required]),
  });
  // mat Chips
  languageKnown: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  allLanguages: string[] = ["Hindi", "English", "Bengali", "Marathi", "French"];
  filteredLanguages: Observable<string[]>;
  isdisabled = true;

  phone: string;
  userType: string;
  // name: string;

  @ViewChild("languageInput") languageInput: ElementRef<HTMLInputElement>;

  constructor(
    private http: HttpClient,
    public router: Router,
    private location: Location,
    private dialog:MatDialog,
  ) {}

  ngOnInit(): void {
    this.initaliseFliterdLanguage();
    this.getLanguage();
    this.phone = sessionStorage.getItem("phone");
    this.userType = sessionStorage.getItem("userType");
    
    this.personalInfoForm.patchValue({
      name:sessionStorage.getItem('name'),
    })
    if (sessionStorage.getItem('languageKnown')) {
      let persistentLanguage  = JSON.parse(sessionStorage.getItem('languageKnown'))  
    persistentLanguage.forEach(element => {
      this.languageKnown.push(element);
      this.isdisabled = false;
    });
    }
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
    if (index == 0) {
      this.isdisabled = true;
    }
    if (index >= 0) {
      this.languageKnown.splice(index, 1);
    }
  }

  selectedLanguage(event: MatAutocompleteSelectedEvent): void {
    this.isdisabled = false;
    this.languageKnown.push(event.option.viewValue);
    this.languageInput.nativeElement.value = "";
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLanguages.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }

  get(): Observable<any> {
    const headers = {};
    console.log("language get api");
    // return this.http.get(`${environment.prodUrl}https://qause.online/api/v1/language`, { 'headers': headers });
    return this.http.get(`http://qause.online:3000/api/v1/language`, {
      headers: headers,
    });
  }
  detectName(event){
    if (event.target.value.replace(/ /g, "").length > 2) {
      this.isdisabled = false;
    } else {
      this.isdisabled = true;
    }
  }


get name(){
return this.personalInfoForm.get('name');

}

get languageKnow(){
  return this.personalInfoForm.get('languageKnown');
  
  }


  getLanguage() {
    this.get().subscribe((res) => {
      console.log(res);
      this.allLanguages = res.data[0].languages;
      this.initaliseFliterdLanguage();
    });
  }
  next() {
    if ( 
      this.personalInfoForm.controls.name.value !== undefined ||
      this.personalInfoForm.controls.name.value !== ""
    ) {
      sessionStorage.setItem("name", this.personalInfoForm.controls.name.value);
      sessionStorage.setItem(
        "language",
        this.languageKnown[0] ? this.languageKnown[0] : ""
      );

      sessionStorage.setItem(
        "languageKnown",
        JSON.stringify(this.languageKnown)
      );
      if (this.dialog.openDialogs.length == 0) {
        this.router.navigate(["/auth/card"]); 
      } else {
        this.dialog.closeAll();
      }
    }
  }
  initaliseFliterdLanguage() {
    this.filteredLanguages =
      this.personalInfoForm.controls.languageKnown.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) =>
          fruit ? this._filter(fruit) : this.allLanguages.slice()
        )
      );
  }
  goBack() {
    this.location.back();
  }
}
