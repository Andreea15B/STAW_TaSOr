'use strict';

var User = require('../models/userModel.js');

exports.get_all_users = (result) => {
    User.getAllUsers((err, req) => result(req, err))
};

exports.get_user = (req, result) => {
    User.getUserByUsername(req, (err, req) => result(req, err))
};