var express = require("express");
var router = express.Router();
var { ensureAuthenticated } = require("../middleware/auth");

router.get("/:name", ensureAuthenticated, (req, res) => {
    const initiale = req.session.username;
    res.render("board", {
        username: initiale,
        name_board: req.params.name
    });

});

module.exports = router;