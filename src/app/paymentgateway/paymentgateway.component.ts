import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { JSONConstants } from '../Model/JSONHelper';
import { PaypalPaymentComponent } from '../paypal-payment/paypal-payment.component';
import { StripePaymentComponent } from '../stripe-payment/stripe-payment.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {HttpClient} from "@angular/common/http";
import {StripeService} from "ngx-stripe";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import { NetworkService } from '../network.service';
// import {CheckoutComponent} from "../checkout/checkout.component";

@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.component.html',
  styleUrls: ['./paymentgateway.component.css']
})
export class PaymentgatewayComponent implements OnInit {
  id:any;
  userId:any;
  amount:number=0;
  totalAmount:any;
  orderNumber:any;
  operatorId:any;
  name:any;
  navigationId:any;
  constructor(public router:Router,public dialog:MatDialog,public activatedRoute: ActivatedRoute,private https:HttpClient,private stripeService: StripeService,public networkService:NetworkService) {

  }
  public payPalConfig ? : IPayPalConfig;


  checkout() {


    this.https.post('http://localhost:4041/api/operator/create-checkout-session', {"name":this.name,"amount":this.amount,"orderNumber":this.orderNumber,"operatorId":this.operatorId,"userId":this.userId})
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



  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.totalAmount,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.totalAmount
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: this.totalAmount,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: async (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        await this.networkService.paypalPayment(data,this.operatorId,this.totalAmount).toPromise().then( (value => {
          console.log("this is after succes",value,"this is after succes");
          this.router.navigate(['success']);
          // this.response = JSON.parse(JSON.stringify(value));
        }));

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.router.navigate(['cancel ']);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }






  ngOnInit(): void {
    this.initConfig();
    console.log(history.state);
    this.id=history.state.id;
    this.amount=history.state.amount;
    this.totalAmount=history.state.amount;
    this.name=history.state.name;
    this.navigationId=history.state.navigationId;
    this.orderNumber=history.state.orderNumber;
    this.operatorId=history.state.operatorId;
    this.userId=history.state.userId;
    console.log(this.operatorId);
  }

}
