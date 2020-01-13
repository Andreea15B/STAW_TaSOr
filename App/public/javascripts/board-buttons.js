var homeButton = document.getElementById("home-btn");
homeButton.onclick = function() {
  location.replace("/home");
};

var addTaskSubmit = document.getElementById("add-task-submit");
addTaskSubmit.onclick = function addTask(event) {
  var cardBodyDiv = document.getElementById("brd-card-body");
  const cardContent = document.createElement("button");
  cardContent.className = "button-add-task";
  cardContent.id = "button-task";

  var taskTitle = document.getElementById("task-title").value;
  cardContent.innerHTML = taskTitle;
  cardBodyDiv.appendChild(cardContent);
  
  event.preventDefault();
  var modal = document.getElementById("modal-task");
  modal.style.display = "none";
};
