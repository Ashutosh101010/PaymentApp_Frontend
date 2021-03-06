import { Component, OnInit } from '@angular/core';
import {NetworkService} from "../network.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {operators} from "rxjs/internal/Rx";
// import {Operator} from "../Model/Operator";

import {Router} from "@angular/router";
import {window} from "ngx-bootstrap/utils";
import {JSONConstants} from "../Model/JSONHelper";

class registerResponse {
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


   operatorID=JSONConstants.USER_OBJECT_OPERATORID_KEY;
   name=JSONConstants.OPERATOR_OBJECT_NAME_KEY;
   // Lane=JSONConstants.OPERATOR_OBJECT_LANE_KEY;
   // PostalCode=JSONConstants.OPERATOR_OBJECT_POSTALCODE_KEY;
   // City=JSONConstants.OPERATOR_OBJECT_CITY_KEY;
   // State=JSONConstants.OPERATOR_OBJECT_STATE_KEY;
   // Country=JSONConstants.OPERATOR_OBJECT_COUNTRY_KEY;


  constructor(private networkService:NetworkService,private http:HttpClient,private router: Router) { }



    width=window.innerWidth;
    ngOnInit(): void {
  this.width=window.innerWidth;
  console.log(this.width);
      this.networkService.getOperators().subscribe(value => {
        this.operators = JSON.parse(JSON.stringify(value));
    });
    // operatorList.forEach(value => {
    //   value.forEach(value1 => {
    //     if (this.operators) {
    //       this.operators=JSON.parse(JSON.stringify(value))[JSONConstants.OPERATOR_OBJECT_OPERATORID_KEY];
    //       console.log("value-------------"+JSON.parse(JSON.stringify(value))[JSONConstants.ERROR_CODE_KEY]);
    //     }
    //   })
    // })
  }

  operator:any;
  password : string|undefined;
  Name : string|undefined
  Email : string|undefined;
  birthdate : string|undefined;
  Lane : string |undefined;
  PostalCode : string |undefined;
  City : string |undefined;
  State : string | undefined;
  Country : string | undefined;

  number: string|undefined;
  operators: any;

  // register() : void {
  //   console.log("Signup");
  //   console.log("Operatorid")
  //   console.log(this.Email);
  //   console.log(this.password);
  //   console.log(this.birthdate);
  // }
  async  register()
  {

    console.log(this.Email);
    console.log(this.Name);
    console.log(this.password);

    // console.log(this.operator?.this.operatorID);
    console.log(this.number);
    console.log(this.Lane);
    console.log(this.PostalCode);
    console.log(this.City);
    console.log(this.State);
    console.log(this.Country);
    console.log(this.birthdate);
    if(this.operator!=undefined && this.password!=undefined && this.operator!=undefined)
    {
      let response:registerResponse;
      if (this.Email != null && this.number!=null && this.birthdate!=null && this.Name!=undefined && this.Lane!=undefined && this.PostalCode!=undefined && this.City!=undefined && this.State!=undefined && this.Country!=undefined) {
        await this.networkService.register(this.Email,this.password,this.birthdate,this.operator[JSONConstants.OPERATOR_OBJECT_OPERATORID_KEY],this.number,this.Name,this.Lane,this.PostalCode,this.City,this.State,this.Country).toPromise().then(value => {
          response = value
        });
      }

      // @ts-ignore
      if(this.operator == this.operators != 'null')
      {



        await this.router.navigate(['./login'])
      }
    }
  }


}
