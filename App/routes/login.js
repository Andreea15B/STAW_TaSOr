var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");
var bycript = require("bcryptjs");

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
            .then(async response => {
                if (response.length == 0) {
                    errors.push({ msg: 'User doesn`t exist' });
                } else {
                    let actual_password = response[0]['password'];
                    try {
                        if (!await bycript.compare(password, actual_password)) {
                            errors.push({ msg: 'Incorect password' });
                        }
                    } catch {
                        console.log('Bycrypt error');
                    }

                }

                if (errors.length > 0) res.render('login', { errors });
                else
                    res.redirect('/home');
            });
    }
});

module.exports = router;