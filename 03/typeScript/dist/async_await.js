const sleep = (seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("resolving");
            resolve(seconds);
        }, seconds * 1000);
    });
};
const runNoAwait = () => {
    console.log("antes de ejecutar sleep sin await");
    sleep(2)
        .then((value) => { });
    console.log("despues de ejecutar sleep sin await");
};
const runAwait = async () => {
    console.log("antes de ejecutar sleep con await");
    const value = await sleep(2);
    console.log("despues de ejecutar sleep con await");
    return value;
};
console.log(runNoAwait());
console.log(runAwait());
