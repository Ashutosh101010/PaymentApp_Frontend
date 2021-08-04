import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NetworkService} from "../network.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private networkService:NetworkService,private router:Router) {


  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(value => {
      let token=value['token'];
      let operatorId=value['operatorId'];
      console.log(value);
  let response=this.networkService.verifyToken(token,operatorId).subscribe(user => {
    if(user.errorCode==0)
    {
console.log("success");
    // console.log(user.cart)
      this.router.navigate(['/cart'],{state:{cart:user.cart,total:user.total}});
    }
    else{
      console.log("fail");
      this.router.navigate(['/login']);

    }
  })




    })
  }


}
