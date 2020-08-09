module.exports = function(app){ //this is exported to the main controller named app and the app is passed 
//in the function so we can use of it e.g app.get
var bodyParser = require('body-parser'); //for passing data from view to controller

var mysql = require('mysql'); //mysql

const jwt = require('jsonwebtoken'); //for cookie

const bcrypt = require('bcryptjs');

var urlencodedParser = bodyParser.urlencoded({ extended: false }); //required


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

//register begins
app.post('/register', urlencodedParser, function(req, res){
    console.log(req.body);

    const { firstname, email, phone, password, confirm_password} = req.body;
    db.query('SELECT email FROM users where email = ?', [email], async (err, results) => {
        if(err){
            throw err;
        }

        if(results.length > 0){
            return res.render('register', {
                message: 'Email already exist'
            });
        }
        else 
        if(password !== confirm_password){
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }
 
        let hashedpassword = await bcrypt.hash(password, 8);
        console.log(hashedpassword);

        db.query('INSERT INTO users SET ?', {firstname: firstname, email: email, phone: phone, password: hashedpassword }, (err, results) =>{
            if(err){
                throw err;
            }
            else{
                console.log(results);
                return res.render('register', {
                    message: 'User Registered'
                });
            }
        })
    });
});

//ends

//login begins
app.post('/login', urlencodedParser, async (req, res,) => {
        console.log(req.body);
        try{
            const { email, password} = req.body;
            if( !email || !password){
                return res.status(400).render('signin', {
                    message: 'please provide email and password'
                })
            }

            db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) =>{
                console.log(results);
                if(!results || !(await bcrypt.compare(password, results[0].password))){
                    res.status(401).render('signin',{
                        message: 'Email or Password is incorrect'
                    })
                }
                else{
                    const id = results[0].id; //user id

                    const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });

                    console.log('The token is:'+ token);

                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }

                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).redirect('/');
                }
            })

        } catch(err){
            throw err;
        }
});

//ends

}