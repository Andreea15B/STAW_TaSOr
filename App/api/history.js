'use strict';
module.exports = function(app) {
    var history = require('../controllers/history');

    // boards Routes
    app.route('/history')
        .post(history.create_history);

    app.route('/history/:id_board/:id_task')
        .get(history.get_history);

};