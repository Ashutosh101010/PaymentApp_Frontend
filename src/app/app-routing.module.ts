import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "./cart/cart.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {LandingComponent} from "./landing/landing.component";
import {RegisterComponent} from "./register/register.component";
import {TransictionComponent} from "./transiction/transiction.component";

const routes: Routes = [{path:'cart',component:CartComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'transition',component:TransictionComponent},
  {path:'landing',component:LandingComponent},
  {path:'**',redirectTo:'/login',pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
