var modal = document.getElementById("myModal");
var button = document.getElementById("myButton");
var span = document.getElementsByClassName("closed")[0];

button.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}