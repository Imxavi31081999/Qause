import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GigDetailsService } from 'src/app/core/services/gig-details.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-desktop-active-multiple',
  templateUrl: './desktop-active-multiple.component.html',
  styleUrls: ['./desktop-active-multiple.component.scss']
})
export class DesktopActiveMultipleComponent implements OnInit {
  gigId = "629a3169dba8674f0b2e92db"; //this has to be dynamic
  multipleVolunteerData: any;
  firstFile;
  secondFile;
  thirdFile;
  moreThenThreeFiles;
  firstFileName;
  secondFileName;
  thirdFileName;
  fileSizeError;
  fileUploadedDetails;
  uploadProgress: number;
  uploadSub: Subscription;
  filesLength;
  validFormats = ["jpg", "pdf", "png", "jpeg"];

  constructor( public gigDetailsService: GigDetailsService, private http:HttpClient,
    private activatedroute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedroute.queryParamMap.subscribe((params) => {
      if (params.get("gigId")) {
        this.gigId = params.get("gigId");
      }
      console.log(this.gigId);
      if (this.gigId) {
        this.getGigDetails();
      }
    });
  }
  getGigDetails() {
    this.gigDetailsService.getGigDetails(this.gigId).subscribe(
      (res: any) => {
        console.log(res);
        
        this.multipleVolunteerData = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onFileSelected(event) {
    // console.log(event.target.files);
    const firstFile: File = event.target.files[0];
    const secondFile: File = event.target.files[1];
    const thirdFile: File = event.target.files[2];
    this.filesLength =  event.target.files.length
    if (this.filesLength > 3) {
      this.moreThenThreeFiles = true
      return;
    } else
    if (firstFile && secondFile && thirdFile) {
      this.moreThenThreeFiles = false;
      this.firstFile = firstFile;
      this.secondFile = secondFile;
      this.thirdFile = thirdFile;
      this.firstFileName = this.firstFile.name
      this.secondFileName = this.secondFile.name
      this.thirdFileName = this.thirdFile.name
      if (this.firstFile.size > 1000000 || this.secondFile.size > 1000000 || this.thirdFile > 1000000) {
        this.fileSizeError = true;
      } else {
        this.fileSizeError = false;
      }
    } else
    if (firstFile && secondFile) {
      this.moreThenThreeFiles = false;

      this.firstFile = firstFile;
      this.secondFile = secondFile;

      this.firstFileName = this.firstFile.name
      this.secondFileName = this.secondFile.name
      if (this.firstFile.size > 1000000 || this.secondFile.size > 1000000) {
        this.fileSizeError = true;
      } else {
        this.fileSizeError = false;
      }
    } else
    if (firstFile) {
      this.moreThenThreeFiles = false;
      this.firstFile = firstFile;
      this.firstFileName = this.firstFile.name
      if (this.firstFile.size > 1000000) {
        this.fileSizeError = true;
      } else {
        this.fileSizeError = false;
      }
    } 
  }
  docSubmit() {
    // let userToken: any = localStorage.getItem("userToken");
    // userToken = JSON.parse(userToken);
    // let token = userToken.data.token;
    // console.log(this.firstFile);
    // console.log(this.secondFile);
    // console.log(this.thirdFile);
    if (this.firstFile && this.secondFile && this.thirdFile) {
      const formData = new FormData();
      formData.append("files", this.firstFile);
      formData.append("files", this.secondFile);
      formData.append("files", this.thirdFile);
      console.log(formData);
      const upload$ = this.http
        .post(`${environment.prodUrl}/gig/629a3169dba8674f0b2e92db/images`, formData,)
        .pipe(finalize(() => this.reset()));

      this.uploadSub = upload$.subscribe(
        (event: any) => {
          // console.log(event);
          if (event.body) {
            this.fileUploadedDetails = event.body.data;
          }

          if (event.type === HttpEventType.UploadProgress) {
            console.log(event.loaded);
            console.log(event.total);
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else
    if (this.firstFile && this.secondFile) {
      const formData = new FormData();
      formData.append("files", this.firstFile);
      formData.append("files", this.secondFile);
      const upload$ = this.http
        .post(`${environment.prodUrl}/gig/629a3169dba8674f0b2e92db/images`, formData,)
        .pipe(finalize(() => this.reset()));

      this.uploadSub = upload$.subscribe(
        (event: any) => {
          // console.log(event);
          if (event.body) {
            this.fileUploadedDetails = event.body.data;
          }

          if (event.type === HttpEventType.UploadProgress) {
            console.log(event.loaded);
            console.log(event.total);
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else
    if (this.firstFile) {
      const formData = new FormData();
      formData.append("files", this.firstFile);
      console.log(this.firstFile);
      
      console.log(formData);
      const upload$ = this.http
        .post(`${environment.prodUrl}/gig/629a3169dba8674f0b2e92db/images`, formData,)
        .pipe(finalize(() => this.reset()));

      this.uploadSub = upload$.subscribe(
        (event: any) => {
          console.log(event);
          console.log(event.type);
          
          if (event) {
            this.fileUploadedDetails = event.data;
          }

          if (event.type === HttpEventType.UploadProgress) {
            console.log(event.loaded);
            console.log(event.total);
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  reset() {
    console.log("uploaded");
    this.firstFile = ''
    this.secondFile = ''
    this.thirdFile = ''
    this.filesLength = 0
    this.firstFileName = ''
    this.secondFileName = ''
    this.thirdFileName = ''
  }
}
