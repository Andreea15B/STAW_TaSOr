var modal_member = document.getElementById("add-member-modal");
var button = document.getElementById("add-button");
var span = document.getElementsByClassName("closed")[0];

button.onclick = function() {
    modal_member.style.display = "block";
}

span.onclick = function() {
    modal_member.style.display = "none";
}