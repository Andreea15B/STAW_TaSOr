'use strict';

var imageService = require('../services/images');


exports.assign_image = (req, res) => {
    console.log(req.body.image);
    imageService.assign_image(req.body, (req, err) => {
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