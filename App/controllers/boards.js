'use strict';

var boardsService = require('../services/boards');

exports.list_all_boards = (req, res) => {
    boardsService.get_boards_for_user(req.params.username, (req, err) => {
        if (err)
            res.send(err);
        res.json(req);
    });
};

exports.get_board = (req, res) => {
    boardsService.get_board_by_name(req.params.name, (req, err) => {
        if (err)
            res.send(err);
        res.json(req);
    });
};

exports.create_board = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ erorr: true, message: 'Please provide title' });
    } else {
        boardsService.createBoard(req.body, (board, err) => {
            if (err)
                res.send(err);
            res.json(board);
        });
    }

};