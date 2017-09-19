var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var url = require('url')
var path = require('path')

app.listen(80);

function handler(req, res) {
  // console.log(res);
  // fs.readFile(__dirname + '/index.html',{encoding:'utf8',flag:'r'},
  // function (err, data) {
  //   if (err) {
  //     res.writeHead(500);
  //     return res.end('Error loading index.html');
  //   }
  //   console.log(data);
  //   res.writeHead(200,{"Content-Type": "text/html"});
  //   res.end(data);
  // });
  var pathname = url.parse(req.url).pathname;
  var realPath = pathname;
  // path.exists(realPath, function (exists) {
  //   if (!exists) {
  //     response.writeHead(404, {
  //       'Content-Type': 'text/plain'
  //     });
  //     response.write('This request URL " + pathname + " was not found on this server.');
  //     response.end();
  //   } else {
  console.log(pathname);
  fs.readFile(__dirname+pathname, { encoding: 'utf8', flag: 'r' }, function (err, file) {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end(err);
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(file, 'binary');
      res.end();
    }
  });
}
//   });
// }
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data, 22);
  });
  socket.on('message', function (data) {
    console.log(data, 25);
    // socket.broadcast.emit('message','form server');
    io.sockets.emit('message', 'form server');
  });
});