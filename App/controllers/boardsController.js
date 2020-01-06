'use strict';

var boardsService = require('../services/boardsService');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var date_ = [year, month, day].join('-');
    var hours = [hour, minutes].join('-');
    return [date_, hours].join(' ');
}

exports.list_all_boards = (req, res) => {
    boardsService.get_all_boards(req.params.username, (req, err) => {
        if (err)
            res.send(err);
        res.json(req);
    });
};

exports.create_board = (req, res) => {
    var request = req.body;
    var title = request.title;
    var username = request.username;
    if (!title) {
        res.status(400).send({ erorr: true, message: 'Please provide title' });
    } else {
        // username pe viitor va fi luat din sesiune
        var json_ = {
            "create_by": username,
            "title": title,
            "created_at": formatDate(Date.now()),
            "updated_at": formatDate(Date.now())
        };

        boardsService.createBoard(json_, (board, err) => {
            if (err)
                res.send(err);
            res.json(board);
        });
    }

};