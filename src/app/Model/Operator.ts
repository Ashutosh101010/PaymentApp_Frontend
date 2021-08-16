export class Operator{
  private _id:string|undefined;
  private _operatorID:string|undefined;
  private _name:string|undefined;


  get operatorID(): string | undefined {
    return this._operatorID;
  }

  set operatorID(value: string | undefined) {
    this._operatorID = value;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(value: string | undefined) {
    this._name = value;
  }
}
