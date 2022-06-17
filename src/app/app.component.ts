import { Component, OnInit } from "@angular/core";
import { PwaService } from "./core/services/pwa.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "nobleui-angular";

  constructor(public Pwa: PwaService) {}

  ngOnInit(): void {}
  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }
}
