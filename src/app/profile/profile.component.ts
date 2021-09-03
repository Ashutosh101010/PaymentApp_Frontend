import { Component, OnInit } from '@angular/core';
import {NetworkService} from "../network.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {operators} from "rxjs/internal/Rx";
import {Operator} from "../Model/Operator";
import {LoginResponse} from "../Model/LoginResponse";
import {User} from "../Model/User";
import {Router} from "@angular/router";
import {Transaction} from "../Model/Transaction";
import {DataService} from "../data.service";


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
   user: User = new User();




  constructor(private networkService:NetworkService,private dataService:DataService,private http:HttpClient,private router: Router) { }

  // user : string | undefined=[ ];

  ngOnInit(): void {
    this.networkService.getUsers("w2qe22344vfc435", "ABCD12345678abcd", "101").toPromise().then(value =>{
      console.log(value);
this.user=<User>value.user;

        console.log(this.user.name);
        console.log(this.user.email);
        console.log(this.user.mobileNumber);


    })

}

  operator:Operator|undefined;
  Name : string|undefined
  Email : string|undefined;
  operators:Operator[]=[];
  number: string|undefined;
  async profile()
  {
    this.enableTxtBox = !this.enableTxtBox;
    this.status = this.toggle ? 'Edit' : 'Save';
    if(this.toggle)
    {
      console.log(this.Email);
      console.log(this.Name);
      console.log(this.number);



      if (this.operator != undefined && this.operator?.operatorID != undefined) {
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


}
