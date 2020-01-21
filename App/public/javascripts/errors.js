var error_container = document.getElementsByClassName('error-container')[0];
var button = document.getElementsByClassName('click-area')[0];

if (error_container != undefined) {
    button.onclick = function() {
        error_container.style.display = "none";
    }
}