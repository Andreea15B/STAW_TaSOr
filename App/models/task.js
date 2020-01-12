"use strict";
var sql = require("../config/db");

class Task {
  constructor(task) {
    // this.id = task.id;
    this.title = task.title;
    this.status = task.status;
    this.created_at = task.created_at;
    this.updated_at = task.updated_at;
    // this.deadline = task.deadline;
    this.finished_at = task.finished_at;
    this.description = task.description;
    this.domain = task.domain;
    this.geographical_area = task.geographical_area;
  }
}

Task.createTask = function(newTask, result) {
  sql.query("INSERT INTO tasks set ?", newTask, function(err, res) {
    if (err) {
      console.log("model createTask NOT ok");
      console.log("newTask: ", newTask);
      console.log("eroare: ", err);
      result(err, null);
    } else {
      console.log("model createTask ok");
      result(null, res.insertId);
    }
  });
};

Task.getTaskByID = function(id, result) {
  sql.query("Select * from tasks where id = ? ", id, function(err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
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

Task.updateTask = function(id, task, result) {
  var mm;
  var values = [];
  if (task.title != undefined && task.status != undefined) {
    values.push(task.title, task.status, id);
    mm = "UPDATE tasks SET title = ?, status = ? WHERE id = ?";
  }
  if (task.title != undefined && task.status == undefined) {
    values.push(task.title, id);
    mm = "UPDATE tasks SET title = ? WHERE id = ?";
  }
  if (task.title == undefined && task.status != undefined) {
    values.push(task.status, id);
    mm = "UPDATE tasks SET status = ? WHERE id = ?";
  }

  sql.query(mm, values, function(err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Task.removeTask = function(id, result) {
  sql.query("DELETE FROM tasks WHERE id = ?", [id], function(err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Task;
