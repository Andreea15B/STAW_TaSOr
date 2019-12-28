// var express = require('express');
// var router = express.Router();

// router.get('/login', (req, res) => res.sendFile(__dirname + '/htmlFiles/login.html'));
// router.get('/register', (req, res) => res.send('register'));

// module.exports = router;
'use strict';
module.exports = function(app) {
    var users = require('../controllers/usersController');

    // users Routes
    app.route('/users')
        .get(users.list_all_users)
        .post(users.create_a_user);

    app.route('/users/:username')
        .get(users.read_a_user)
        .put(users.update_a_user)
        .delete(users.delete_a_user);
};