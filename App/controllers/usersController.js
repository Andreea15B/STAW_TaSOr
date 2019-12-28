'use strict';

var User = require('../models/userModel.js');

exports.list_all_users = function(req, res) {
    User.getAllUsers(function(err, user) {
        if (err)
            res.send(err);
        res.send(user);
    });
};

exports.create_a_user = function(req, res) {
    var new_user = new User(req.body);
    console.log(new_user);

    //handles null error 
    if (!new_user.username || !new_user.password) {
        res.status(400).send({ error: true, message: 'Please provide username/password' });
    } else {
        User.createUser(new_user, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    }
};


exports.read_a_user = function(req, res) {
    User.getUserByUsername(req.params.username, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_a_user = function(req, res) {
    User.updateByUsername(req.params.username, new User(req.body), function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_a_user = function(req, res) {
    User.remove(req.params.username, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};