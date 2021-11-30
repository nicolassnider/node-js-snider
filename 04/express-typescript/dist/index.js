"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser")); //para utilizar body del request
const v1_1 = __importDefault(require("./routes/v1")); //irá a buscar el archivo index.js de dicha carpeta
const PORT = 5000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false })); //habilita la lectura urlencoded
app.use(body_parser_1.default.json()); //habilita json
(0, v1_1.default)(app);
app.get("/", (req, res) => {
    res
        .status(200)
        .send(`<html><head><meta charset="utf8"/></head><body><p> Home 😁 </p></body></html>`);
});
app.get("/info", (req, res) => {
    res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .send(JSON.stringify({ version: "2.0.0", appName: "Node JS, compilado typescript" }));
});
app.post("/login", (req, res) => {
    const { userName, password } = req.body;
    if (userName === "jsontype" && password === "password") {
        res.send("OK");
    } //se asigna automaticamente status 200}
    else {
        res.status(401).send('DENIED');
    }
});
app.use("*", (req, res) => {
    res.status(400).send("NOT FOUND");
});
app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`);
});
