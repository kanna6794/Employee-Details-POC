
var express = require('express');
var app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');
var fs = require("fs");
require('dotenv').config();



require('./modules/hepto_employee_details');

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

app.use(express.static('public'))




const url = `mongodb+srv://newuser:Abc12345@cluster0.653he.mongodb.net/Cluster0?retryWrites=true&w=majority`;

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
        statuscode: "HT-404"
    });
});




app.use('/api', function (err, req, res, next) {
    logger1.info(err);
    res.status(500).json({
        err: err.stack,
        message: "Internal server Error",
        statuscode: "HT-500"
    });
});

app.listen(2001, process.env.SERVER_HOST, function () {
    console.log('Express server listening on port ' + process.env.SERVER_HOST + 2001);
});



module.exports = app;
