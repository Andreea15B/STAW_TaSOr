"user strict";
var sql = require("../config/db");

var Task = function(task) {
  this.title = task.title;
  this.status = task.status;
  this.created_at = task.created_at;
  this.updated_at = task.updated_at;
  this.deadline = task.deadline;
  this.finished_at = task.finished_at;
  this.description = task.description;
  this.domain = task.domain;
  this.geographical_area = task.geographical_area;
};

Task.createTask = function(newTask, result) {
  sql.query("INSERT INTO tasks set ?", newTask, function(err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Task.getAllTasks = function(result) {
  sql.query("Select * from tasks", function(err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Task.getTaskByTitle = function(title, result) {
  sql.query("Select * from tasks where title = ? ", title, function(err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Task.remove = function(title, result) {
  sql.query("DELETE FROM tasks WHERE title = ?", [title], function(err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Task;
