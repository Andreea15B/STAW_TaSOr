var modal = document.getElementById("modal-task");
var closeButtons = document.getElementsByClassName("close");
var addButtons = document.getElementsByClassName("button-add-task");

for (var i=0; i < addButtons.length; i++) {
  addButtons[i].onclick = function() {
    modal.style.display = "block";
  }
}

for (var i=0; i < closeButtons.length; i++) {
  closeButtons[i].onclick = function() {
    modal.style.display = "none";
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
