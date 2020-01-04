'use strict';

var usersService = require('../services/usersService');

exports.list_all_users = function(req, res) {
    usersService.get_all_users((users, err) => {
        if (err)
            res.send(err);
        res.json(users);
    });

};

// exports.create_a_user = function(req, res) {
//     var new_user = new User(req.body);
//     console.log(new_user);

//     //handles null error 
//     if (!new_user.username || !new_user.password) {
//         res.status(400).send({ error: true, message: 'Please provide username/password' });
//     } else {
//         User.createUser(new_user, function(err, user) {
//             if (err)
//                 res.send(err);
//             res.json(user);
//         });
//     }
// };


exports.read_a_user = function(req, res) {
    usersService.get_user(req.params.username, (req, err) => {
        if (err)
            res.send(err);
        res.json(user);
    });
};

// exports.update_a_user = function(req, res) {
//     User.updateByUsername(req.params.username, new User(req.body), function(err, user) {
//         if (err)
//             res.send(err);
//         res.json(user);
//     });
// };

// exports.delete_a_user = function(req, res) {
//     User.remove(req.params.username, function(err, user) {
//         if (err)
//             res.send(err);
//         res.json({ message: 'User successfully deleted' });
//     });
// };