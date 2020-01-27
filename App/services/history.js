"use strict";

var History = require('../models/history');

exports.create_history = (newHistory, result) => {
    History.createHistory(newHistory, (err, req) => result(req, err));
};

exports.get_history = (id_board, id_task, result) => {
    History.getHistory(id_board, id_task, (err, req) => result(req, err));
}