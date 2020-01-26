'use strict';
module.exports = function(app) {
    var images = require('../controllers/images');

    // boards Routes
    app.route('/images')
        .post(images.assign_image)
        .put(images.update_image)

    app.route('/images/:id_task')
        .get(images.get_image)

};