var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("A test EB app.\n");
  response.write("A top notch app, indeed.\n");
  response.write(process.env.PORT);
  response.end();
}).listen(8080);

console.log("Run attempt.");
console.log(process.env.PORT);