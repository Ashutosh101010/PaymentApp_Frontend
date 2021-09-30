import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

import { StripeService } from 'ngx-stripe';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private https: HttpClient,
              private stripeService: StripeService) { }

  ngOnInit(): void {
  }
  checkout() {
    // Check the server.js tab to see an example implementation
    this.https.post('/create-checkout-session', {})
      .pipe(
        switchMap(session => {
          let sess:any=session;
          return this.stripeService.redirectToCheckout({ sessionId: sess.id })
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
}
