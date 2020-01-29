"use strict";

var taskService = require("../services/tasks");
var nodemailer = require("../config/nodemailer");
var fetch = require('node-fetch');

exports.list_all_tasks = (req, res) => {
    taskService.get_all_tasks((tasks, err) => {
        if (err) res.send(err);
        res.json(tasks);
    });
};

exports.create_a_task = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ error: true, message: "Please provide a title" });
    } else {
        fetch("http://localhost:3000/boards_members/" + req.body.name_board)
            .then(response => response.json())
            .then(response => {
                response.forEach(element => {
                    fetch("http://localhost:3000/users/" + element.username)
                        .then(response => response.json())
                        .then(response => {

                            let HelperOptions = {
                                from: '"Tasor" <tasor.acc@gmail.com',
                                to: response[0].email,
                                subject: "Hey " + response[0].username + ", Here’s what you missed…",
                                text: "There's a new task to be done! Be the first one to take it! \"" + req.body.title + "\""
                            }
                            if (response[0].username != req.body.username)
                                nodemailer.sendMail(HelperOptions, error => {
                                    if (error) {
                                        return console.log(error);
                                    }
                                });

                        });
                });
            });
        req.body.status = "to-do";
        req.body.link = "";
        taskService.create_task(req.body, (task, err) => {
            if (err) res.send(err);
            res.json(task);
            res.end();
        });
    }
};

exports.read_task = function(req, res) {
    taskService.get_task(req.params.id_task, (req, err) => {
        if (err) res.send(err);
        res.json(req);
        res.end();
    });
};

exports.read_task_by_status = function(req, res) {
    taskService.get_task_by_status(req.params, (req, err) => {
        if (err) res.send(err);
        res.json(req);
    });
};

exports.update_task = (req, res) => {
    taskService.update_task(req.params.id_task, req.body, (task, err) => {
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