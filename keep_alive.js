var http = require('http');

console.log("Creating webserver");

http.createServer(function (req, res) {
  res.write("Bot is active");
  res.end();
}).listen(8080);

console.log("Webserver active");