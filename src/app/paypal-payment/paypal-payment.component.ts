import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import * as importAll from  '../Model/JSONHelper';
import { JSONConstants } from '../Model/JSONHelper';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.component.html',
  styleUrls: ['./paypal-payment.component.css']
})
export class PaypalPaymentComponent implements OnInit {
  showSuccess: boolean | undefined;
  Lane=JSONConstants.OPERATOR_OBJECT_LANE_KEY;
  PostalCode=JSONConstants.OPERATOR_OBJECT_POSTALCODE_KEY;
  City=JSONConstants.OPERATOR_OBJECT_CITY_KEY;
  State=JSONConstants.OPERATOR_OBJECT_STATE_KEY;
  Country=JSONConstants.OPERATOR_OBJECT_COUNTRY_KEY;
  operatorid:any;
  closebutton:boolean=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private networkService:NetworkService,public router:Router,
  ) {

  }

  public payPalConfig?: IPayPalConfig;
    ngOnInit(): void {
      this.initConfig();
      console.log('hello');
      console.log(this.data);
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
              value: this.data.totalAmount,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.data.totalAmount
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
                  value: this.data.totalAmount,
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
        this.showSuccess = true;
        this.closebutton=true;
        this.operatorid =localStorage.getItem("operatorId");
        console.log("operatorid"+this.operatorid);
        await this.networkService.paypalPayment(data,this.operatorid,this.data.totalAmount).toPromise().then( (value => {
          console.log(value);
                // this.response = JSON.parse(JSON.stringify(value));
              }));

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
    }
    successClose(){
      if(this.closebutton==true){
        this.router.navigate(['dashboard']);
      }
    }
}
