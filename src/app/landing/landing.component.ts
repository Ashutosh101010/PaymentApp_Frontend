import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NetworkService} from "../network.service";
import {JSONConstants} from "../Model/JSONHelper";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  token=JSONConstants.USER_OBJECT_TOKEN_KEY;
  operatorId=JSONConstants.USER_OBJECT_OPERATORID_KEY;
  errorCode=JSONConstants.ERROR_CODE_KEY;
  number=JSONConstants.ERROR_CODE_LOGIN_SUCCESS;
  cart=JSONConstants.TRANSACTION_OBJECT_CART_KEY;
  total=JSONConstants.USER_OBJECT_TOTAL_KEY;



  constructor(private activatedRoute: ActivatedRoute,private networkService:NetworkService,private router:Router) {


  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(value => {
      let token=value['token'];
      let operatorId=value['operatorId'];
      console.log(value);
  let response:any=this.networkService.verifyToken(token,operatorId).subscribe(user => {
    if (response[JSONConstants.ERROR_CODE_KEY]==0)
    {
console.log("success");
    // console.log(user.cart)
      this.router.navigate(['/cart'],{state:{cart:this.cart,total:this.total}});
    }
    else{
      console.log("fail");
      this.router.navigate(['/login']);

    }
  })




    })
  }


}
