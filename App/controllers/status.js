'use strict';

var statusService = require('../services/status');

exports.add_status = (req, res) => {
    statusService.add_status(req.body, (req, err) => {
        if (err)
            res.send(err);
        res.json(req);
    });
}