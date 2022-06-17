import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mobile-applied-for-gig',
  templateUrl: './mobile-applied-for-gig.component.html',
  styleUrls: ['./mobile-applied-for-gig.component.scss']
})
export class MobileAppliedForGigComponent implements OnInit {
userName;
ngoName;
title;
  constructor(
    private location:Location,
    private activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      console.log(params);
      console.log(params.isApplied);
      this.userName = params.userName;
      this.ngoName = params.ngoName;
      this.title = params.title;
      // if (params.isApplied == false || params.isApplied == undefined) {
      //   this.goBack();
      // }
    })
  }
  goBack(){
    this.location.back()
  }
}
