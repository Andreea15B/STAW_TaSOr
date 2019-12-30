var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");

router.get('/', (req, res) => res.redirect('/login'));

router.get('/login', (req, res) => res.render('login'));

router.post('/login', (req, res) => {
    var { username, password } = req.body;
    var errors = [];

    if (username == '' || password == '') {
        errors.push({ msg: 'Fill all the fields' });
        res.render('login', { errors });
    } else {
        fetch('http://localhost:3000/users/' + username)
            .then(response => response.json())
            .then(response => {
                if (response.length == 0) {
                    errors.push({ msg: 'User doesn`t exist' });
                } else {
                    let actual_password = response[0]['password'];
                    if (actual_password != password) {
                        errors.push({ msg: 'Incorect password' });
                    }
                }

                if (errors.length > 0) res.render('login', { errors });
                else
                    res.redirect('/home');
            });
    }
});

router.get('/register', (req, res) => res.render('register'));
module.exports = router;