const sleep = (seconds: number): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      console.log("resolving");
      resolve(seconds);
    }, seconds * 1000);
  });
};

const runNoAwait = () => {
  console.log("antes de ejecutar sleep sin await");
  sleep(2)
  .then((value)=>{});
  console.log("despues de ejecutar sleep sin await");
};

const runAwait = async (): Promise<number> => {
  console.log("antes de ejecutar sleep con await");
  const value:number = await sleep(2);
  console.log("despues de ejecutar sleep con await");
  return value;
};

console.log(runNoAwait());
console.log(runAwait());
