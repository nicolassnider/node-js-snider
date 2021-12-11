import express, { Application, Request, Response } from 'express';
import { urlencoded, json } from 'body-parser'; //para utilizar body del request
import { connect } from './db/connection';
import apiV1 from './routes/v1'; //irá a buscar el archivo index.js de dicha carpeta
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(urlencoded({ extended: false })); //habilita la lectura urlencoded
app.use(json()); //habilita json

apiV1(app);

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      `<html><head><meta charset="utf8"/></head><body><p> Home 😁 </p></body></html>`
    );
});

app.get('/info', (req, res) => {
  res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .send(
      JSON.stringify({
        version: '2.0.0',
        appName: 'Node JS, compilado typescript',
      })
    );
});

app.post('/login', (req, res) => {
  const { userName, password } = req.body;
  if (userName === 'jsontype' && password === 'password') {
    res.send('OK');
  } //se asigna automaticamente status 200}
  else {
    res.status(401).send('DENIED');
  }
});

app.use('*', (req, res) => {
  res.status(400).send('NOT FOUND');
});

connect().then((connected: boolean) => {
  if (connected) {
    app.listen(PORT, () => {
      console.log(`Running on PORT: ${PORT}`);
    });
  }
  else{
    console.log("error mongoDB")
  }
});