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
  _totalAmount: number;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: |undefined;
  constructor(
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StripePaymentComponent>,private networkService:NetworkService,private http:HttpClient,private router: Router
  ) {
    this._totalAmount = data['totalAmount'];
  }


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
    const {token, error} = await stripe.createToken(this.card);
    if (token) {
      this.onSuccess(token);
    } else {
      this.onError(error);
    }
  }
  async onSuccess(token:any) {
    await this.networkService.paymentStatus().subscribe(value => {
      this.data = JSON.parse(JSON.stringify(value));
    });
    this.dialogRef.close({token});
  }
  onError(error:any) {
    if (error.message) {
      this.cardError = error.message;
    }
  }

}
