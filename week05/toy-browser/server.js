const http = require('http');
const server = http.createServer((req, res) => {
    console.log('request received');
    console.log(req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('ok');
});

server.listen(8080);