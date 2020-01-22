var express = require("express");
var router = express.Router();
var { ensureAuthenticated } = require("../middleware/auth");
var fetch = require("node-fetch");

router.get("/", ensureAuthenticated, (req, res) => {
    const initiale = req.session.username;
    var status = 'todo';
    fetch('http://localhost:3000/tasks/' + status)
        .then(response => response.json())
        .then(response => {
            res.render('board', { username: initiale[0].toUpperCase() + initiale[1].toUpperCase(), tasks: response });
        });
});

module.exports = router;