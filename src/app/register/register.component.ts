import { Component, OnInit } from '@angular/core';
import {NetworkService} from "../network.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {operators} from "rxjs/internal/Rx";
import {Operator} from "../Model/Operator";
import {LoginResponse} from "../Model/LoginResponse";
import {User} from "../Model/User";
import {Router} from "@angular/router";
import {window} from "ngx-bootstrap/utils";

class registerResponse {
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private Operatorid: any;
  private dataService: any;



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
    let operatorList = this.networkService.getOperators();
    operatorList.forEach(value => {
      value.forEach(value1 => {
        this.operators.push(value1);
      })
    })
  }
  operator:Operator|undefined;
  password : string|undefined;
  Name : string|undefined
  Email : string|undefined;
  birthdate : string|undefined;
  number: string|undefined;
  operators:Operator[]=[];

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
    console.log(this.operator?.operatorID);
    console.log(this.number);
    console.log(this.birthdate);
    if(this.operator!=undefined && this.password!=undefined && this.operator?.operatorID!=undefined)
    {
      let response:registerResponse;
      if (this.Email != null && this.number!=null && this.birthdate!=null && this.Name!=undefined) {
        await this.networkService.register(this.Email,this.password,this.birthdate,this.operator.operatorID,this.number,this.Name).toPromise().then(value => {
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
