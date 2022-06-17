import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop-applied-for-gig',
  templateUrl: './desktop-applied-for-gig.component.html',
  styleUrls: ['./desktop-applied-for-gig.component.scss']
})
export class DesktopAppliedForGigComponent implements OnInit {
ngoName;
title;
  constructor(
    private dialogRef:MatDialogRef<DesktopAppliedForGigComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    
    this.ngoName = this.data.ngoName,
    this.title = this.data.title
  }

  close(){
    this.dialogRef.close()
  }
  routeToGig(){
    this.dialogRef.close()
    this.router.navigate(['/gig-listing'])
  }
  routeToChat(){
    this.dialogRef.close()
    this.router.navigate(['/apps/chat'])
  }
}
