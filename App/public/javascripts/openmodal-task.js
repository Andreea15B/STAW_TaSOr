var modal = document.getElementById("modal-task");
var button = document.getElementById("button-task");
var span = document.getElementsByClassName("close")[0];

button.onclick = function() {
  modal.style.display = "block";
};

span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
