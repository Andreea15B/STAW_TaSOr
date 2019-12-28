var express = require('express');
var router = express.Router();

router.get('/login', (req, res) => res.sendFile(__dirname + '/htmlFiles/login.html'));
router.get('/register', (req, res) => res.send('register'));

module.exports = router;