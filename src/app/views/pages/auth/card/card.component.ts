import { HttpClient } from "@angular/common/http";
import { Component, HostListener, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  phone: string;
  userType: string;
  name: string;
  language: string[];
  checkedItemValue: string;
  checkedCategoryList: string[] = [];
  category: any;
  ispassion = false;
  isdisabled = true;
  public innerWidth: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLanguage();
    var items = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];

    // this.item = ['Social Media', 'Writing', 'Illustraiton', 'Web Design', 'Designing', 'Teaching', 'UI & UX', 'Graphic Design', 'Interest'];
    if (sessionStorage.getItem("category")) {
     let passion = JSON.parse(sessionStorage.getItem("category"))
       passion.forEach(ele => {
         this.checkedCategoryList.push(ele)
         this.isdisabled = false;
       });
    }
  }

  click(item: any) {
    console.log(item);
    this.checkedItemValue = item;
    if (this.checkedCategoryList.length) {
  
    }
    if (this.checkedCategoryList.includes(item)) {
      
      const index = this.checkedCategoryList.indexOf(item);

      if (index >= 0) {
        this.checkedCategoryList.splice(index, 1);
      }
    } else {
      this.checkedCategoryList.push(item);
    }
    console.log(this.checkedCategoryList);
    if (this.checkedCategoryList.length > 0) {
      this.isdisabled = false;
    } else {
      this.isdisabled = true;
    }
  }
  get(): Observable<any> {
    const headers = {
      key: "Authorization",
      value: "{{volunteer_jwt}}",
      type: "text",
      "Access-Control-Allow-Headers": "*",
    };
    console.log("language get api");
    // return this.http.get('https://qause.online/api/v2/volunteer/category');
    return this.http.get<any>(`${environment.prodUrl}/category`);
  }

  next() {
    if (!this.checkedCategoryList.length) {
      this.ispassion = true;
    } else {
      sessionStorage.setItem(
        "category",
        JSON.stringify(this.checkedCategoryList)
      );
      if (this.dialog.openDialogs.length == 0) {
        this.router.navigate(["/auth/location"]);
      } else {
        this.dialog.closeAll();
      }
    }
  }
  getLanguage() {
    this.get().subscribe((res) => {
      console.log(res);
      this.category = res.data;
      console.log(this.category);
    });
  }
}
