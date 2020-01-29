'use strict';

var imageService = require('../services/images');
var fs = require("fs");
var path = require("path");


exports.assign_image = (req, res) => {
    if (req.body.image != "") {
        var image_ = path.resolve('images', req.body.image.replace(/^.*\\/, ""));
        console.log(image_);
        var id_task = req.body.id_task;
        var image = fs.readFileSync(image_);
        var data = { id_task, image };
        imageService.assign_image(data, (req, err) => {
            if (err)
                res.send(err);
            else {
                res.json(req);
            }
            res.end();
        });
    }

};

exports.update_image = (req, res) => {
    if (req.body.image != "") {
        var image_ = path.resolve('images', req.body.image.replace(/^.*\\/, ""));
        var id_task = req.body.id_task;
        var image = fs.readFileSync(image_);
        imageService.update_image({ id_task, image }, (req, err) => {
            if (err) {
                res.send(err);
            } else {
                res.json(req);
            }

            res.end();
        });
    }
};

exports.get_image = (req, res) => {
    imageService.get_images(req.params.id_task, (req, err) => {
        if (err)
            res.send(err);
        res.json(req);
    });
};