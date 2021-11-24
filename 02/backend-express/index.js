const express = require("express");
const bodyParser = require("body-parser"); //para utilizar body del request
const apiV1 = require('./routes/v1') //irá a buscar el archivo index.js de dicha carpeta

const PORT = 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); //habilita la lectura urlencoded
app.use(bodyParser.json()); //habilita json

apiV1.createRoutesV1(app);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<html><head><meta charset="utf8"/></head><body><p> Home 😁 </p></body></html>`
    );
});

app.get("/info", (req, res) => {
  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .send(JSON.stringify({ version: "1.0.0", appName: "Node JS" }));
});

app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  if (userName === "jsontype" && password === "password") {
    res.send("OK");
  } //se asigna automaticamente status 200}
  else{
    res.status(401).send('DENIED')
  }
});

app.use("*", (req, res) => {
  res.status(400).send("NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`Running on PORT: ${PORT}`);
});
