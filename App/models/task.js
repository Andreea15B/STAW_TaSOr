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
    var mm;
    var values = [];
    if (task.title != undefined && task.status != undefined) {
        values.push(task.title, task.status, id_task);
        mm = "UPDATE tasks SET title = ?, status = ? WHERE id_task = ?";
    }
    if (task.title != undefined && task.status == undefined) {
        values.push(task.title, id_task);
        mm = "UPDATE tasks SET title = ? WHERE id_task = ?";
    }
    if (task.title == undefined && task.status != undefined) {
        values.push(task.status, id_task);
        mm = "UPDATE tasks SET status = ? WHERE id_task = ?";
    }

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