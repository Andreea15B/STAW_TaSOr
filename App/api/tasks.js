'use strict';
module.exports = function(app) {
    var tasks = require('../controllers/tasks');

    app.route('/tasks')
        .get(tasks.list_all_tasks)
        .post(tasks.create_a_task);

    app.route('/tasks/:id_task')
        .put(tasks.update_task)
        .get(tasks.read_task);

    app.route('/tasks/:board_name/:status')
        .get(tasks.read_task_by_status);

};