// import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
// import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NetworkService} from "../network.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

import {operators} from "rxjs/internal/Rx";
// import {Operator} from "../Model/Operator";

import {Router} from "@angular/router";
import {window} from "ngx-bootstrap/utils";
import {JSONConstants} from "../Model/JSONHelper";


@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})


export class StripePaymentComponent implements OnDestroy, AfterViewInit {
  @ViewChild('cardInfo') cardInfo: ElementRef|undefined;
  // amount: number ;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: |undefined;

  message = "Waiting for purchase to complete...";
  // amount = JSONConstants.USER_OBJECT_TOTAL_KEY;
  waiting = false;
  success = false;
  private checkout: any;
  private response: any;
  constructor(

    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StripePaymentComponent>,private networkService:NetworkService,private http:HttpClient,private router: Router)

  {{
    this.orderNo= data.orderNo;
    this.name=data.name;
    this.total= data.totalAmount;
    let state=this.router.getCurrentNavigation()?.extras.state
    if (state!=undefined) {
      this.products = state.cart;
      this.total= state.total;
      console.log(this.products);
      this.transactions = state.cart;
      this.orderNo=state.orderNo;
      console.log(this.transactions);
      this.transactions=state.cart;
      this.name=state.name;
      console.log(this.transactions);
    }

    else {
      this.products=[];
      this.transactions=[];
    }
  }}
  products:[];

  total=JSONConstants.USER_OBJECT_TOTAL_KEY;
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
  orderNo=JSONConstants.TRANSACTION_OBJECT_ORDERNUMBER_KEY;
  cart=JSONConstants.TRANSACTION_OBJECT_CART_KEY;
  Lane=JSONConstants.OPERATOR_OBJECT_LANE_KEY;
  PostalCode=JSONConstants.OPERATOR_OBJECT_POSTALCODE_KEY;
  City=JSONConstants.OPERATOR_OBJECT_CITY_KEY;
  State=JSONConstants.OPERATOR_OBJECT_STATE_KEY;
  Country=JSONConstants.OPERATOR_OBJECT_COUNTRY_KEY
  // price=JSONConstants.PRODUCT_OBJECT_PRICE_KEY;
  // quantity=JSONConstants.PRODUCT_OBJECT_QUANTITY_KEY;

  // Transactionhistorys: [] | undefined = [];
  transaction: any|undefined;


  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }
  ngAfterViewInit() {
    this.initiateCardElement();
  }
  initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    this.card = elements.create('card', {cardStyle});
    if (this.cardInfo) {
      this.card.mount(this.cardInfo.nativeElement);
    }
    this.card.addEventListener('change', this.cardHandler);
  }

  onChange({error}:{error:any}) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = undefined;
    }
    this.cd.detectChanges();
  }
  async createStripeToken() {
    this.waiting=true;
    const {token, error} = await stripe.createToken(this.card);
    if (token) {
      this.onSuccess(token);
      (
          () => {
            console.log("success");

          })
    } else {
      console.log("error");
      this.waiting = false;
      this.onError(error);
    }
  }

 async onSuccess(token:any) {
    this.waiting = false;
    this.success = true;


   await this.networkService.stripePayment(token,this.Lane,this.total,this.name,this.orderNo,this.PostalCode,this.City,this.State,this.Country).toPromise().then( (value => {
console.log(value);
      // this.response = JSON.parse(JSON.stringify(value));
    }));
    // await this.networkService.paymentStatus().subscribe(value => {
    //   this.data = JSON.parse(JSON.stringify(value));
    //
    // });
    // this.dialogRef.close({token});
  }
  onError(error:any) {
    this.dialogRef.close();
    if (error.message) {
      this.cardError = error.message;
    }

  }


}
