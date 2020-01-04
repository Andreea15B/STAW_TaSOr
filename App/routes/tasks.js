"use strict";
module.exports = function(app) {
  var users = require("../controllers/tasksController");

  app
    .route("/tasks")
    .get(tasks.list_all_tasks)
    .post(tasks.create_a_task);
};
