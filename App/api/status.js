'use strict';
module.exports = function(app) {
    var status = require('../controllers/status');

    // status Routes
    app.route('/status')
        .post(status.add_status);
};