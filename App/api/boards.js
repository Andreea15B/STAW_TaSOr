'use strict';
module.exports = function(app) {
    var boards = require('../controllers/boards');

    // users Routes
    app.route('/boards/:username')
        .get(boards.list_all_boards);

    app.route('/boards')
        .post(boards.create_board);

};