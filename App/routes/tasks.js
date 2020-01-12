var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");

// router.get("/tasks", (req, res) => res.render("tasks"));

router.post("/", (req, res) => {
  let { title } = req.body;
  let errors = [];
  if (title == '') {
    errors.push({ msg: "Fill at least the title" });
    res.render('board', { errors });
  } else {
    if (errors.length > 0) res.render('board', { errors });
    else {
      try {
        const data = { title };
        fetch("http://localhost:3000/tasks/", {
          method: "POST",
          body: JSON.stringify(data)
        });
      } catch {
        console.log(errors);
      }
    }
  }
});
module.exports = router;
