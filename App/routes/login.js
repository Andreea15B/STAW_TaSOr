var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");

router.get('/', (req, res) => res.redirect('/login'));

router.get('/login', (req, res) => res.render('login'));

router.post('/login', (req, res) => {
    var { username, password } = req.body;
    var errors = [];

    fetch('http://localhost:3000/users/' + username)
        .then(response => response.json())
        .then(response => {
            if (response.length == 0) {
                errors.push({ msg: 'User doesn`t exist' });
            }
            if (errors.length > 0) res.render('login', { errors });
            else
                res.redirect('/register');
        });
});

router.get('/register', (req, res) => res.send('register'));
module.exports = router;