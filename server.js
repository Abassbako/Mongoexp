const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.readFile('../elegance', (e, data) => {
        if (e) {
            console.error(new Error(e));
            return;
        } else {
            res.write(data);
            res.end();
        };
    });
});