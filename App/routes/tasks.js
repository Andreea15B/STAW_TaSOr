var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");
var bycript = require("bcryptjs");

router.get('/');
router.post('/', (req, res) => {
  let { title } = req.body;
  let errors = [];
  if (errors.length > 0) res.render('board', { errors });
  else {
    try {
      const data = { title };
      fetch('http://localhost:3000/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch {
      console.log(errors);
    }
  }
});
module.exports = router;