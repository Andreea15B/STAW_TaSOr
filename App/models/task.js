"use strict";
var sql = require("../config/db");

class Task {
    constructor(task) {
        this.title = task.title;
        this.status = task.status;
        this.created_at = task.created_at;
        this.updated_at = task.updated_at;
        this.deadline = task.deadline;
        this.finished_at = task.finished_at;
        this.description = task.description;
        this.domain = task.domain;
        this.geographical_area = task.geographical_area;
        this.name_board = task.name_board;
    }
}

Task.createTask = function(newTask, result) {
    sql.query("INSERT INTO tasks set ?", newTask, function(err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Task.getTaskByID = function(id_task, result) {
    sql.query("Select * from tasks where id_task = ?", id_task, function(err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Task.getTaskByStatus = function(request, result) {
    var values = [request.status, request.board_name];
    sql.query("Select * from tasks where status = ? and name_board = ?", values, function(err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Task.getAllTasks = function(result) {
    sql.query("Select * from tasks", function(err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Task.updateTask = function(id_task, task, result) {
    var flagIsFirst = 1;
    var values = [];
    var mm = "UPDATE tasks SET ";
    if (task.title != undefined) {
        if(flagIsFirst == 1) {
            flagIsFirst = 0;
        }
        else mm += ", ";
        mm += "title = ?";
        values.push(task.title);
    }
    if (task.status != undefined) {
        if(flagIsFirst == 1) {
            flagIsFirst = 0;
        }
        else mm += ", ";
        mm += "status = ?";
        values.push(task.status);
    }
    if (task.description != undefined) {
        if(flagIsFirst == 1) {
            flagIsFirst = 0;
        }
        else mm += ", ";
        mm += "description = ?";
        values.push(task.description);
    }
    if (task.deadline != undefined) {
        if(flagIsFirst == 1) {
            flagIsFirst = 0;
        }
        else mm += ", ";
        mm += "deadline = ?";
        values.push(task.deadline);
    }
    console.log("Area: ", task.geographical_area);
    if (task.geographical_area != undefined) {
        if(flagIsFirst == 1) {
            flagIsFirst = 0;
        }
        else mm += ", ";
        mm += "geographical_area = ?";
        values.push(task.geographical_area);
    }
    if (task.domain != undefined) {
        if(flagIsFirst == 1) {
            flagIsFirst = 0;
        }
        else mm += ", ";
        mm += "domain = ?";
        values.push(task.domain);
    }
    mm += " WHERE id_task = ?";
    console.log(mm);
    values.push(id_task);
    console.log("values: ", values);

    sql.query(mm, values, function(err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Task.removeTask = function(id_task, result) {
    sql.query("DELETE FROM tasks WHERE id_task = ?", [id_task], function(err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Task;