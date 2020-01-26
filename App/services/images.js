"use strict";

var Image = require('../models/image');

exports.assign_image = (newImage, result) => {
    Image.create_image(newImage, (err, req) => result(req, err));
};

exports.update_image = (newImage, result) => {
    Image.update_image(newImage, (err, req) => result(req, err));
};

exports.get_images = (id_task, result) => {
    Image.get_image(id_task, (err, req) => result(req, err));
}