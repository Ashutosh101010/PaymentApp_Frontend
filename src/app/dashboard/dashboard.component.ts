import { Component, OnInit } from '@angular/core';
// import {Transaction} from "../Model/Transaction";
// import {User} from "../Model/User";
import {NetworkService} from "../network.service";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
// import {Product} from "../Model/Product";
import {style} from "@angular/animations";
import {window} from "ngx-bootstrap/utils";
import {JSONConstants} from "../Model/JSONHelper";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private networkService:NetworkService,private dataService:DataService,private router:Router) { }
  transactions : []=[];
  id=JSONConstants.HISTORY_OBJECT_ORDERNUMBER_KEY;
  type=JSONConstants.TRANSACTION_OBJECT_TYPE_KEY;
  date=JSONConstants.TRANSACTION_OBJECT_DATE_KEY;
  amount=JSONConstants.TRANSACTION_OBJECT_AMOUNT_KEY;
  // price=JSONConstants.TRANSACTION_OBJECT_AMOUNT_KEY;
  brand=JSONConstants.PRODUCT_OBJECT_BRAND_KEY;
  name=JSONConstants.PRODUCT_OBJECT_NAME_KEY;
  images=JSONConstants.PRODUCT_OBJECT_IMAGES_KEY;
  orderNumber=JSONConstants.TRANSACTION_OBJECT_ORDERNUMBER_KEY;
  cart=JSONConstants.TRANSACTION_OBJECT_CART_KEY;
  price=JSONConstants.PRODUCT_OBJECT_PRICE_KEY;
  quantity=JSONConstants.PRODUCT_OBJECT_QUANTITY_KEY;


  // Transactionhistorys : [] | undefined=[];
  width=window.innerWidth;
   ngOnInit() {

    let userId = localStorage.getItem("userId");
    let token = localStorage.getItem("token");
    let operatorId = localStorage.getItem("operatorId");
    let response:any;
    if (userId == null || userId == "" || token == null || token == "" || operatorId == null || operatorId == "") {
      this.router.navigate(['/login']);
    }
    else {
        this.networkService.verifySession(token,operatorId,userId).subscribe(user => {
         response=user;
        console.log(response[JSONConstants.ERROR_CODE_KEY]);
        if (response[JSONConstants.ERROR_CODE_KEY] != 0) {
          this.router.navigate(['/login']);
        }
this.getTransaction();
      });

      this.width = window.innerWidth;    // let history: history | undefined = this.dataService.history;

    }
  }

  getTransaction(){

    this.networkService.getTransactions("w2qe22344vfc435", "ABCD12345678abcd", "101").toPromise().then(value => {

      this.transactions = JSON.parse(JSON.stringify(value))[JSONConstants.TRANSACTION_HISTORY_OBJECT_ARRAY_KEY];
      console.log("value-------------" + JSON.parse(JSON.stringify(value))[JSONConstants.TRANSACTION_HISTORY_OBJECT_ARRAY_KEY]);
    })
  }

 //
 //  width=window.innerWidth;
 //  ngOnInit(): void {
 //    this.width=window.innerWidth;
 //
 //    // let user: User | undefined = this.dataService.user;
 //    // if (user != undefined) {
 //      // @ts-ignore
 //      this.networkService.getTransactions("w2qe22344vfc435", "ABCD12345678abcd", "101").toPromise().then(value => {
 //        this.transactions = value.transactions;
 //        console.log(this.transactions[0].cart);
 //        //
 //      })
 // }
 //    // else{
      // this.router.navigate(['/login']);
    // }
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
