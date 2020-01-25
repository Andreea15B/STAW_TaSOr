function open_modal() {
  var modal_edit = document.getElementById("modal-editTask");
  var closeButton_edit = document.getElementById("close-edit");
  var taskButtons = document.getElementsByClassName("btn-task");

  for (var i = 0; i < taskButtons.length; i++) {
    taskButtons[i].onclick = function() {
      modal_edit.style.display = "block";
    };
  }

  closeButton_edit.onclick = function() {
    modal_edit.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal_edit) {
      modal_edit.style.display = "none";
    }
  };
}

window.onload = function(){
  this.open_modal();
}