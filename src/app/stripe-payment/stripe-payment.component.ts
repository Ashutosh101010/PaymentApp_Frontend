import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NetworkService} from "../network.service";
import {Router} from "@angular/router";
import {JSONConstants} from "../Model/JSONHelper";
import { HttpClient } from '@angular/common/http';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})


export class StripePaymentComponent implements OnInit {
  private userId: any;

  constructor(
    private dialogRef: MatDialogRef<StripePaymentComponent>,private networkService:NetworkService,public router:Router,private https: HttpClient,private stripeService: StripeService,
    @Inject(MAT_DIALOG_DATA) public data: any,){
      console.log(this.data);
      // {
      //   this.total= data.totalAmount;
      //   let state=this.router.getCurrentNavigation()?.extras.state
      //   if (state!=undefined) {
      //     // this.products = state.cart;
      //     this.total= state.total;
      //     // console.log(this.products);
      //   }
      //
      // }
    }


  total=this.data.totalAmount;
  type=JSONConstants.TRANSACTION_OBJECT_TYPE_KEY;
  productId=JSONConstants.PRODUCT_OBJECT_PRODUCTID_KEY;
  price=JSONConstants.PRODUCT_OBJECT_PRICE_KEY;
  subTotal=JSONConstants.PRODUCT_OBJECT_SUBTOTAL_KEY;
  name=JSONConstants.PRODUCT_OBJECT_NAME_KEY;
  quantity=JSONConstants.PRODUCT_OBJECT_QUANTITY_KEY;
  transactions : []=[];
  id=JSONConstants.HISTORY_OBJECT_ORDERNUMBER_KEY;
  // type=JSONConstants.TRANSACTION_OBJECT_TYPE_KEY;
  date=JSONConstants.TRANSACTION_OBJECT_DATE_KEY;
  // amount=JSONConstants.TRANSACTION_OBJECT_AMOUNT_KEY;
  // price=JSONConstants.TRANSACTION_OBJECT_AMOUNT_KEY;
  brand=JSONConstants.PRODUCT_OBJECT_BRAND_KEY;
  // name=JSONConstants.PRODUCT_OBJECT_NAME_KEY;
  images=JSONConstants.PRODUCT_OBJECT_IMAGES_KEY;
  orderNumber=this.data.orderNumber;
  cart=JSONConstants.TRANSACTION_OBJECT_CART_KEY;
  Lane=JSONConstants.OPERATOR_OBJECT_LANE_KEY;
  PostalCode=JSONConstants.OPERATOR_OBJECT_POSTALCODE_KEY;
  City=JSONConstants.OPERATOR_OBJECT_CITY_KEY;
  State=JSONConstants.OPERATOR_OBJECT_STATE_KEY;
  Country=JSONConstants.OPERATOR_OBJECT_COUNTRY_KEY
  // price=JSONConstants.PRODUCT_OBJECT_PRICE_KEY;

  // quantity=JSONConstants.PRODUCT_OBJECT_QUANTITY_KEY;
  operatorId = localStorage.getItem("operatorId");
  // Transactionhistorys: [] | undefined = [];
  transaction: any|undefined;
    // userid : any;

  checkout() {
    // Check the server.js tab to see an example implementation
    this.userId =localStorage.getItem("userId");

    this.https.post('http://localhost:4041/api/operator/create-checkout-session', {"name":this.name,"amount":this.total,"orderNumber":this.orderNumber,"operatorId":this.operatorId,"userId":this.userId})
      .pipe(
        switchMap(session => {
          let sess:any=session;
          console.log(session);

          return this.stripeService.redirectToCheckout({ sessionId: sess.id });
        })
      )
      .subscribe(result => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        if (result.error) {
          alert(result.error.message);
        }
      });
  }

    ngOnInit(){

    }
}
