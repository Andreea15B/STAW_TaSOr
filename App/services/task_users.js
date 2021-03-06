"use strict";

var TaskUser = require('../models/task_users');

exports.createTaskUser = (newTaskUser, result) => {
    var new_taskUser = new TaskUser(newTaskUser);
    TaskUser.create_taskUser(new_taskUser, (error, request) => result(request, error));
};

exports.getUsersForTask = (id_task, result) => {
    TaskUser.get_all_users_for_task(id_task, (error, request) => result(request, error));
}

exports.getTaskForUser = (username, result) => {
    TaskUser.get_all_tasks_for_user(username, (error, request) => result(request, error));
}

exports.get_task_assign = (result) => {
    TaskUser.get_task_assign((error, request) => result(request, error));
}

exports.deleteAssignedUserForTask = (req, result) => {
    TaskUser.delete_user_for_task(req, (error, req) => result(req, error));
};