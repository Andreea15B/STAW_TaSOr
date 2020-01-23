var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../middleware/auth');
var fetch = require("node-fetch");

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var date_ = [year, month, day].join('-');
    var hours = [hour, minutes].join('-');
    return [date_, hours].join(' ');
}

router.get('/', ensureAuthenticated, (req, res) => {
    const initiale = req.session.username;
    fetch('http://localhost:3000/boards/' + initiale)
        .then(response => response.json())
        .then(response => {
            res.render('home', { username: initiale[0].toUpperCase() + initiale[1].toUpperCase(), boards: response });

        });
});

router.post('/', ensureAuthenticated, (req, res) => {
    var { name } = req.body;
    var created_by = req.session.username;
    var date_ = formatDate(Date.now());
    var errors = [];


    fetch('http://localhost:3000/board/' + name)
        .then(response => response.json())
        .then(response => {
            if (response.length > 0) {
                errors.push({ msg: 'Board already exists' });
                fetch('http://localhost:3000/boards/' + created_by)
                    .then(response => response.json())
                    .then(response => {
                        res.render('home', { username: created_by[0].toUpperCase() + created_by[1].toUpperCase(), errors, boards: response });
                    });
            } else {
                const data = { title: name, created_by: created_by, created_at: date_, updated_at: date_ };

                fetch('http://localhost:3000/boards/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                fetch('http://localhost:3000/boards/' + created_by)
                    .then(response => response.json())
                    .then(response => {
                        res.render('home', { username: created_by[0].toUpperCase() + created_by[1].toUpperCase(), boards: response });
                    });
            }
        });
});

module.exports = router;