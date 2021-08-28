import { Component, OnInit } from '@angular/core';
import {NetworkService} from "../network.service";
import {Operator} from "../Model/Operator";
import {operators} from "rxjs/internal/Rx";
import {LoginResponse} from "../Model/LoginResponse";
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {User} from "../Model/User";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private networkService:NetworkService,private router:Router,private dataService:DataService) { }

  ngOnInit(): void {
    let operatorList = this.networkService.getOperators();
    operatorList.forEach(value => {
      value.forEach(value1 => {
        this.operators.push(value1);
      })
    })
  }


  operators:Operator[]=[];
  username:string|undefined;
  password:string|undefined;
  operator:Operator|undefined;


  async  login()
  {
    console.log("login");
    console.log(this.username);
    console.log(this.password);
    console.log(this.operator?.operatorID);
if(this.username!=undefined && this.password!=undefined && this.operator?.operatorID!=undefined)
{
  let response:LoginResponse;
  await this.networkService.login(this.username,this.password,this.operator.operatorID).toPromise().then(value => {response=value});

  // @ts-ignore
  if(response.errorCode==0)
  {
    let user: User = new User();
   user.operatorId=this.operator.operatorID;
   // @ts-ignore
    user.userId=response.id;
    // @ts-ignore
    user.token=response.token;
    this.dataService.user=user;

    this.router.navigate(['/dashboard'])
  }
}
  }


}
