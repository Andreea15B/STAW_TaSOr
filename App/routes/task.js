var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
var { ensureAuthenticated } = require('../middleware/auth');


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

router.get('/:name', (req, res) => {
    var id = req.params.name;
    var send_ = id.slice(16);

    fetch('http://localhost:3000/tasks/' + send_)
        .then(response => response.json())
        .then(response => {
            res.render('task', { task: response[0] })
        });
});

router.post('/', ensureAuthenticated, (req, res) => {
    let { board_to_add, title, status, deadline, description, domain, geographical_area } = req.body;

    if (!deadline) deadline = '0000-00-00';
    var date_ = formatDate(Date.now());

    try {
        const data = { title, status, created_at: date_, deadline, description, domain, geographical_area, name_board: board_to_add };
        fetch("http://localhost:3000/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        res.redirect('/board/' + board_to_add);
    } catch {
        console.log("errors on post for task");
    }
});

module.exports = router;