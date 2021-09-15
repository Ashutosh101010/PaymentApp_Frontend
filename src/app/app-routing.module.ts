import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "./cart/cart.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {LandingComponent} from "./landing/landing.component";
import {RegisterComponent} from "./register/register.component";
import {TransictionComponent} from "./transiction/transiction.component";
import {ProfileComponent} from "./profile/profile.component";
import {HistoryComponent} from "./history/history.component";
import {StripePaymentComponent} from "./stripe-payment/stripe-payment.component";
// import {AuthGuard} from "./auth.guard";


const routes: Routes = [{path:'cart',component:CartComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'transition',component:TransictionComponent},
  {path:'landing',component:LandingComponent},
  {path:'profile',component:ProfileComponent},
  {path:'history',component:HistoryComponent},
  {path:'stripe-payment',component:StripePaymentComponent},
  {path:'**',redirectTo:'/login',pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent,LoginComponent]
