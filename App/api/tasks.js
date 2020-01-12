'use strict';
module.exports = function(app) {
    var tasks = require('../controllers/tasks');

    // tasks Routes
    app.route('/tasks')
        .get(tasks.list_all_tasks)
        .post(tasks.create_a_task);
    
    app.route('/tasks/:title')
        .get(tasks.read_task)
        .put(tasks.update_task)
        .delete(tasks.delete_task);
};