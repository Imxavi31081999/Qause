import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-gig-congrats",
  templateUrl: "./gig-congrats.component.html",
  styleUrls: ["./gig-congrats.component.scss"],
})
export class GigCongratsComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

  gotoDashboard() {
    this.route.navigateByUrl("");
  }
}
