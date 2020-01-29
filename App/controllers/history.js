'use strict';

var historyService = require('../services/history');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (minutes < 10)
        minutes = '0' + minutes
    if (hour < 10)
        hour = '0' + hour

    var date_ = [year, month, day].join('-');
    var hours = [hour, minutes].join(':');
    return [date_, hours].join(' ');
}

exports.create_history = (req, res) => {
    var data = {
        name_board: req.body.name_board,
        id_task: req.body.id_task,
        activity: req.body.activity,
        date_update: formatDate(Date.now())
    }
    historyService.create_history(data, (req, err) => {
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