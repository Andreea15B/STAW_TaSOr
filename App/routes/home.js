var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../config/auth');


router.get('/', ensureAuthenticated, (req, res) => {
    const initiale = req.session.username;
    res.render('home', { username: initiale[0].toUpperCase() + initiale[1].toUpperCase() });
});

module.exports = router;