var express = require('express');

var mysql = require('mysql');

var flash = require('connect-flash');

var session = require('express-session');

var app = express(); //our dependency and library

var bodyParser = require('body-parser'); //for passing data from view to controller

var urlencodedParser = bodyParser.urlencoded({ extended: false }); //required

var user = require('./controllers/user'); //request controller

const expressValidator = require('express-validator');


