const http = require('http');
const app = require('./app');

const  port = 3000;

const server = http.createServer(app);

server.listen(port);

/*const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = require('./app');
const  port = 3000;
const httpsOptions ={
    cert: fs.readFileSync(path.join(__dirname,'ssl','server.crt')),
    key: fs.readFileSync(path.join(__dirname,'ssl','server.key')),
};
https.createServer(httpsOptions,app).listen(port);
*/