class PersonGettersSetters {
  private _dni: string;
  private _name: string;
  private _age: number;

  constructor(data: { dni: string; name: string; age: number }) {
    const { dni, name, age } = data;
    (this._age = age), (this._dni = dni), (this._name = name);
  }

  public get age(): number {
    return this._age;
  }

  public set age(v: number) {
    this._age = v;
  }

  public get dni(): string {
    return this._dni;
  }

  public set dni(v: string) {
    this._dni = v;
  }

  public get name(): string {
    return this._name;
  }

  public set name(v: string) {      
    if (v.trim().length!==0) {
      this._name = v;
    } else {
     throw new Error("invalid name");
    }
  }
}

const userGettersSetters: PersonGettersSetters = new PersonGettersSetters({
  dni: "34789126",
  name: "juan",
  age: 31,
});

console.log(userGettersSetters);

userGettersSetters.age = 40;
userGettersSetters.name = "juan";
