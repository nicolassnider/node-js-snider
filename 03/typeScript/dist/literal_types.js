const nodejsCourse = {
    name: "curso node",
    price: 4.99,
    level: 'basic'
};
const createCourse = (name, level, price) => {
    const newCourse = {
        name,
        price: price,
        level: level,
    };
    return newCourse;
};
