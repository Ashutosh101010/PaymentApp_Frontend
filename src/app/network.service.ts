import { Injectable } from '@angular/core';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, first, retry, take} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
// import {Operator} from "./Model/Operator";
// import {Transaction} from "./Model/Transaction";
// import {TransactionResponse} from "./Model/TransactionResponse";
import {RegisterComponent} from "./register/register.component";
import {EmailValidator} from "@angular/forms";
import {JSONConstants} from "./Model/JSONHelper";
// import {UserResponse} from "./Model/UserResponse";
// import {TransactionHistoryResponse} from "./Model/TransactionHistoryResponse";

class ProfileResponse {
}

class RegisterResponse {
}



@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  baseUrl: string ="http://localhost:4041/api/operator";
  baseUrlUser: string ="http://localhost:4041/api/users";
  verifyTokenUrl: string =this.baseUrl+"/verifyToken";
  loginUrl: string =this.baseUrl+"/login";
  operatorUrl: string =this.baseUrl+"/fetchOperator";
  transactionUrl: string =this.baseUrl+"/getTransaction";
  registerUrl: string =this.baseUrlUser+"/create";
  profileUrl: string =this.baseUrlUser+"/getUserInfo";
  historyUrl: string =this.baseUrlUser+"/getTransactionHistory";
  verifySessionUrl: string =this.baseUrlUser+"/verifySession";
  stripePaymentUrl:string = this.baseUrl+"/stripePayment";
  paypalPaymentUrl:string = this.baseUrl+"/paypalPayment";
  checkoutUrl:string = this.baseUrl+"/checkout";
  private tokenId: any;




  constructor(private http:HttpClient,private  router: Router) {




  }


  verifyToken(token:string,operatorId:string,userId:string){


    let response = this.http.post(this.verifyTokenUrl,{"operatorID":operatorId,"token":token,"userID":userId}).pipe(catchError((err, caught) => {
     if(err instanceof HttpErrorResponse)
     {
       this.router.navigate(["/login"]);
       return EMPTY;
     }
      return caught;
    }));

    console.log(response);

    return response;
  }


  login(username:string,password:string,operatorId:string){
    let response=this.http.post(this.loginUrl,{"email":username,"password":password,"operatorID":operatorId}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        return EMPTY;
      }

   return caught;

    }));

    return response;
  }

  register(email: string, password: string, dob: string, operatorId: string, phoneNumber: string, Name: string, Lane: string, PostalCode: string, City: string, State: string, Country: string){
    let response=this.http.post(this.registerUrl,{"email":email,"password":password,"dob":dob,"operatorID":operatorId,"mobileNumber":phoneNumber,"name":Name,"Lane":Lane,"PostalCode":PostalCode,"City":City,"State":State,"Country":Country}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        return EMPTY;
      }

      return caught;

    }));

    return response;
  }
  profile(Name:string,email: string, phoneNumber: string){
    let response=this.http.post(this.profileUrl,{"name":Name,"email":email,"mobileNumber":phoneNumber}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        return EMPTY;
      }

      return caught;

    }));

    return response;
  }





  getOperators()
  {
    let response=this.http.get<any[]>(this.operatorUrl).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        return EMPTY;
      }
      return caught;
    }));

    return response;
  }


  getTransactions(userId:string,token:string,operatorId:string)

  {
    let response=this.http.post<any[]>(this.transactionUrl,{userId:userId,token:token,operatorID:operatorId}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        return EMPTY;
      }
      return caught;
    }));

    return response;
  }


  getUsers(userId:string,token:string,operatorId:string)
{
    let response=this.http.post<any[]>(this.profileUrl,{userId:userId,token:token,operatorID:operatorId}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {

        return EMPTY;

      }

      return caught;
    }));

    console.log(response);
    return response;
  }
  getTransactionHistory(userId:string,token:string,operatorId:string)
  {
    let response=this.http.post<any[]>(this.transactionUrl,{userId:userId,token:token,operatorID:operatorId}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {

        return EMPTY;
      }
      return caught;
    }));

    return response;
  }


  verifySession(token:string,operatorId:string,userId:string){


    let response = this.http.post(this.verifySessionUrl,{"operatorID":operatorId,"token":token,"userId":userId}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        this.router.navigate(["/login"]);
        return EMPTY;
      }
      return caught;
    }));

    console.log(response);

    return response;
  }

  stripePayment(name: string, total: any, Lane: any, PostalCode: any, City: any, State: any, Country: any, orderNumber: any, token: any, operatorId: string | null, userid: any, type: string, token1: any, card: any){

    console.log("request");
    console.log(orderNumber);
    this.tokenId = token.id
    console.log(JSON.stringify(token));

    let response = this.http.post(this.stripePaymentUrl,{"name":name,"amount":total,"Line1":Lane,"PostalCode":PostalCode,"City":City,"State":State,"Country":Country,"orderNumber":orderNumber,"stripeToken":token.id,"operatorId":operatorId,"userId":userid,"type":type,"token": token1,"card":card}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        // this.router.navigate(["/stripe-loader"]);
        return EMPTY;
      }
      return caught;
    }));

    console.log(response);

    return response;
  }
  paypalPayment(token: any,OperatorID:any,TotalAmount:any){


    console.log(token.id+" "+OperatorID+" "+TotalAmount);
    this.tokenId = token.id
    console.log(JSON.stringify(token));

    let response = this.http.post(this.paypalPaymentUrl,{"paypalToken":token.id,"operatorID":OperatorID,"totalAmount":TotalAmount}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {

        return EMPTY;
      }
      return caught;
    }));

    console.log(response);

    return response;
  }

  checkout(){

  let response = this.http.post(this.paypalPaymentUrl,{}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {

        return EMPTY;
      }
      return caught;
    }));

    console.log(response);

    return response;
  }
}
