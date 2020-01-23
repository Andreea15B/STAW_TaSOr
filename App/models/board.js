"user strict";
var sql = require("../config/db");

class Board {
    constructor(board) {
        this.title = board.title;
        this.created_at = board.created_at;
        this.updated_at = board.created_at;
        this.created_by = board.created_by;
    }
};

Board.create_Board = (newBoard, result) => {
    sql.query("INSERT INTO boards set ?", newBoard, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Board.getBoardForUsername = (username, result) => {
    sql.query("Select * from boards where created_by = ?", username, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
};

Board.getBoardByName = (name, result) => {
    sql.query("SELECT * from boards where title = ?", name, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Board;