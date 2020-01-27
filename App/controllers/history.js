'use strict';

var historyService = require('../services/history');

exports.create_history = (req, res) => {
    historyService.create_history(req.body, (req, err) => {
        if (err) res.send(err);
        res.json(req);
    });
};

exports.get_history = (req, res) => {
    historyService.get_history(req.params.id_board, req.params.id_task, (req, err) => {
        if (err) res.send(err);
        res.json(req);
    });
};