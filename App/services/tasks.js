"use strict";

var Task = require("../models/task");

exports.get_all_tasks = result => {
    Task.getAllTasks((err, req) => result(req, err))
};

exports.get_task = (req, result) => {
    Task.getTaskByTitle(req, (err, req) => result(req, err))
};

exports.create_a_task = (task, result) => {
    var new_task = new Task(task);
    Task.createTask(new_task, (err, req) => result(req, err))
};