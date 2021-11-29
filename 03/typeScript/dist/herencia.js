//no puede ser instanciada
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    toString() {
        return `name: ${this.name}, age: ${this.age}`;
    }
}
class Mammal extends Animal {
    constructor(data) {
        const { name, age, canSwim } = data;
        super(name, age);
        this.canSwim = canSwim;
    }
}
class Bird extends Animal {
    constructor(data) {
        const { name, age, canFly } = data;
        super(name, age);
        this.canFly = canFly;
    }
    fly() {
        console.log(`${this.name} used fly`);
    }
}
//const dog= new Animal("Perro",2);
//console.log(dog.toString())
const mammal = new Mammal({ name: "mamífero", age: 3, canSwim: false });
console.log(mammal.toString());
const bird = new Bird({ name: "ave", age: 5, canFly: true });
console.log(bird.toString());
bird.fly();
