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

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// router.get('/task', (req, res) => res.render('tasks'));

router.get('/:name', (req, res) => {
    console.log(makeid(16));

    var id = makeid(16) + req.params.name;
    var send_ = id.slice(16)
    res.render('task', { id: send_ })
});

router.post('/', ensureAuthenticated, (req, res) => {
    let { board_to_add, title, status, deadline, description, domain, geographical_area } = req.body;

    if (!deadline) deadline = '0000-00-00';
    var date_ = formatDate(Date.now());
    const initiale = req.session.username;

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
        console.log("errors");
    }
});
module.exports = router;