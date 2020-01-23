"use strict";

var Task = require("../models/task");

exports.get_all_tasks = result => {
    Task.getAllTasks((err, req) => result(req, err))
};

exports.get_task = function(req, result) {
    Task.getTaskByID(req, (err, req) => result(req, err));
};

exports.get_task_by_status = function(req, result) {
    Task.getTaskByStatus(req, (err, req) => result(req, err));
}

exports.create_task = function(task, result) {
    var new_task = new Task(task);
    Task.createTask(new_task, (err, req) => result(req, err))
};

exports.update_task = (id, req, result) => {
    var new_task = new User(req);
    Task.updateTask(id, new_task, (err, req) => result(req, err))
};

exports.delete_task = (id, result) => {
    Task.removeTask(id, (err, req) => result(req, err))
};