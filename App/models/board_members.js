"user strict";
var sql = require("../config/db");

class BoardMembers {
    constructor(board) {
        this.board_name = board.board_name;
        this.username = board.username;
    }
};

BoardMembers.create_Board = (newBoard, result) => {
    sql.query("INSERT INTO boards_members set ?", newBoard, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res.insertId);
        }
    });
};

BoardMembers.get_all_users = (name, result) => {
    sql.query("SELECT username FROM boards_members WHERE board_name = ? ", name, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
};

BoardMembers.get_board_for_user = (username, result) => {
    sql.query("SELECT *  FROM boards WHERE title in (SELECT board_name FROM boards_members  WHERE username = ? )", username, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
};

BoardMembers.get_all_boards = (result) => {
    sql.query("SELECT *  FROM boards_members ", (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
};



module.exports = BoardMembers;