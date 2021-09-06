import { Component, OnInit } from '@angular/core';
import {NetworkService} from "../network.service";
import {DataService} from "../data.service";
import {User} from "../Model/User";
import {Transaction} from "../Model/Transaction";
import {Router} from "@angular/router";
import {TransactionHIstory} from "../Model/TransactionHistory";
import {JSONConstants} from "../Model/JSONHelper";
import {window} from "ngx-bootstrap/utils";

@Component({
  selector: 'app-transiction',
  templateUrl: 'transiction.component.html',
  styleUrls: ['transiction.component.css']
})
export class TransictionComponent implements OnInit {

  constructor(private networkService:NetworkService,private dataService:DataService,private router:Router) { }





  orderNumber=JSONConstants.TRANSACTION_OBJECT_ORDERNUMBER_KEY;
  type=JSONConstants.TRANSACTION_OBJECT_TYPE_KEY;
  date=JSONConstants.TRANSACTION_OBJECT_DATE_KEY;
  amount=JSONConstants.TRANSACTION_OBJECT_AMOUNT_KEY;
  Transactions : [] | undefined=[];
  width=window.innerWidth;
  transaction: any;

  ngOnInit(): void {
    this.width=window.innerWidth;
    this.networkService.getTransactions("w2qe22344vfc435", "ABCD12345678abcd", "101").toPromise().then(value => {

      this.Transactions=JSON.parse(JSON.stringify(value))[JSONConstants.TRANSACTION_HISTORY_OBJECT_ARRAY_KEY];
      console.log("value-------------"+JSON.parse(JSON.stringify(value))[JSONConstants.ERROR_CODE_KEY]);
    })
  }




}
