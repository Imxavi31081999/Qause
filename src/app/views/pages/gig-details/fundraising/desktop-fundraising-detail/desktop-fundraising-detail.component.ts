import { Component, OnInit, ViewChild } from "@angular/core";
import { GigDetailsService } from "src/app/core/services/gig-details.service";
import { DonationComponent } from "src/app/core/shared/components/donation/donation.component";

@Component({
  selector: "app-desktop-fundraising-detail",
  templateUrl: "./desktop-fundraising-detail.component.html",
  styleUrls: ["./desktop-fundraising-detail.component.scss"],
})
export class DesktopFundraisingDetailComponent implements OnInit {
  @ViewChild(DonationComponent) donationComponent: DonationComponent;

  // pagination
  limit = 10;
  currentPage = 1;
  totalPages = 2;
  totalRecords = this.limit * this.totalPages;

  transactions;
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  imgSrc = [
    {
      src: "/assets/images/cool-background.svg",
    },
    {
      src: "/assets/images/cool-background.svg",
    },
    {
      src: "/assets/images/cool-background.svg",
    },
  ];

  responsiveOptions = [
    {
      breakpoint: "4000px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1920px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1600px",
      numVisible: 1,
      numScroll: 1,
    },

    {
      breakpoint: "1024px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "768px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  gigId = "6238ac7a26f691ac36df3b01";
  ngoId = "623080b65cf5fad6f0aebfc1";
  fundraisingData: any;
  isReadMore = true;
  isInputVisible = false;
  constructor(private gigDetailsService: GigDetailsService) {}

  ngOnInit(): void {
    this.gigDetailsService.getGigDetails(this.gigId).subscribe((data: any) => {
      this.fundraisingData = data.data;
      console.log(data);
    });

    this.getTransactionDetails();
  }

  showText() {
    this.isReadMore = !this.isReadMore;
  }
  otherAmount() {
    this.isInputVisible = true;
  }

  OpenDonationModal() {
    this.donationComponent.OpenDonationModal(this.gigId, this.ngoId);
  }

  getTransactionDetails() {
    this.gigDetailsService
      .getTransactionDetails(this.gigId, this.currentPage)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.totalPages = res.total;
          this.transactions = res.data.transitions;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.currentPage = event.page + 1;
    this.getTransactionDetails();
  }

  getTransactionDate(date) {
    let mydate = new Date(date);

    return `${mydate.getDate()} ${
      this.months[mydate.getMonth()]
    }, ${mydate.getFullYear()}`;
  }
}
