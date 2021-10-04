
import { Component, OnInit } from '@angular/core';
import {NetworkService} from "../network.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
// import {Operator, operators} from "rxjs/internal/Rx";
// import {Operator} from "../Model/Operator";

import {Router} from "@angular/router";
// import {Transaction} from "../Model/Transaction";
import {DataService} from "../data.service";
import {window} from "ngx-bootstrap/utils";
import {JSONConstants} from "../Model/JSONHelper";


class profileResponse {
}name

function profile() {

}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user=JSON.parse(JSON.stringify("{}"));
   userId=JSONConstants.USER_OBJECT_USERID_KEY;
   token=JSONConstants.USER_OBJECT_TOKEN_KEY;
   opeeatorId=JSONConstants.USER_OBJECT_OPERATORID_KEY;
   name=JSONConstants.USER_OBJECT_NAME_KEY;
   email=JSONConstants.USER_OBJECT_EMAIL_KEY;
   mobileNumber=JSONConstants.USER_OBJECT_MOBILENUMBER_KEY;





  constructor(private networkService:NetworkService,private dataService:DataService,private http:HttpClient,private router: Router) { }

  // user : string | undefined=[ ];
  width=window.innerWidth;
  ngOnInit(): void {
    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");
    let operatorId = localStorage.getItem("operatorId");
    let response:any;
    if (userId == null || userId == "" || token == null || token == "" || operatorId == null || operatorId == "") {
      this.router.navigate(['/login']);
    }
    else {
      this.networkService.verifySession(token, operatorId, userId).subscribe(user => {
        response = user;
        console.log(response[JSONConstants.ERROR_CODE_KEY]);
        if (response[JSONConstants.ERROR_CODE_KEY] != 0) {
          this.router.navigate(['/login']);
        }
      });
    }
    this.width=window.innerWidth;
    this.networkService.getUsers("w2qe22344vfc435", "ABCD12345678abcd", "101").toPromise().then(value =>{
      console.log(value);
      this.user=JSON.parse(JSON.stringify(value))["user"];


        console.log(this.user);
        // console.log(this.user.email);
        // console.log(this.user.mobileNumber);


    })

}

  operator:[]=[];
  Name : string|undefined
  Email : string|undefined;
  operators:[]|undefined=[];
  number: string|undefined;
  operatorId : string|undefined;
  async profile()
  {
    this.enableTxtBox = !this.enableTxtBox;
    this.status = this.toggle ? 'Edit' : 'Save';
    if(this.toggle)
    {
      console.log(this.Email);
      console.log(this.Name);
      console.log(this.number);



      if (this.operator != undefined && this.opeeatorId != undefined) {
        let response: profileResponse;
        if (this.Email != null && this.Name != undefined && this.number != undefined) {
          this.networkService.profile(this.Name,this.Email,this.number).toPromise().then(value => {
            response = value
          });
        }

        // @ts-ignore
        if (this.operator == this.operators != 'null') {


          this.router.navigate(['./profile'])
        }
      }

      this.toggle=false;
    }
    else{
      this.toggle=true;
    }


  }



  private toggle: boolean | undefined;
  status = 'Edit';
  enableTxtBox: boolean =false;

  async tog() {
    //





  }
  w3_open() {

    if(document.getElementById("mySidebar") != null) {
      document.getElementById("mySidebar")!.style.display = "block";
    }
    if(document.getElementById("myOverlay") != null) {
      document.getElementById("myOverlay")!.style.display = "block";
    }


  }

  w3_close() {
    if(document.getElementById("mySidebar") != null) {
      document.getElementById("mySidebar")!.style.display = "none";
    }
    if(document.getElementById("myOverlay") != null) {
      document.getElementById("myOverlay")!.style.display = "none";
    }
  }


  logOut() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
