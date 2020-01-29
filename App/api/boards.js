'use strict';
module.exports = function(app) {
    var boards = require('../controllers/boards');

    // boards Routes
    app.route('/boards/:username')
        .get(boards.list_all_boards);

    app.route('/boards')
        .post(boards.create_board)
        .get(boards.list_boards)

    app.route('/board_add/:name')
        .get(boards.get_board)
        .delete(boards.delete_board)

};