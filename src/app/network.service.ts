import { Injectable } from '@angular/core';
import {EMPTY, Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "./Model/User";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  baseUrl: string ="http://192.168.1.12:4040/api/operator";
  verifyTokenUrl: string =this.baseUrl+"/verifyToken";


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
}
