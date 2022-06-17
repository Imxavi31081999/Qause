import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DatePipe } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";

import { LayoutModule } from "./views/layout/layout.module";
import { PwaService } from "./core/services/pwa.service";

import { AppComponent } from "./app.component";
import { ErrorPageComponent } from "./views/pages/error-page/error-page.component";

import { HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { WelcomeComponent } from "./views/pages/welcome/welcome.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "./core/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

import { MatSnackBarModule } from "@angular/material/snack-bar";

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { AgmCoreModule } from "@agm/core";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@NgModule({
  declarations: [AppComponent, ErrorPageComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAF4i-J3prt6_X9GuI-48SBzroTYYkqPyk",
      libraries: ["places"],
    }),
    ReactiveFormsModule,
    MatChipsModule,
    LayoutModule,
    SharedModule,
    SocialLoginModule,
    MatSnackBarModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:15000",
    }),
  ],
  providers: [
    DatePipe,
    // {
    //   provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
    //   useValue: {
    //     coreLibraryLoader: () => import("highlight.js/lib/core"),
    //     languages: {
    //       xml: () => import("highlight.js/lib/languages/xml"),
    //       typescript: () => import("highlight.js/lib/languages/typescript"),
    //       scss: () => import("highlight.js/lib/languages/scss"),
    //     },
    //   },
    // },
    PwaService,
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "275557623285-bh2goqt02drc5nr4mqchaktvsgf703fc.apps.googleusercontent.com"
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
