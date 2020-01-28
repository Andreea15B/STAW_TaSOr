'use strict';

var historyService = require('../services/history');

exports.create_history = (req, res) => {
    historyService.create_history(req.body, (req, err) => {
        if (err) res.send(err);
        else
            res.json(req);
        res.end();
    });
};

exports.get_history = (req, res) => {
    historyService.get_history(req.params.name_board, (req, err) => {
        if (err) res.send(err);
        else
            res.json(req);
    });
};