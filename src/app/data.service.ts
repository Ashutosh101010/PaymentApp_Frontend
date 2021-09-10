import { Injectable } from '@angular/core';
import {Transaction} from "./Model/Transaction";
// import {User} from "./Model/User";

class User {
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  history: string|undefined;

  constructor() { }

  private _transaction: Transaction[] | undefined;

  private _user : any | undefined;


  get transaction(): Transaction[] | undefined {
    return this._transaction;
  }

  set transaction(value: Transaction[] | undefined) {
    this._transaction = value;
  }

  get user(): User | undefined {
    return this._user;
  }

  set user(value: User | undefined) {
    this._user = value;
  }
}
