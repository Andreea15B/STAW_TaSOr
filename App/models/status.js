"user strict";
var sql = require("../config/db");

class Status {
    constructor(status) {
        this.type = status.type;
    }
};

Status.addStatus = (name, result) => {
    sql.query("INSERT INTO statuses set ?", name, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res.insertId);
        }
    });
};

module.exports = Status;