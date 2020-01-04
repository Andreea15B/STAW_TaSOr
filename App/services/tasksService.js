"use strict";

var Task = require("../models/taskModel.js");

exports.get_all_tasks = result => {
  Task.getAllTasks((err, req) => result(req, err));
};

exports.get_task = (req, result) => {
  Task.getTaskByTitle(req, (err, req) => result(req, err));
};
