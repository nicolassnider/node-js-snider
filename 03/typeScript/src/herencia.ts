//no puede ser instanciada
abstract class Animal{
    name: string;
    age: number;
    constructor(name:string, age:number){
        this.name=name;
        this.age=age;
    }

    toString():string{
        return `name: ${this.name}, age: ${this.age}`
    }
}

class Mammal extends Animal{
    canSwim:boolean;
    constructor(data:{name:string,age:number,canSwim:boolean})
    {
        const {name,age,canSwim} = data;
        super(name,age);
        this.canSwim=canSwim;
    }

}

class Bird extends Animal{
    canFly:boolean;
    constructor(data:{name:string, age:number, canFly:boolean}){
        const {name,age,canFly} = data;
        super(name,age)
        this.canFly=canFly;
    }

    fly(){
        console.log(`${this.name} used fly`)
    }
    

}

//const dog= new Animal("Perro",2);
//console.log(dog.toString())

const mammal = new Mammal({name:"mamífero",age:3,canSwim:false});
console.log(mammal.toString())

const bird = new Bird({name:"ave",age:5,canFly:true});
console.log(bird.toString())
bird.fly()