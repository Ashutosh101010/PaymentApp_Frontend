import {Product} from "./Product";

export class Transaction{
  private _amount:number=0;
  private _orderNumber:string | undefined;
  private _status:string | undefined;
  private _statusCode:number=-1;
  private _date: number|undefined;
  private _type:string | undefined;
  private _cart:Product[]=[];


  get cart(): Product[] {
    return this._cart;
  }

  set cart(value: Product[]) {
    this._cart = value;
  }

  get type(): string | undefined {
    return this._type;
  }

  set type(value: string | undefined) {
    this._type = value;
  }

  get date(): number | undefined {
    return this._date;
  }

  set date(value: number | undefined) {
    this._date = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get orderNumber(): string | undefined {
    return this._orderNumber;
  }

  set orderNumber(value: string | undefined) {
    this._orderNumber = value;
  }

  get status(): string | undefined {
    return this._status;
  }

  set status(value: string | undefined) {
    this._status = value;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  set statusCode(value: number) {
    this._statusCode = value;
  }
}
