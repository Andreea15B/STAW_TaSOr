var users_number_container = document.getElementById("users-number")
var boards_number_container = document.getElementById("boards-number")
var tasks_number_container = document.getElementById("tasks-number")

if (navigator.onLine === true) {

    caches.keys().then(function(names) {
        for (let name of names)
            caches.delete(name);
    });
    fetch("https://localhost:3000/users")
        .then(response => response.json())
        .then(response => {
            users_number_container.innerHTML = response.length;
        });

    fetch("https://localhost:3000/boards")
        .then(response => response.json())
        .then(response => {
            boards_number_container.innerHTML = response.length;
        });

    fetch("https://localhost:3000/tasks")
        .then(response => response.json())
        .then(response => {
            tasks_number_container.innerHTML = response.length;
        });

} else {
    console.log('ieii offline');
}