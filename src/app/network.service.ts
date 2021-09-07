import { Injectable } from '@angular/core';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, first, retry, take} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "./Model/User";
import {Router} from "@angular/router";
import {Operator} from "./Model/Operator";
import {LoginResponse} from "./Model/LoginResponse";
import {Transaction} from "./Model/Transaction";
import {TransactionResponse} from "./Model/TransactionResponse";
import {RegisterComponent} from "./register/register.component";
import {EmailValidator} from "@angular/forms";
import {UserResponse} from "./Model/UserResponse";
import {TransactionHistoryResponse} from "./Model/TransactionHistoryResponse";

class ProfileResponse {
}

class RegisterResponse {
}



@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  baseUrl: string ="\n" + "http://192.168.1.19:4040/api/operator";
  baseUrlUser: string ="\n" + "http://192.168.1.19:4040/api/users";
  verifyTokenUrl: string =this.baseUrl+"/verifyToken";
  loginUrl: string =this.baseUrl+"/login";
  operatorUrl: string =this.baseUrl+"/fetchOperator";
  transactionUrl: string =this.baseUrl+"/getTransaction";
  registerUrl: string =this.baseUrlUser+"/create";
  profileUrl: string =this.baseUrlUser+"/getUserInfo";
  historyUrl: string =this.baseUrlUser+"/getTransactionHistory";




  constructor(private http:HttpClient,private  router: Router) {




  }


  verifyToken(token:string,operatorId:string): Observable<User>{


    let response = this.http.post<User>(this.verifyTokenUrl,{"operatorID":operatorId,"token":token}).pipe(catchError((err, caught) => {
     if(err instanceof HttpErrorResponse)
     {
       console.log("error");
       this.router.navigate(["/login"]);
       return EMPTY;
     }
      return caught;
    }));

    console.log(response);

    return response;
  }


  login(username:string,password:string,operatorId:string):Observable<LoginResponse>{
    let response=this.http.post<LoginResponse>(this.loginUrl,{"email":username,"password":password,"operatorID":operatorId}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        return EMPTY;
      }

   return caught;

    }));

    return response;
  }

  register(email: string,password: string, dob:string, operatorId: string, phoneNumber: string,Name:string):Observable<RegisterResponse>{
    let response=this.http.post<RegisterResponse>(this.registerUrl,{"email":email,"password":password,"dob":dob,"operatorID":operatorId,"mobileNumber":phoneNumber,"name":Name}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        return EMPTY;
      }

      return caught;

    }));

    return response;
  }
  profile(Name:string,email: string, phoneNumber: string):Observable<ProfileResponse>{
    let response=this.http.post<RegisterResponse>(this.profileUrl,{"name":Name,"email":email,"mobileNumber":phoneNumber}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        return EMPTY;
      }

      return caught;

    }));

    return response;
  }





  getOperators():Observable<Operator[]>
  {
    let response=this.http.get<Operator[]>(this.operatorUrl).pipe(catchError((err, caught) => {
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
    let response=this.http.post(this.transactionUrl,{userId:userId,token:token,operatorID:operatorId}).pipe(catchError((err, caught) => {
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
    let response=this.http.post(this.profileUrl,{userId:userId,token:token,operatorID:operatorId}).pipe(catchError((err, caught) => {
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
    let response=this.http.post(this.transactionUrl,{userId:userId,token:token,operatorID:operatorId}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        return EMPTY;
      }
      return caught;
    }));

    return response;
  }


}
