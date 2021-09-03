import { Component, OnInit } from '@angular/core';
import {Transaction} from "../Model/Transaction";
import {User} from "../Model/User";
import {NetworkService} from "../network.service";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {Product} from "../Model/Product";
import {TransactionHIstory} from "../Model/TransactionHistory";

class history {
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private networkService:NetworkService,private dataService:DataService,private router:Router) { }

  Transactionhistorys : TransactionHIstory[] | undefined=[];
  ngOnInit(): void {

    // let history: history | undefined = this.dataService.history;
    // if (history != undefined) {
      // @ts-ignore
      this.networkService.getTransactionHistory("w2qe22344vfc435", "ABCD12345678abcd", "101").toPromise().then(value => {
        this.Transactionhistorys = value.transactions;
        console.log(this.Transactionhistorys);
      })
    }


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


}
