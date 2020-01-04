"use strict";

var tasksService = require("../services/tasksService");

exports.list_all_tasks = function(req, res) {
  tasksService.get_all_tasks((tasks, err) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.read_a_task = function(req, res) {
  tasksService.get_task(req.params.title, (req, err) => {
    if (err) res.send(err);
    res.json(req);
  });
};
