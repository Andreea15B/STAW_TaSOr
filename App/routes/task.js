var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");

router.get('/task', (req, res) => res.render('tasks'));

router.post('/', (req, res) => {
  let { title, status, deadline, description, domain, geographical_area } = req.body;
  let errors = [];
  if (title == '') {
    errors.push({ msg: "Fill at least the title" });
    res.render('board', { errors });
  } else {
    if (errors.length > 0) res.render('board', { errors });
    else {
      try {
        const data = { title, status, deadline, description, domain, geographical_area };
        fetch("http://localhost:3000/tasks/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        res.redirect('/board');
      } catch {
        console.log("erori: ", errors);
      }
    }
  }
});
module.exports = router;
