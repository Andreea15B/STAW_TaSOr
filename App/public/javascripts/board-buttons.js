// click on home button:
var homeButton = document.getElementById("home-btn");
homeButton.onclick = function() {
  location.replace("/home");
};


// check if there are tasks in cards
var inProgressCard = document.getElementById("in-progress-card");
var doneCard = document.getElementById("done-card");

