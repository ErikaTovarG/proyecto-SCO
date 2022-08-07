const fs = require("fs");

function logDBMiddleware (req, res, next) {
    fs.appendFileSync('logDB.txt', 'Se creo un registro ' + req.url);
    next();
}

module.exports = logDBMiddleware;