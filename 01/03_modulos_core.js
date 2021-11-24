const http = require('http');

const server = http.createServer(function(request,response){

    response.writeHead(200,{"Content-Type":"text/html"})
    response.write("<html><body><p>hola</p></body></html>")
    response.end();
});

server.listen(5000)

