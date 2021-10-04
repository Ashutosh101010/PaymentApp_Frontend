import { Component, OnInit } from '@angular/core';
// import {Router} from "@angular/router";
// import {Product} from "../Model/Product";
import {JSONConstants} from "../Model/JSONHelper";
import {jsDocComment} from "@angular/compiler";
import {StripePaymentComponent} from "../stripe-payment/stripe-payment.component";
// import { Component, OnInit } from '@angular/core';
// import {Transaction} from "../Model/Transaction";
// import {User} from "../Model/User";
import {NetworkService} from "../network.service";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
// import {Product} from "../Model/Product";
import {style} from "@angular/animations";
import {window} from "ngx-bootstrap/utils";
// import {JSONConstants} from "../Model/JSONHelper";
import { MatDialog } from '@angular/material/dialog';
// import {StripePaymentComponent} from "../stripe-payment/stripe-payment.component";
// import {CheckoutComponent} from "../checkout/checkout.component";
// import { OtpcheckComponent } from '../otpcheck/otpcheck.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private userId: any;
  private operatorId: any;


  constructor(private route: Router,private networkService:NetworkService,private dataService:DataService,private router:Router,public dialog:MatDialog)
  {
    let state=this.route.getCurrentNavigation()?.extras.state
    if (state!=undefined) {
      this.products = state.cart;
      this.total= state.total;
      console.log(this.products);
      this.products = state.cart;
      this.userId = state.cart;
      this.products = state.cart;
      this.operatorId = state.cart;
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
  transactions : []=[];
  id=JSONConstants.HISTORY_OBJECT_ORDERNUMBER_KEY;
  // type=JSONConstants.TRANSACTION_OBJECT_TYPE_KEY;
  date=JSONConstants.TRANSACTION_OBJECT_DATE_KEY;
  amount=JSONConstants.TRANSACTION_OBJECT_AMOUNT_KEY;
  // price=JSONConstants.TRANSACTION_OBJECT_AMOUNT_KEY;
  brand=JSONConstants.PRODUCT_OBJECT_BRAND_KEY;
  // name=JSONConstants.PRODUCT_OBJECT_NAME_KEY;
  images=JSONConstants.PRODUCT_OBJECT_IMAGES_KEY;
  orderNumber:any;
  cart=JSONConstants.TRANSACTION_OBJECT_CART_KEY;
  // price=JSONConstants.PRODUCT_OBJECT_PRICE_KEY;
  // quantity=JSONConstants.PRODUCT_OBJECT_QUANTITY_KEY;

  ngOnInit(): void {
    // if(this.products.length<=0)
    // {
    //   this.route.navigate(["/login"])
    // }
    console.log(history.state);
    this.userId=history.state.userId;
    this.operatorId=history.state.operatorId;
    this.amount=history.state.total;
    this.orderNumber=history.state.ordernumber;
  }
  checkout(transaction:any) {

    const dialogRef = this.dialog.open(StripePaymentComponent, {
      height: '700px',
      width: '1000px',
      // opening dialog here which will give us back stripeToken
      data: {total: transaction[this.amount],orderNumber:transaction[this.orderNumber],name:transaction[this.name],type:transaction[this.type],userId:transaction[this.userId],operatorId:transaction[this.operatorId]},
    });
    dialogRef.afterClosed()
      // waiting for stripe token that will be given back
      .subscribe((result: any) => {
        if (result) {
          this.createOrder(result.token.id);
        }
      });
  }
  goToPayment(transaction:any){
    this.router.navigateByUrl('/paymentgateway', { state: { id:5 , name:'Angular',amount:this.amount,orderNumber: this.orderNumber,userId: this.userId,operatorId: this.operatorId} });
  }
  private createOrder(token: string) {

  }

}
