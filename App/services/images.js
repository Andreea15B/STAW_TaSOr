"use strict";

var Image = require('../models/image');

exports.assign_image = (newImage, result) => {
    var new_image = new Image(newImage);
    Image.create_image(new_image, (error, request) => result(request, error));
};

exports.update_image = (id, req, result) => {
    var new_image = new Image(req);
    Image.updateImage(id, new_image, (err, req) => result(req, err))
};

exports.get_images = (id_task, result) => {
    Image.get_image(id_task, (err, req) => result(req, err));
}