'use strict';
module.exports = function(app) {
    var taskUsers = require('../controllers/task_users');

    app.route('/task_users')
        .post(taskUsers.create_task_user);

    app.route('/task_users/:id_task')
        .get(taskUsers.get_users_for_task);

};