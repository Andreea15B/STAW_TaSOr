var to_do_tasks = document.getElementById("to-do");
var in_progress_tasks = document.getElementById("in-progress");
var done_tasks = document.getElementById("done");
var board_name = document.getElementById('board_name').innerText;

if (navigator.onLine === true) {
    fetch("https://localhost:3000/tasks/" + board_name + "/" + "to-do")
        .then(response => response.json())
        .then(response => {
            to_do_tasks.innerHTML = response.length;
        });

    fetch("https://localhost:3000/tasks/" + board_name + "/" + "in-progress")
        .then(response => response.json())
        .then(response => {
            in_progress_tasks.innerHTML = response.length;
        });
    fetch("https://localhost:3000/tasks/" + board_name + "/" + "done")
        .then(response => response.json())
        .then(response => {
            done_tasks.innerHTML = response.length;
        });
}