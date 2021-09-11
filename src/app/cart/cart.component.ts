import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
// import {Product} from "../Model/Product";
import {JSONConstants} from "../Model/JSONHelper";
import {jsDocComment} from "@angular/compiler";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  constructor(private route: Router)
  {
    let state=this.route.getCurrentNavigation()?.extras.state
    if (state!=undefined) {
      this.products = state.cart;
      this.total= state.total;
    }
    else {
      this.products=[];
    }
  }

  products:[];

  total=JSONConstants.USER_OBJECT_TOTAL_KEY;
  type=JSONConstants.TRANSACTION_OBJECT_TYPE_KEY;
  productId=JSONConstants.PRODUCT_OBJECT_PRODUCTID_KEY;
  price=JSONConstants.PRODUCT_OBJECT_PRICE_KEY;
  subTotal=JSONConstants.PRODUCT_OBJECT_SUBTOTAL_KEY;
  name=JSONConstants.PRODUCT_OBJECT_NAME_KEY;
  quantity=JSONConstants.PRODUCT_OBJECT_QUANTITY_KEY;

  ngOnInit(): void {
    if(this.products.length<=0)
    {
      this.route.navigate(["/login"])
    }
  }

}
