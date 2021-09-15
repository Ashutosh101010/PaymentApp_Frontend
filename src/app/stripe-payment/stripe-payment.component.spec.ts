import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePaymentComponent } from './stripe-payment.component';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

describe('StripePaymentComponent', () => {
  let component: StripePaymentComponent;
  let fixture: ComponentFixture<StripePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripePaymentComponent ],
      providers : [
        {provide : MAT_DIALOG_DATA, useValue : {}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
