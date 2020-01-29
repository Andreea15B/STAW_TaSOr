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
                subject: "Hey " + username_to_Add + ", Here’s what you missed…",
                text: "You've been added to the board " + req.body.board_name
            };
            nodemailer.sendMail(HelperOptions, error => {
                if (error) {
                    return console.log(error);
                }
            });
        });

    fetch("http://localhost:3000/boards_members/" + req.body.board_name)
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
                            text: "You've got a new colleague to the board " + req.body.board_name + ". Please welcome, " + req.body.username
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