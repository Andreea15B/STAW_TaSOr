"use strict";

var boardsService = require("../services/board_members");

exports.create_board_member = (req, res) => {
    boardsService.createBoard(req.body, (board, err) => {
        if (err) res.send(err);
        res.json(board);
    });
};

exports.get_users = (req, res) => {
    boardsService.getAllUsersForBoard(req.params.name, (board, err) => {
        if (err) res.send(err);
        res.json(board);
    });
};