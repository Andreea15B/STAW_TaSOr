'use strict';
module.exports = function(app) {
    var users = require('../controllers/users');

    // users Routes
    app.route('/users')
        .get(users.list_all_users)
        .post(users.create_a_user);

    app.route('/users/:username')
        .get(users.read_user)
        .put(users.update_user)
        .delete(users.delete_user);

};