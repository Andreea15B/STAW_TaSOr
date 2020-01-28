'use strict';
module.exports = function(app) {
    var history = require('../controllers/history');

    app.route('/history')
        .post(history.create_history);

    app.route('/history/:name_board')
        .get(history.get_history);

};