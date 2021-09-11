import { Component, OnInit } from '@angular/core';
import {NetworkService} from "../network.service";
// import {Operator} from "../Model/Operator";
import {operators} from "rxjs/internal/Rx";

import {Router} from "@angular/router";
import {DataService} from "../data.service";

import {FormsModule} from "@angular/forms";
import {JSONConstants} from "../Model/JSONHelper";

// class LoginResponse {
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user = JSON.parse(JSON.stringify("{}"));
  userId = JSONConstants.USER_OBJECT_USERID_KEY;
  // operatorID=JSONConstants.USER_OBJECT_OPERATORID_KEY;
  id = JSONConstants.OPERATOR_OBJECT_ID_KEY;
  operatorId = JSONConstants.OPERATOR_OBJECT_OPERATORID_KEY;
  name = JSONConstants.OPERATOR_OBJECT_NAME_KEY;
  username = JSONConstants.USER_OBJECT_NAME_KEY;
  // operator = JSONConstants.USER_OBJECT_OPERATORID_KEY;
  password = JSONConstants.USER_OBJECT_PASSWORD_KEY;
  // operator={};
  operator: any;

  loggedIn: Boolean = true;

  constructor(private networkService: NetworkService, private router: Router, private dataService: DataService) {
  }


  ngOnInit(): void {
    this.networkService.getOperators().toPromise().then(value => {
      this.operators = JSON.parse(JSON.stringify(value));
      console.log("value-------" + JSON.parse(JSON.stringify(value))[0][JSONConstants.OPERATOR_OBJECT_OPERATORID_KEY]);
    });
    // operatorList.forEach(value => {
    //   value.forEach(value1 => {
    //     if (this.operatorId) {
    //       this.operators  =JSON.parse(JSON.stringify(value));
    //       console.log("value-------------"+JSON.parse(JSON.stringify(value)));
    //     }
    //   })
    // })
  }


  operators: [] | undefined = [];
  // let
  // user: any = new this.user(JSON.stringify(this.userId));
  // username: string | undefined;
  // password: string | undefined;

  // operator:[]|undefined=[];


  async login() {
    console.log("login");
    console.log(this.username);
    console.log(this.password);
    // console.log(this.operator?operatorID);
      if (this.username != undefined && this.password != undefined && this.operatorId != undefined) {
      let response: any;
      await this.networkService.login(this.username, this.password, this.operator[JSONConstants.OPERATOR_OBJECT_OPERATORID_KEY]).toPromise().then(value => {
        response = value
        console.log(response[JSONConstants.ERROR_CODE_KEY]);
      });

      console.log()
      // @ts-ignore
      if (response[JSONConstants.ERROR_CODE_KEY] == 0) {
        // let user: any={operatorId:"",token:"",userId:""};
        // user[JSONConstants.USER_OBJECT_OPERATORID_KEY] = this.operator[JSONConstants.OPERATOR_OBJECT_OPERATORID_KEY];

        // @ts-ignore
        // user.userId = response[JSONConstants.USER_OBJECT_USERID_KEY];
        // @ts-ignore
        // user.token = response[JSONConstants.USER_OBJECT_TOKEN_KEY];
        // this.dataService.user = user;

        localStorage.setItem("userId", response[JSONConstants.USER_OBJECT_USERID_KEY]);
        localStorage.setItem("token",response[JSONConstants.USER_OBJECT_TOKEN_KEY]);
        localStorage.setItem("operatorId",this.operator[JSONConstants.OPERATOR_OBJECT_OPERATORID_KEY]);

        await this.router.navigate(['/dashboard'])
      }else {

      }
    }
  }


}
