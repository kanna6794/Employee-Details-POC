
var express = require('express');
var app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
// var methodOverride = require('method-override');
// var morgan = require('morgan');
var path = require('path');

var fs = require("fs");

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' })
var winston = require('winston');

const { createLogger, format, transports } = require('winston');

require('dotenv').config();



require('./modules/hepto_employee_details');






// app.use(methodOverride());
// app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

app.use(express.static('public'))


const url = `mongodb+srv://newuser:Abc12345@cluster0.653he.mongodb.net/Cluster0?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(url, { useNewUrlParser: true }).catch(e => {
    console.error(e.message);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

function processRoutePath(routePath, currentLevel, maxLevel) {
    fs.readdirSync(routePath).forEach(function (file) {
        var filepath = routePath + '/' + file;
        var stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            processRoutePath(filepath, currentLevel + 1, maxLevel);
        } else {
            if (file == 'index.js') {
                app.use(routePath.replace('routes', '').substring(1), require(routePath));


            }


        }
        //  }    
    });
    //}
}

var route = "./api";
processRoutePath(route, 1, 1);

app.use("/api", function (req, res) {
    res.status(404).json({
        message: "Oops Wrong",
        statuscode: "NT-404"
    });
});




function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

var port = normalizePort(process.env.PORT || process.env.SERVER_PORT);

const logDir = 'log';

const filename = path.join(logDir, 'results.log');

const logger1 = createLogger({

    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            )
        }),
        new transports.File({ filename })
    ]
});

app.use('/api', function (err, req, res, next) {
    logger1.info(err);
    res.status(500).json({
        err: err.stack,
        message: "Internal server Error",
        statuscode: "NT-500"
    });
});

app.listen(2001, process.env.SERVER_HOST, function () {
    console.log('Express server listening on port ' + process.env.SERVER_HOST + 2001);
});



module.exports = app;