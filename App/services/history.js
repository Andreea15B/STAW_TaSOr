"use strict";

var History = require('../models/history');

exports.create_history = (newHistory, result) => {
    History.createHistory(newHistory, (err, req) => result(req, err));
};

exports.get_history = (name_board, result) => {
    History.getHistory(name_board, (err, req) => result(req, err));
}

exports.entire_history = (result) => {
    History.entire_history((err, req) => result(req, err));
}