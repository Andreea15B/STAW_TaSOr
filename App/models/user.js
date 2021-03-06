'use strict';
var sql = require('../config/db');


class User {
    constructor(user) {
        this.username = user.username;
        this.fullname = user.fullname;
        this.password = user.password;
        this.email = user.email;
        this.domain = user.domain;
    }
}

User.createUser = function(newUser, result) {
    sql.query("INSERT INTO users set ?", newUser, function(err, res) {

        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

User.getUserByUsername = function(username, result) {
    sql.query("Select * from users where username = ? ", username, function(err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);

        }
    });
};

User.getAllUsers = function(result) {
    sql.query("Select * from users", function(err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

User.updateByUsername = function(username, user, result) {
    var mm;
    var values = [];
    if (user.username != undefined && user.password != undefined) {
        values.push(user.username, user.password, username);
        mm = "UPDATE users SET username = ?, password = ? WHERE username = ?";
    } else {
        if (user.username != undefined && user.password == undefined) {
            values.push(user.username, username);
            mm = "UPDATE users SET username = ? WHERE username = ?";
        } else
        if (user.username == undefined && user.password != undefined) {
            values.push(user.password, username);
            mm = "UPDATE users SET password = ? WHERE username = ?";
        }
    }

    sql.query(mm, values, function(err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


User.remove = function(username, result) {
    sql.query("DELETE FROM users WHERE username = ?", [username], function(err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = User;