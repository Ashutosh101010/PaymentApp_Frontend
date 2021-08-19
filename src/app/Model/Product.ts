export class Product{

  private _quantity:number=-1
  private _productId: string | undefined;
  private _color: string | undefined;
  private _description: string | undefined;
  private _brand : string | undefined;
  private _timestamp: bigint | undefined;
  private _price: number | undefined;
  private _subTotal: number | undefined;
  private _name: number | undefined;
  private _images: String[]=[];


  get images(): String[] {
    return this._images;
  }

  set images(value: String[]) {
    this._images = value;
  }

  get name(): number | undefined {
    return this._name;
  }

  set name(value: number | undefined) {
    this._name = value;
  }

  get subTotal(): number | undefined {
    return this._subTotal;
  }

  set subTotal(value: number | undefined) {
    this._subTotal = value;
  }

  get price(): number | undefined {
    return this._price;
  }

  set price(value: number | undefined) {
    this._price = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get productId(): string | undefined {
    return this._productId;
  }

  set productId(value: string | undefined) {
    this._productId = value;
  }

  get color(): string | undefined {
    return this._color;
  }

  set color(value: string | undefined) {
    this._color = value;
  }

  get description(): string | undefined {
    return this._description;
  }

  set description(value: string | undefined) {
    this._description = value;
  }

  get brand(): string | undefined {
    return this._brand;
  }

  set brand(value: string | undefined) {
    this._brand = value;
  }

  get timestamp(): bigint | undefined {
    return this._timestamp;
  }

  set timestamp(value: bigint | undefined) {
    this._timestamp = value;
  }
}
