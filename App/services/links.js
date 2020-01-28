"use strict";

var Link = require('../models/link');

exports.assign_link = (link, result) => {
    console.log("services assign_link");
    var new_link = new Link(link);
    Link.create_link(newLink, (err, req) => result(req, err));
};

exports.get_links = (id_task, result) => {
    Link.get_link(id_task, (err, req) => result(req, err));
}