"user strict";
var sql = require("../config/db");

class Image {
    constructor(image) {
        this.id_task = image.id_task;
        this.image = image.image;
    }
};

Image.create_image = (newImage, result) => {
    sql.query("INSERT INTO images set ?", newImage, (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res.insertId);
        }
    });
}

Image.update_image = (image, result) => {
    var values = [image.image, image.id_task];
    var mm = "UPDATE images set image = ? WHERE id_task = ?"
    sql.query(mm, values, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Image.get_image = (id_task, result) => {
    sql.query("SELECT image FROM images WHERE id_task = ?", id_task, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = Image;