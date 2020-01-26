"use strict";

var BoardMember = require('../models/board_members');

exports.createBoard = (newBoard, result) => {
    var new_board = new BoardMember(newBoard);
    BoardMember.create_Board(new_board, (error, request) => result(request, error));
};

exports.getAllUsersForBoard = (name, result) => {
    BoardMember.get_all_users(name, (error, request) => result(request, error));
}