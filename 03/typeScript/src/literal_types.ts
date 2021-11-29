type Level = 'basic'|'intermediate'|'advanced';
type Price =0|4.99|9.99;

type Course = {
    name: string;
    price: Price;
    level: Level;
}

const nodejsCourse: Course = {
    name:"curso node",
    price: 4.99,
    level:'basic'
};

const createCourse = (name:string,level:string,price : Price): Course =>{
    const newCourse:Course = {
        name,
        price: price,
        level: level as Level,
    }
    return newCourse;
}