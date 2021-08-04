import {Product} from "./Product";

export class User{
  private _errorCode:number=-1
  private _status:boolean=false
  private _total:number=0;
  private _cart:Product[]=[];


  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get cart(): Product[] {
    return this._cart;
  }

  set cart(value: Product[]) {
    this._cart = value;
  }

  get status(): boolean {
    return this._status;
  }

  set status(value: boolean) {
    this._status = value;
  }

  get errorCode(): number {
    return this._errorCode;
  }

  set errorCode(value: number) {
    this._errorCode = value;
  }


}
