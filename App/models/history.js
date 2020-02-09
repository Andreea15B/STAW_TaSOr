"user strict";
var sql = require("../config/db");

class History {
    constructor(history) {
        this.name_board = history.name_board;
        this.id_task = history.id_task;
        this.activity = history.activity;
        this.date_update = history.date_update;
    }
};

History.createHistory = (newHistory, result) => {
    sql.query("INSERT INTO history set ?", newHistory, (error, res) => {
        if (error) result(error, null);
        else result(null, res.insertId);
    });
}

History.getHistory = (name_board, result) => {
    sql.query("SELECT * FROM history WHERE name_board = ?", name_board, (err, res) => {
        if (err) result(err, null);
        else result(null, res);
    });
};
History.entire_history = (result) => {
    sql.query("SELECT * FROM history ", (err, res) => {
        if (err) result(err, null);
        else result(null, res);
    });
};

module.exports = History;