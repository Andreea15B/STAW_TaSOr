"user strict";
var sql = require("../config/db");

class Link {
    constructor(link) {
        this.id_task = link.id_task;
        this.link = link.link;
    }
};

Link.create_link = (newLink, result) => {
    console.log("models create_link");
    sql.query("INSERT INTO links set ?", newLink, (error, res) => {
        if (error) result(error, null);
        else result(null, res.insertId);
    });
}

Link.get_link = (id_task, result) => {
    sql.query("SELECT link FROM links WHERE id_task = ?", id_task, (error, res) => {
        if (error) result(error, null);
        else result(null, res.insertId);
    });
};

module.exports = Link;