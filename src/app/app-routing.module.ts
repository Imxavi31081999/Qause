import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BaseComponent } from "./views/layout/base/base.component";
import { ErrorPageComponent } from "./views/pages/error-page/error-page.component";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./views/pages/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "",
    component: BaseComponent,
    children: [
      {
        path: "welcome",
        loadChildren: () =>
          import("./views/pages/welcome/welcome.module").then(
            (m) => m.WelcomeModule
          ),
      },

      {
        path: "register",
        loadChildren: () =>
          import("./views/pages/auth/register/register.module").then(
            (m) => m.RegisterModule
          ),
      },
      // {
      //   path: "dashboard",
      //   loadChildren: () =>
      //     import("./views/pages/dashboard/dashboard.module").then(
      //       (m) => m.DashboardModule
      //     ),
      // },
      {
        path: "apps",

        loadChildren: () =>
          import("./views/pages/apps/apps.module").then((m) => m.AppsModule),
      },
      {
        path: "ui-components",
        loadChildren: () =>
          import("./views/pages/ui-components/ui-components.module").then(
            (m) => m.UiComponentsModule
          ),
      },
      {
        path: "advanced-ui",
        loadChildren: () =>
          import("./views/pages/advanced-ui/advanced-ui.module").then(
            (m) => m.AdvancedUiModule
          ),
      },
      {
        path: "form-elements",
        loadChildren: () =>
          import("./views/pages/form-elements/form-elements.module").then(
            (m) => m.FormElementsModule
          ),
      },
      {
        path: "advanced-form-elements",
        loadChildren: () =>
          import(
            "./views/pages/advanced-form-elements/advanced-form-elements.module"
          ).then((m) => m.AdvancedFormElementsModule),
      },
      {
        path: "charts-graphs",
        loadChildren: () =>
          import("./views/pages/charts-graphs/charts-graphs.module").then(
            (m) => m.ChartsGraphsModule
          ),
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./views/pages/tables/tables.module").then(
            (m) => m.TablesModule
          ),
      },
      {
        path: "welcome-user",
        loadChildren: () =>
          import("./views/pages/auth/welcome-user/welcome-user.module").then(
            (m) => m.WelcomeUserModule
          ),
      },
      {
        path: "icons",
        loadChildren: () =>
          import("./views/pages/icons/icons.module").then((m) => m.IconsModule),
      },
      {
        path: "general",
        loadChildren: () =>
          import("./views/pages/general/general.module").then(
            (m) => m.GeneralModule
          ),
      },
      // new routes
      {
        path: "pages",
        loadChildren: () =>
          import("./views/pages/miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
      {
        path: "gigDetails",
        loadChildren: () =>
          import("./views/pages/gig-details/gig-details.module").then(
            (m) => m.GigDetailsModule
          ),
      },

      {
        path: "acitveAndHistory",
        loadChildren: () =>
          import(
            "./views/pages/active-and-history/active-and-history.module"
          ).then((m) => m.ActiveAndHistoryModule),
      },

      {
        path: "active-gig-details",
        loadChildren: () =>
          import(
            "./views/pages/active-gig-details/active-gig-details.module"
          ).then((m) => m.ActiveGigDetailsModule),
      },

      {
        path: "gig-listing",
        loadChildren: () =>
          import("./views/pages/gig-listing/gig-listing.module").then(
            (m) => m.GigListingModule
          ),
      },

      {
        path: "dashboard",
        loadChildren: () =>
          import(
            "./views/pages/dashboard-details/dashboard-details.module"
          ).then((m) => m.DashboardDetailsModule),
      },

      {
        path: "user-profile",
        loadChildren: () =>
          import("./views/pages/user-profile/user-profile.module").then(
            (m) => m.UserProfileModule
          ),
      },

      { path: "", redirectTo: "gig-listing", pathMatch: "full" },
      { path: "**", redirectTo: "gig-listing", pathMatch: "full" },
    ],
  },
  {
    path: "error",
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: "Page Not Found",
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },
  {
    path: "error/:type",
    component: ErrorPageComponent,
  },
  // { path: "**", redirectTo: "error", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
