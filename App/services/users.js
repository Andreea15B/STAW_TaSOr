'use strict';

var User = require('../models/user');

exports.get_all_users = result => {
    User.getAllUsers((err, req) => result(req, err))
};

exports.get_user = (req, result) => {
    User.getUserByUsername(req, (err, req) => result(req, err))
};

exports.update = (username, req, result) => {
    var new_user = new User(req);
    User.updateByUsername(username, new_user, (err, req) => result(req, err))
};

exports.delete = (username, result) => {
    User.remove(username, (err, req) => result(req, err))
};

exports.create = (user, result) => {
    var new_user = new User(user);
    User.createUser(new_user, (err, req) => result(req, err))
};