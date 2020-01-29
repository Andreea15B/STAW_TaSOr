"use strict";

var TaskUser = require('../models/task_users');

exports.createTaskUser = (newTaskUser, result) => {
    console.log("service createTaskUser: ", newTaskUser);
    var new_taskUser = new TaskUser(newTaskUser);
    TaskUser.create_taskUser(new_taskUser, (error, request) => result(request, error));
};

exports.getUsersForTask = (id_task, result) => {
    TaskUser.get_all_users_for_task(id_task, (error, request) => result(request, error));
}