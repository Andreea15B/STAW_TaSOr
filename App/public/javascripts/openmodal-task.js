var modal = document.getElementById("modal-task");
var closeButton = document.getElementById("close");
var addButton = document.getElementById("button-task");

addButton.onclick = function() {
    modal.style.display = "block";
    caches.keys().then(function(names) {
        for (let name of names)
            caches.delete(name);
    });
};

closeButton.onclick = function() {
    modal.style.display = "none";
};