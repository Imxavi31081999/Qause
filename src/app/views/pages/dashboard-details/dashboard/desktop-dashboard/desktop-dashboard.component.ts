import { Component, HostListener, OnInit } from "@angular/core";

import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexGrid,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexMarkers,
  ApexStroke,
  ApexLegend,
  ApexResponsive,
  ApexTooltip,
  ApexFill,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTitleSubtitle,
} from "ng-apexcharts";

import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
// import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
// Ng2-charts
import {
  ChartOptions,
  ChartType,
  ChartDataSets,
  RadialChartOptions,
} from "chart.js";
import { Label, Color, SingleDataSet } from "ng2-charts";

// Progressbar.js
import ProgressBar from "progressbar.js";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { GigsService } from "src/app/core/services/gigs.service";
import { NgxSpinnerService } from "ngx-spinner";

export type apexChartOptions = {
  series: ApexAxisChartSeries;
  nonAxisSeries: ApexNonAxisChartSeries;
  colors: string[];
  grid: ApexGrid;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  tooltip: ApexTooltip;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  labels: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-desktop-dashboard",
  templateUrl: "./desktop-dashboard.component.html",
  styleUrls: ["./desktop-dashboard.component.scss"],

  preserveWhitespaces: true,
})
export class DesktopDashboardComponent implements OnInit {
  tags = [];
  query = "";

  gigs: any;
  allGigData = [];
  allFilterGigs = [];
  gigFilterResponseLength: number = 0;
  gigSearchResponseLength: number = 0;
  gigResponseLength: number = 0;
  notEmptyPost = true;
  notscrolly = true;
  filter: boolean = false;
  totalPage: number;
  allUniqueFilterGigs = [];
  allUniqueGigs = [];
  allSearchGigs = [];
  allUniqueSearchFilterGigs = [];
  search: boolean = false;

  // pagination
  pageNumber: number = 1; // dont tamper this
  itemsPerPage = 10;
  totalItems: number;

  //
  isLogin = JSON.parse(sessionStorage.getItem('isLogin'));
  isRegister = JSON.parse(sessionStorage.getItem('isRegister'));
  category = "";
  arrCategory = [];
  innerWidth: any;
  isMobileShow: boolean;
  isDesktopShow: boolean;

  constructor(
    private calendar: NgbCalendar,
    private router: Router,
    private http: HttpClient,
    public authService: AuthenticationService,
    public gigsService: GigsService,
    private spinner: NgxSpinnerService
  ) { }

  // data: String[] = [];
  ngOnInit(): void {
    this.getAllGigs(this.pageNumber);
    this.getAllTags();
    // this.tags = ["Social-Media", "Web design", "Content Writing"];
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
    console.log(window.outerWidth);

    if (this.innerWidth < 992 || window.outerWidth < 992) {
      this.isMobileShow = true;
      this.isDesktopShow = false;
    } else {
      console.log("hi");

      this.isMobileShow = false;
      this.isDesktopShow = true;
    }
    this.notscrolly = true;
    // if (this.isLogin == true || this.isRegister == true) {
    //   sessionStorage.setItem('inDashboard', JSON.stringify(true));
    // } else if (this.isLogin == null || this.isRegister == null) {
    //   sessionStorage.setItem('inDashboard', JSON.stringify(false));
    // }
    sessionStorage.setItem('inDashboard', JSON.stringify(true));
  }

  getAllGigs(page: number) {
    this.gigsService.getGigs(page, this.category, this.query).subscribe(
      (res: any) => {
        Array.prototype.push.apply(this.allGigData, res.data);
        this.gigResponseLength = res.data.length;
        this.allUniqueGigs = this.getUniqueGigs(this.allGigData, "_id");
        this.gigs = this.allUniqueGigs;
        this.pageNumber = page;
        this.totalItems = res.total;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getFilterGigs(page: number) {
    this.gigsService.getGigs(page, this.category, this.query).subscribe(
      (res: any) => {
        Array.prototype.push.apply(this.allFilterGigs, res.data);
        this.allUniqueFilterGigs = this.getUniqueGigs(
          this.allFilterGigs,
          "_id"
        );
        this.gigs = this.allUniqueFilterGigs;
        this.gigFilterResponseLength = res.data.length;
        this.gigs;
        this.pageNumber = page;
        this.totalItems = res.total;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSearchGigs(page: number) {
    this.gigsService.getGigs(page, this.category, this.query).subscribe(
      (res: any) => {
        Array.prototype.push.apply(this.allSearchGigs, res.data);
        this.allUniqueSearchFilterGigs = this.getUniqueGigs(
          this.allSearchGigs,
          "_id"
        );
        this.gigs = this.allUniqueSearchFilterGigs;
        this.gigSearchResponseLength = res.data.length;
        this.pageNumber = page;
        this.totalItems = res.total;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUniqueGigs(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  getAllTags() {
    this.gigsService.getGigTags().subscribe(
      (res: any) => {
        this.tags = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  viewGig(gig) {
    this.router.navigateByUrl(`/dashboard/gigs?gigId=${gig._id}`);
  }

  filterGig(tag) {
    if (!this.arrCategory.includes(tag)) {
      this.arrCategory.push(tag);
      this.category = this.arrCategory.toString();
    } else {
      const index = this.arrCategory.indexOf(tag);
      if (index > -1) {
        this.arrCategory.splice(index, 1); // 2nd parameter means remove one item only
      }
      this.category = this.arrCategory.toString();
    }
  }

  doFilter() {
    this.filter = true;
    this.allFilterGigs = [];
    if (this.pageNumber > 1) {
      this.getFilterGigs(1);
    }
    if (this.pageNumber == 1) {
      this.getFilterGigs(this.pageNumber);
    }
  }

  searchQuery(query) {
    console.log(query);
    this.search = true;
    this.query = query;
    this.allSearchGigs = [];
    this.pageNumber = 1;
    this.getSearchGigs(this.pageNumber);
  }
//need to find the good position to stop the spinner insted of onscroll in both mobile and desktop
  onScroll() {
    if (this.notscrolly == true) {
      this.spinner.show();
      this.loadNextGig();
    }
    if (this.filter == true) {
      this.search = false;
      this.spinner.show();
      this.loadNextFilterGig();
    }
    if (this.search == true) {
      this.filter = false;
      this.spinner.show();
      this.loadNextSearchGig();
    }
  }
  loadNextGig() {
    if (this.gigResponseLength == 0) {
      this.notscrolly = false;
      this.spinner.hide()
    } else if (this.filter == false) {
      let nextPage = this.pageNumber + 1;
      this.getAllGigs(nextPage);
      this.notscrolly = true;
    }
  }
  loadNextFilterGig() {
    let totalPage = Math.ceil(this.totalItems % 10);
    for (let i = 1; i <= totalPage; i++) {
      if (
        this.gigFilterResponseLength >= 0 &&
        totalPage <= i &&
        totalPage >= this.pageNumber
      ) {
        let nextPage = this.pageNumber + 1;
        this.getFilterGigs(nextPage);
      } else{
        this.spinner.hide();
      }
    }
  }
  loadNextSearchGig() {
    let totalPage = Math.ceil(this.totalItems % 10);
    for (let i = 1; i <= totalPage; i++) {
      if (
        this.gigSearchResponseLength >= 0 &&
        totalPage <= i &&
        totalPage >= this.pageNumber
      ) {
        let nextPage = this.pageNumber + 1;

        this.getSearchGigs(nextPage);
      } else {
        this.spinner.hide()
      }
    }
  }
}
