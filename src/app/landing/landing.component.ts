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
      let operatorId=value[JSONConstants.OPERATOR_OBJECT_OPERATORID_KEY];
      let userId=value[JSONConstants.USER_OBJECT_USERID_KEY];
      console.log(value,token,operatorId,userId);
  this.networkService.verifyToken(token,operatorId,userId).subscribe(data => {
    let response:any=data;
    if (response[JSONConstants.ERROR_CODE_KEY]==0)
    {
console.log("success");
    // console.log(user.cart)
      this.router.navigate(['/cart'],{state:{cart:response[JSONConstants.TRANSACTION_OBJECT_CART_KEY],ordernumber:response[JSONConstants.TRANSACTION_OBJECT_ORDERNUMBER_KEY],token:token,total:4000,userId:userId,operatorId:operatorId}});
    }
    else{
      console.log("fail");
      this.router.navigate(['/login']);

    }
  })




    })
  }


}
