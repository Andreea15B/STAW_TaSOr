'use strict';

var imageService = require('../services/images');
var fs = require("fs");


exports.assign_image = (req, res) => {
    var image = fs.readFileSync(req.body.image);
    var id_task = req.body.id_task;

    imageService.assign_image({ id_task, image }, (req, err) => {
        if (err)
            res.send(err);
        res.json(req);
    });
};

exports.update_image = (req, res) => {
    imageService.update_image(req.params, (req, err) => {
        if (err)
            res.send(err);
        res.json(req);
    });
};

exports.get_image = (req, res) => {
    imageService.get_images(req.params.id_task, (req, err) => {
        if (err)
            res.send(err);
        res.json(req);
    });
};