class Vehicle {
    constructor(data) {
        const { model, year } = data;
        this._model = model;
        this._year = year;
    }
    get model() {
        return this._model;
    }
    set model(v) {
        this._model = v;
    }
    get year() {
        return this._year;
    }
    set year(v) {
        this._year = v;
    }
}
class Employee {
    constructor(data) {
        const { id, name, vehicle } = data;
        this._id = id;
        this._name = name;
        this._vehicle = vehicle;
    }
    get id() {
        return this._id;
    }
    set id(v) {
        this._id = v;
    }
    get name() {
        return this._name;
    }
    set name(v) {
        this._name = v;
    }
    get vehicle() {
        return this._vehicle;
    }
    set vehicle(v) {
        this._vehicle = v;
    }
}
const getPrice = (normalPrice, discount = 0) => {
    return normalPrice - normalPrice * discount / 100;
};
const kia1 = new Vehicle({ model: "auto", year: 2001 });
const dueno1 = new Employee({ id: 333333, name: "nombrecito", vehicle: kia1 });
const dueno2 = new Employee({ id: 333333, name: "otroNombrecito", vehicle: null });
console.log(kia1);
console.log(dueno1);
console.log(dueno2);
console.log(`precio 400 con 20% descuento: ${getPrice(400, 20)}`);
console.log(`precio 400 con sin descuento: ${getPrice(400)}`);
