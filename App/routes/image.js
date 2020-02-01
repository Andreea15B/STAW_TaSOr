var express = require("express"),
    Busboy = require('busboy'),
    path = require('path'),
    fs = require('fs');
var router = express.Router();

router.post('/', function (req, res, next) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        filename = "file_uploaded.jpg";
        var saveTo = path.join(__dirname, '../public/uploads/' + filename);
        file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', function () {
        res.redirect('back');
    });

    return req.pipe(busboy);
});

module.exports = router;