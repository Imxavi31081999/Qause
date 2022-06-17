import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { MatDialog } from "@angular/material/dialog";
import { SearchComponent } from "../search/search.component";

export interface DialogData {
  searchData: string;
}

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @Input() queryData = "";

  // desktop search event
  @Output() searchEvent = new EventEmitter<any>();
  @Output() searchEventMobile = new EventEmitter<any>();
  constructor(
    public authService: AuthenticationService,
    public route: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  // desktop search event
  doSearch() {
    this.searchEvent.emit(this.queryData);
  }
  navigateToChat() {
    this.route.navigate(["/apps/chat"]);
  }
  openSearchModal() {
    let dialogRef;
    if (this.dialog.openDialogs.length == 0) {
      dialogRef = this.dialog.open(SearchComponent);
    }
    dialogRef.afterClosed().subscribe((result) => {
      console.log("closed", result);

      this.queryData = result;
      this.doMobileSearch();
    });
  }

  // mobile search event
  doMobileSearch() {
    this.searchEventMobile.emit(this.queryData);
  }
  logOut(){
    this.authService.changeMessageLogin(false)
  }
  logIn(){
    this.authService.changeMessageLogin(true)
  }
}
