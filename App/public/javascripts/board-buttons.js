// click on home button:
var homeButton = document.getElementById("home-btn");
homeButton.onclick = function() {
  location.replace("/home");
};

function validateForm() {
  var title = document.forms["newTask-form"]["title"].value;
  if(title == '') {
    alert("Please specify the title of the task.");
    return false;
  }
}