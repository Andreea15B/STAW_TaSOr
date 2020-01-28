'use strict';

var linkService = require('../services/links');


exports.assign_link = (req, res) => {
    console.log("controller assign_link");
    linkService.assign_link(req.body, (req, err) => {
        if (err) res.send(err);
        res.json(req);
    });
};

exports.get_link = (req, res) => {
    linkService.get_links(req.params.id_task, (req, err) => {
        if (err) res.send(err);
        res.json(req);
    });
};