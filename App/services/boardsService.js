"use strict";

var Board = require('../models/boardModel');

exports.get_all_boards = (username, result) => {
    Board.getBoard(username, (err, req) => result(req, err));
};

exports.createBoard = (newBoard, result) => {
    var new_board = new Board(newBoard);
    Board.create_Board(new_board, (error, request) => result(request, error));
};