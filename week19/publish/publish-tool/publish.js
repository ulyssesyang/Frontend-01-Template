const http = require('http');
const fs = require('fs');
const archiver = require('archiver');

const packageName = './package'

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/?filename=' + 'package.zip',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream'
    }
};
const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});
req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
archive.directory(packageName, false);
// archive.pipe(fs.createWriteStream('package.zip'));
archive.finalize();
archive.pipe(req);

archive.on('end', () => {
    req.end();
})