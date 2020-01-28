'use strict';
module.exports = function(app) {
    var links = require('../controllers/links');

    app.route('/links')
        .post(links.assign_link)

    app.route('/links/:id_task')
        .get(links.get_link)

};