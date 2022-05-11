'use strict';

global.express       = require('express');
global.router        = express.Router();
global.mongoose      = require('mongoose');
global.nodemailer    = require('nodemailer');
const ObjectId = mongoose.Types.ObjectId;

global.user = mongoose.model('hepto_employee_details');

var endpoints = [
 './email_employee'
];


endpoints.forEach(function(endpoint){
   require(endpoint);
});



module.exports = router;