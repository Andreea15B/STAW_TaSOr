"user strict";
var sql = require("../config/db");

var Board = function(board) {
    this.title = board.title;
    this.created_at = board.created_at;
    this.updated_at = board.created_at;
    this.created_by = board.create_by;
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

Board.getBoard = (username, result) => {
    sql.query("Select * from boards where created_by = ?", username, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Board;