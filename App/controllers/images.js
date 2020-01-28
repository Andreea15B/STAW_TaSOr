'use strict';

var imageService = require('../services/images');
var fs = require("fs");


exports.assign_image = (req, res) => {
    var image_ = 'C:/Users/Andreea/Desktop/' + req.body.image.replace(/^.*\\/, "");
    var id_task = req.body.id_task;
    var image = fs.readFileSync(image_);
    console.log('post');

    var data = { id_task, image };
    imageService.assign_image(data, (req, err) => {
        if (err)
            res.send(err);
        res.json(req);
        res.end();
    });
};

exports.update_image = (req, res) => {
    var image_ = 'C:/Users/Andreea/Desktop/' + req.body.image.replace(/^.*\\/, "");
    var id_task = req.body.id_task;
    var image = fs.readFileSync(image_);

    console.log('update');

    imageService.update_image({ id_task, image }, (req, err) => {
        if (err) {
            res.send(err);
        } else {
            res.json(req);
        }

        res.end();
    });
};

exports.get_image = (req, res) => {
    imageService.get_images(req.params.id_task, (req, err) => {
        if (err)
            res.send(err);
        res.json(req);
    });
};