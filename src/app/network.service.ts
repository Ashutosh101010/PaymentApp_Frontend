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



@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  baseUrl: string ="http://192.168.1.7:4040/api/operator";
  verifyTokenUrl: string =this.baseUrl+"/verifyToken";
  loginUrl: string =this.baseUrl+"/login";
  operatorUrl: string =this.baseUrl+"/fetchOperator";
  transactionUrl: string =this.baseUrl+"/getTransaction";


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


  getTransactions(userId:string,token:string,operatorId:string):Observable<TransactionResponse>

  {
    let response=this.http.post<TransactionResponse>(this.transactionUrl,{userId:userId,token:token,operatorID:operatorId}).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse)
      {
        return EMPTY;
      }
      return caught;
    }));

    return response;
  }
}
