"use strict";

var taskService = require("../services/tasks");

exports.list_all_tasks = (req, res) => {
  taskService.get_all_tasks((tasks, err) => {
    if (err) res.send(err);
    res.json(tasks);
  });
};

exports.create_a_task = (req, res) => {
  if (!req.body.title) {
    console.log("controller create_a_task NOT ok");
    res.status(400).send({ error: true, message: "Please provide a title" });
  } else {
    console.log("controller create_a_task ok");
    taskService.create_task(req.body, (task, err) => {
      if (err) res.send(err);
      res.json(task);
    });
  }
};

exports.read_task = function(req, res) {
  taskService.get_task(req.params.id, (req, err) => {
    if (err) res.send(err);
    res.json(req);
  });
};

exports.update_task = (req, res) => {
  taskService.update_task(req.params.id, req.body, (task, err) => {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.delete_task = function(req, res) {
  taskService.delete_task(req.params.id, (task, err) => {
    if (err) res.send(err);
    res.json({ message: "Task successfully deleted" });
  });
};
