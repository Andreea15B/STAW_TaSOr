var modal = document.getElementById("modal-task");
var closeButton = document.getElementsByClassName("close")[0];
var addButton = document.getElementById("button-task");

addButton.onclick = function() {
  modal.style.display = "block";
};

closeButton.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
