"use strict";

var Board = require('../models/board');

exports.get_boards_for_user = (username, result) => {
    Board.getBoardForUsername(username, (err, req) => result(req, err));
};

exports.createBoard = (newBoard, result) => {
    var new_board = new Board(newBoard);
    Board.create_Board(new_board, (error, request) => result(request, error));
};

exports.get_board_by_name = (name, result) => {
    Board.getBoardByName(name, (error, req) => result(req, error));
};

exports.delete_board = (name, result) => {
    Board.deleteBoard(name, (error, req) => result(req, error));
};