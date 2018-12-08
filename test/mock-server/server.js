let PORT = 3210;
const _ = require('lodash');

const options = process.argv.slice(2);
let param;
let latency = false;

options.forEach(function (op) {
    if (op == '--port' || op == '-p') {
        param = 'port';
        return;
    }
    if (op == '--latency') {
        latency = true;
        return;
    }
    if (param == 'port') {
        PORT = +op;
        return;
    }
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = module.exports = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.raw({limit: '50mb'}));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "allowedHeaders": "Origin, X-Requested-With, Content-Type, Accept, Pragma, Cache-Control"
}));


if (latency) {
    app.use((req, res, next) => {
        setTimeout(next, 300);
    });
}
app.use((req, res, next) => {
    next();
});

const server = require('http').createServer();
server.on('request', app);

/*app.*/server.listen(PORT, () => {
    console.log('EXPRESS: listening on port ' + PORT);
});

// require('./service/user');

app.get('/api/logout', (req, res) => res.sendFile(__dirname + '/logout.html'));

// generic
app.put('*', (req, res) => {
        req.accepts('application/json');
        console.log('***** ' + req.method + ': ' + req.originalUrl);
        console.log(JSON.stringify(req.body, null, 2));
        res.send('ok');
    }
);
