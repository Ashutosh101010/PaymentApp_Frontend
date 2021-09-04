import { Component, OnInit } from '@angular/core';
import {Transaction} from "../Model/Transaction";
import {User} from "../Model/User";
import {NetworkService} from "../network.service";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {Product} from "../Model/Product";
import {style} from "@angular/animations";
import {window} from "ngx-bootstrap/utils";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private networkService:NetworkService,private dataService:DataService,private router:Router) { }
  transactions : Transaction[]=[];


  width=window.innerWidth;
  ngOnInit(): void {
    this.width=window.innerWidth;

    // let user: User | undefined = this.dataService.user;
    // if (user != undefined) {
      // @ts-ignore
      this.networkService.getTransactions("w2qe22344vfc435", "ABCD12345678abcd", "101").toPromise().then(value => {
        this.transactions = value.transactions;
        console.log(this.transactions[0].cart);
        //
      })
 }
    // else{
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



}
