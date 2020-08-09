const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Contact'});
});

router.get('/register', (req, res) => {
    res.render('register', {title: 'Register', message:' '});
});

router.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact'});
});

router.get('/about', (req, res) =>{
    res.render('about', {title: 'About'});
});

router.get('/signin', (req, res) => {
    res.render('signin', {title: 'signin', message: 'hello'});
});



module.exports = router;