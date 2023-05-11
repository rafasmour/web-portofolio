//import required libraries 
const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errHandler');
const port = process.env.PORT || 80;
//log events
app.use(logger);
//The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with URL-encoded payloads and is based on a body parser.
app.use(express.urlencoded({extended : true}));
//ress.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());
//use public directory to serve files
app.use(express.static(path.join(__dirname, '/public')));

//handle requests for the wev server 
app.use( '^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/index.html'));
})
app.use( '/about(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/about.html'));
})
app.use( '/contact(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/contact.html'));
})
app.use( '/programs(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/programs.html'));
})
app.use( '/art(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/art.html'));
})
app.use( '/D&D(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/D&D.html'));
})
app.use( '/D&D/map(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/D&D/map.html'));
})
app.use( '/D&D/chelesy(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/D&D/chelesy.html'));
})
app.use( '/D&D/gestari(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/D&D/gestari.html'));
})

//404 in case of an impossible request
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'public', 'html', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

//log error in case of error
app.use(errorHandler);

//report successful server connection
app.listen(port, () => {
    console.log(`Connected to port ${port}`);
})
