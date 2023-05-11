//require function from another middleware
const { logEvents } = require('./logEvents');

//log the error message
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack);
    res.status(500).send(err.message);
}
//give middleware access to server.js 
module.exports = errorHandler;