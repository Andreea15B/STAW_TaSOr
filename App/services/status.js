"use strict";

var Status = require('../models/status');

exports.add_status = (name, result) => {
    var new_status = new Status(name)
    Status.addStatus(new_status, (error, request) => result(request, error));
};