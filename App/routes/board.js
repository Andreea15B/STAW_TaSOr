var express = require("express");
var router = express.Router();
var { ensureAuthenticated } = require("../middleware/auth");
var fetch = require("node-fetch");

router.get("/", ensureAuthenticated, (req, res) => {
  const initiale = req.session.username;

  Promise.all([
    fetch("http://localhost:3000/tasks/todo").then(response => response.json()),
    fetch("http://localhost:3000/tasks/inprogress").then(response => response.json()),
    fetch("http://localhost:3000/tasks/done").then(response => response.json())
  ])
    .then(response => {
      res.render("board", {
        username: initiale[0].toUpperCase() + initiale[1].toUpperCase(),
        tasksToDo: response[0],
        tasksInProgress: response[1],
        tasksDone: response[2]
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
