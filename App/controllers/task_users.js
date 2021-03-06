"use strict";

var taskUsersService = require("../services/task_users");

exports.create_task_user = (req, res) => {
    taskUsersService.createTaskUser(req.body, (board, err) => {
        if (err) res.send(err);
        res.json(board);
    });
};

exports.get_users_for_task = (req, res) => {
    taskUsersService.getUsersForTask(req.params.id_task, (task, err) => {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.get_tasks_for_user = (req, res) => {
    taskUsersService.getTaskForUser(req.params.username, (task, err) => {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.get_task_assign = (req, res) => {
    taskUsersService.get_task_assign((task, err) => {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.delete_assigned_user_for_task = (req, res) => {
    taskUsersService.deleteAssignedUserForTask(req.params, (req, err) => {
        if (err) res.send(err);
        res.json(req);
    });
};