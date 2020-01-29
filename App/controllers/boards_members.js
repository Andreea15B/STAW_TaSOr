"use strict";

var boardsService = require("../services/board_members");
var nodemailer = require("../config/nodemailer");
var fetch = require('node-fetch')

exports.create_board_member = (req, res) => {
    var username_to_Add = req.body.username;
    fetch("http://localhost:3000/users/" + username_to_Add)
        .then(response => response.json())
        .then(response => {
            const email = response[0].email;
            let HelperOptions = {
                from: '"Tasor" <tasor.acc@gmail.com',
                to: email,
                subject: "You've been added to board " + req.body.board_name,
                html: "<b>Hello world?</b>"
            };

            nodemailer.sendMail(HelperOptions, error => {
                if (error) {
                    return console.log(error);
                }
            });
        });
    boardsService.createBoard(req.body, (board, err) => {
        if (err) res.send(err);
        res.json(board);
    });
};

exports.get_users = (req, res) => {
    boardsService.getAllUsersForBoard(req.params.name, (board, err) => {
        if (err) res.send(err);
        res.json(board);
    });
};

exports.get_belong_board = (req, res) => {
    boardsService.get_boards(req.params.username, (board, err) => {
        if (err) res.send(err);
        res.json(board);
    });
};