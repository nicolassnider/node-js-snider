class Vehicle {
  private _model: string;
  private _year: number;

  constructor(data: { model: string; year: number }) {
    const { model, year } = data;
    this._model = model;
    this._year = year;
  }

  public get model(): string {
    return this._model;
  }

  public set model(v: string) {
    this._model = v;
  }

  public get year(): number {
    return this._year;
  }

  public set year(v: number) {
    this._year = v;
  }
}

class Employee {
  private _id: number;
  private _name: string;
  private _vehicle: Vehicle | null;

  constructor(data: { id: number; name: string; vehicle: Vehicle | null }) {
    const { id, name, vehicle } = data;
    this._id = id;
    this._name = name;
    this._vehicle = vehicle;
  }

  public get id(): number {
    return this._id;
  }

  public set id(v: number) {
    this._id = v;
  }

  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }

  public get vehicle(): Vehicle {
    return this._vehicle;
  }

  public set vehicle(v: Vehicle) {
    this._vehicle = v;
  }
}

const getPrice =(normalPrice:number,discount:number =0):number =>{
  return normalPrice-normalPrice*discount/100;
}

const kia1 = new Vehicle({model:"auto",year:2001});

const dueno1= new Employee({id:333333,name:"nombrecito",vehicle:kia1});

const dueno2= new Employee({id:333333,name:"otroNombrecito",vehicle: null});

console.log(kia1);
console.log(dueno1);
console.log(dueno2);

console.log(`precio 400 con 20% descuento: ${getPrice(400,20)}`)
console.log(`precio 400 con sin descuento: ${getPrice(400)}`)