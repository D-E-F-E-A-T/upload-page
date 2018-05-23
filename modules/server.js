const http = require('http');
const colors = require('colors');

const start = () => {
    const onRequest = (req, res) => {
        console.log('got request'.cyan)
        res.writeHead(200, {'content-type': 'text/plain' });
        res.write('hellow');
        res.end();
    }
    http.createServer(onRequest).listen(9000);
    console.log('server running ( ͡° ͜ʖ ͡°) '.cyan);
}

exports.start = start;
