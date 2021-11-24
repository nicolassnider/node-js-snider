const http = require("http");
const { default: phone } = require("phone");
const url = require("url");

const server = http.createServer(function (req, res) {
  const urlData = url.parse(req.url, true);
  const path = urlData.pathname;
  const query = urlData.query;

  switch (path) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        `<html><head><meta charset="utf8"/></head><body><p> Home 😁 </p></body></html>`
      );
      res.end();
      break;
    case "/info":
      res.writeHead(202, { "Content-Type": "aplication/json" });
      res.write(
        JSON.stringify({
          version: "0.0.1",
          appName: "nodeJs",
        })
      );
      res.end();
      break;
    case "/phone":
      try {
        const result = phone(query.value, "");
        res.writeHead(202, { "Content-Type": "application/json" });
        res.write(JSON.stringify(result));
        res.end();
      } catch (error) {
        const result = phone(query.value, "");
        res.writeHead(400, { "Content-Type": "application/json" });
        res.write(JSON.stringify({"error":"501"}));
        res.end();
      }
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(
        `<html><head><meta charset="utf8"/></head><body><p> 404 🚫 </p></body></html>`
      );
      res.end();
      break;
  }
});

server.listen(5000).on("connection", () => console.log("connection"));
