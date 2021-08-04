import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Product} from "../Model/Product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  constructor(private route: Router) {
    let state=this.route.getCurrentNavigation()?.extras.state
    if (state!=undefined) {
      this.products = state.cart;
      this.total= state.total;
    }
    else {
      this.products=[];
    }
  }
total=0;
 products:Product[];

  ngOnInit(): void {
    if(this.products.length<=0)
    {
      this.route.navigate(["/login"])
    }
  }

}
