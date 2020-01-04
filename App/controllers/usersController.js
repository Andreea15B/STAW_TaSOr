'use strict';

var usersService = require('../services/usersService');

exports.list_all_users = (req, res) => {
    usersService.get_all_users((users, err) => {
        if (err)
            res.send(err);
        res.json(users);
    });

};

exports.create_a_user = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ error: true, message: 'Please provide username/password' });
    } else {
        usersService.create(req.body, (user, err) => {
            if (err)
                res.send(err);
            res.json(user);
        });
    }
};

exports.read_user = function(req, res) {
    usersService.get_user(req.params.username, (req, err) => {
        if (err)
            res.send(err);
        res.json(req);
    });
};

exports.update_user = (req, res) => {
    usersService.update(req.params.username, req.body, (user, err) => {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_user = function(req, res) {
    usersService.delete(req.params.username, (user, err) => {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};