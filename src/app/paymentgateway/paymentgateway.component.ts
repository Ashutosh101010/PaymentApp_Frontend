import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JSONConstants } from '../Model/JSONHelper';
import { PaypalPaymentComponent } from '../paypal-payment/paypal-payment.component';
import { StripePaymentComponent } from '../stripe-payment/stripe-payment.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {CheckoutComponent} from "../checkout/checkout.component";

@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.component.html',
  styleUrls: ['./paymentgateway.component.css']
})
export class PaymentgatewayComponent implements OnInit {

  amount:number=0;
  radioselect:number=0;
  orderNumber:any;
  constructor(public router:Router,public dialog:MatDialog,public activatedRoute: ActivatedRoute) { }

  radio1(){
    this.radioselect=1;
  }
  radio2(){
    this.radioselect=2;
  }
  radio3(){

  }
  radio4(){

  }
  openDialog(){

    if(this.radioselect==1)
    {
      let dialogref=this.dialog.open(CheckoutComponent,{
        disableClose:true,
        data: {totalAmount: this.amount,orderNumber: this.orderNumber},
      });
      dialogref.afterClosed().subscribe(result => {
        console.log(`dialog result: ${result}`);
      });
    }
    else if(this.radioselect==2)
    {
      let dialogref=this.dialog.open(PaypalPaymentComponent,{
        disableClose:true,
        data: {totalAmount: this.amount},
      });
      dialogref.afterClosed().subscribe(result => {
        console.log(`dialog result: ${result}`);
      });
    }
    else{
      console.log("a");
      alert("Please select a payment method");
    }
  }




  ngOnInit(): void {
    console.log(history.state);
    this.amount=history.state.amount;
    this.orderNumber=history.state.orderNumber;
    console.log(this.amount);
    console.log(this.orderNumber);
  }

}
