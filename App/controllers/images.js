'use strict';

var imageService = require('../services/images');
// var fs = require("fs");
// var path = require("path");

exports.assign_image = (req, res) => {
    imageService.assign_image(req.body, (image, err) => {
        if (err) res.send(err);
        res.json(image);
    });
};

exports.update_image = (req, res) => {
    imageService.update_image(req.body.id_task, req.body, (image, err) => {
        if (err) res.send(err);
        res.json(image);
    });
};

exports.get_image = (req, res) => {
    imageService.get_images(req.params.id_task, (req, err) => {
        if (err) res.send(err);
        res.json(req);
    });
};