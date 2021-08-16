import { Component, OnInit } from '@angular/core';
import {Transaction} from "../Model/Transaction";
import {User} from "../Model/User";
import {NetworkService} from "../network.service";
import {DataService} from "../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
      // this.router.navigate(['/login']);
    }
  }

}
