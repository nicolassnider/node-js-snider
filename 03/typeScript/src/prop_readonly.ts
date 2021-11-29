class Person1 {
  readonly dni: string;
  name: string;
  age: number;

  constructor(data: { 
      dni: string; 
      name: string; 
      age: number }) {
      const{dni,name,age} = data;
      this.age=age,
      this.dni=dni,
      this.name=name
  }
}

const userPropReadonly:Person1 =new Person1({dni:'34789126', name:'juan',age:31})

console.log(userPropReadonly);

userPropReadonly.age=40;
userPropReadonly.name="pedro";
//user.dni="123123123" #propiedad readonly