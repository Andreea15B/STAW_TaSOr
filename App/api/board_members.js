'use strict';
module.exports = function(app) {
    var boards = require('../controllers/boards_members');

    app.route('/boards_members')
        .post(boards.create_board_member);

    app.route('/boards_members/:name')
        .get(boards.get_users);

};