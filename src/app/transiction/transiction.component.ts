import { Component, OnInit } from '@angular/core';
import {NetworkService} from "../network.service";
import {DataService} from "../data.service";
import {User} from "../Model/User";
import {Transaction} from "../Model/Transaction";
import {Router} from "@angular/router";
import {TransactionHIstory} from "../Model/TransactionHistory";

@Component({
  selector: 'app-transiction',
  templateUrl: './transiction.component.html',
  styleUrls: ['./transiction.component.css']
})
export class TransictionComponent implements OnInit {

  constructor(private networkService:NetworkService,private dataService:DataService,private router:Router) { }

  transactions : Transaction[]=[];
  ngOnInit(): void {

    let user: User | undefined = this.dataService.user;
    if (user != undefined) {
      // @ts-ignore
      this.networkService.getTransactions(user.userId, user.token, user.operatorId).toPromise().then(value => {
        this.transactions = value.transactions;
      })
    }
    else{
      this.router.navigate(['/login']);
    }

  }





}
