var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");
var bycript = require("bcryptjs");

router.get('/', (req, res) => res.render('register'));
router.post('/', (req, res) => {
    let { domain, username, fullname, email, password, password2 } = req.body;
    let errors = [];

    if (username == '' || password == '' || fullname == '' || email == '' || password2 == '') {
        errors.push({ msg: 'Fill all the fields' });
        res.render('register', { errors });
    } else {
        fetch('http://localhost:3000/users/' + username)
            .then(response => response.json())
            .then(async response => {
                if (response.length > 0) {
                    errors.push({ msg: 'Username already exists' });
                } else {
                    if (password.length < 7) {
                        errors.push({ msg: 'Password must be at least 7 letters' });
                    } else {
                        if (password != password2) {
                            errors.push({ msg: 'Passwords do not match' });
                        }
                    }
                }
                if (errors.length > 0) res.render('register', { errors });
                else {
                    try {
                        const hashed_password = await bycript.hash(password, 10);
                        const data = { username, fullname, password: hashed_password, email, domain };

                        fetch('http://localhost:3000/users/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        });
                        let success = [];
                        success.push({ msg: 'Register successful' });

                        res.render('login', { success });
                    } catch {
                        res.redirect('/register');
                    }

                }

            });
    }
});

module.exports = router;