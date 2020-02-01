var express = require("express");
var router = express.Router();
var { ensureAuthenticated } = require("../middleware/auth");
var bycript = require("bcryptjs");
var fetch = require("node-fetch");
const https = require("https");
const agent = new https.Agent({
    rejectUnauthorized: false
})


router.get("/", ensureAuthenticated, (req, res) => {
    const initiale = req.session.username;
    res.render("user-settings", {
        username: initiale[0].toUpperCase() + initiale[1].toUpperCase()
    });
});

router.post("/", ensureAuthenticated, async(req, res) => {
    var { new_password, confirm_password, new_username } = req.body;
    var errors = [];
    const initiale = req.session.username;

    if (new_password != confirm_password) {
        errors.push({ msg: "Passwords does not match!" });
        res.render("user-settings", {
            errors,
            username: initiale[0].toUpperCase() + initiale[1].toUpperCase()
        });
    } else {
        if (new_password == '') {
            var hashed_password = undefined;
        } else {
            var hashed_password = await bycript.hash(new_password, 10);
        }
        if (new_username == '')
            new_username = undefined;

        const data = { username: new_username, password: hashed_password };
        fetch("https://localhost:3000/users/" + initiale, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            agent
        });
        res.redirect("/logout");
    }
});

module.exports = router;