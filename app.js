var express = require('express');

var mysql = require('mysql');

const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env'});  //hidding db

// const { body, validationResult } = require('express-validator');

var flash = require('connect-flash');

var session = require('express-session');

var app = express(); //our dependency and library

app.use(cookieParser());

const bcrypt = require('bcryptjs');

const expressValidator = require('express-validator');

app.use(expressValidator());


//creating mysql connection 
//hidding with .env
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    });

    //connecting
    db.connect((err) => {
        if(err){
            throw err;
        }
        console.log('Mysql connected to localhost');
    });
//ends here


//using session middleware
app.use(session({
    secret: 'First Node',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

//express messages middleware
// app.use(require('connect-flash')());
// app.use(function (req, res, next){
//     res.locals.messages = require('express-messages')(req, res);
//     next();
// })

//express validator middleware 

var bodyParser = require('body-parser'); //for passing data from view to controller

var urlencodedParser = bodyParser.urlencoded({ extended: false }); //required

var user = require('./controllers/user'); //request controller

// var routes = require('./routes/users');


app.listen('3000', () => {
    console.log('Server started on port 3000');
}); //port that is being listened to using express NB: must be declared after declaring express

app.set('view engine', 'ejs'); //our view engine that enables us pass in data and do partial templating

app.use('/assets', express.static('assets'));  //this is a built in express function that helps us for static stuff

//fire controller
user(app); //passing the app in line 3

//passing route

app.use('/', require('./routes/pages'));




















