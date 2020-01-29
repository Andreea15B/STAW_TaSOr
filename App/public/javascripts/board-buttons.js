// click on home button:
var homeButton = document.getElementById("home-btn");
homeButton.onclick = function() {
  location.replace("/home");
};

function validateFormCreate() {
  var title = document.forms["newTask-form"]["title"].value;
  if(title == '') {
    alert("Please specify the title of the task.");
    return false;
  }
}

function validateFormEdit() {
  var title = document.forms["editTask-form"]["title"].value;
  if(title == '') {
    alert("Please specify the title of the task.");
    return false;
  }
  var link = document.forms["editTask-form"]["link"].value;
  console.log(link);
  if(!"https://.*".test(link)) {
    console.log("test if entered");
    alert("Please enter a valid URL.");
    return false;
  }
  return true;
}