class PersonGettersSetters {
    constructor(data) {
        const { dni, name, age } = data;
        (this._age = age), (this._dni = dni), (this._name = name);
    }
    get age() {
        return this._age;
    }
    set age(v) {
        this._age = v;
    }
    get dni() {
        return this._dni;
    }
    set dni(v) {
        this._dni = v;
    }
    get name() {
        return this._name;
    }
    set name(v) {
        if (v.trim().length !== 0) {
            this._name = v;
        }
        else {
            throw new Error("invalid name");
        }
    }
}
const userGettersSetters = new PersonGettersSetters({
    dni: "34789126",
    name: "juan",
    age: 31,
});
console.log(userGettersSetters);
userGettersSetters.age = 40;
userGettersSetters.name = "juan";
