const http = require('http');
const colors = require('colors');
const handlers = require('./handlers')

const start = () => {
    const onRequest = (req, res) => {
        console.log('got request'.cyan)
        res.writeHead(200, {'content-type': 'text/plain' });

        switch(req.url) {
            case '/':
            case '/home':
                handlers.welcome(req, res);
                break;
            case '/upload':
                handlers.upload(req, res);
                break;
            default:
                handlers.error(req,res);
        }
    }
    http.createServer(onRequest).listen(9000);
    console.log('server running ( ͡° ͜ʖ ͡°) '.cyan);
}

exports.start = start;
