var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;