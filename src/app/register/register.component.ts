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

  constructor(private networkService:NetworkService,private http:HttpClient,private router: Router) { }

  // postData() {
  //   localStorage.setItem("username", JSON.stringify(this.Operatorid)),
  //     localStorage.setItem("password", JSON.stringify(this.password))
  //   localStorage.setItem("balance", JSON.stringify(this.number))
  //   let url = "http://localhost:4040/api/users/create"
  //   this.http.post(url, {
  //     Operatorid:this.Operatorid,
  //     Email:this.Email,
  //     password:this.password,
  //     birthdate:this.birthdate
  //
  //   }).toPromise().then((data:any) => {
  //     console.log(data)
  //     console.log(JSON.stringify(data.Operatorid ))
  //
  //     this.result =data.user
  //   })
  // }

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
  number: string|undefined;
  operators: [] | undefined=[];

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
    console.log(this.birthdate);
    if(this.operator!=undefined && this.password!=undefined && this.operator!=undefined)
    {
      let response:registerResponse;
      if (this.Email != null && this.number!=null && this.birthdate!=null && this.Name!=undefined) {
        await this.networkService.register(this.Email,this.password,this.birthdate,this.operatorID,this.number,this.Name).toPromise().then(value => {
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
