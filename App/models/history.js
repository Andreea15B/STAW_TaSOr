"user strict";
var sql = require("../config/db");

class History {
    constructor(history) {
        this.id_board = history.id_board;
        this.id_task = history.id_task;
        this.person = history.person;
        this.activity = history.activity;
        this.from_status = history.from_status;
        this.to_status = history.to_status;
    }
};

History.createHistory = (newHistory, result) => {
    sql.query("INSERT INTO history set ?", newHistory, (error, res) => {
        if (error) result(error, null);
        else result(null, res.insertId);
    });
}

History.getHistory = (id_board, id_task, result) => {
    sql.query("SELECT * FROM history WHERE id_board = ? AND id_task = ?", [id_board, id_task], (err, res) => {
        if (err) result(err, null);
        else result(null, res);
    });
};

module.exports = History;