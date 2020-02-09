var container = document.getElementById("board-created");
var username = document.getElementById("username").innerText;
var empty_state = document.getElementById("empty-state-boards");

var api_boards = "https://localhost:3000/boards/" + username;
var tasks_user = "https://localhost:3000/get_task_users/" + username;
var all_tasks = "https://localhost:3000/tasks/"

// if (Notification.permission == 'granted') {
//     navigator.serviceWorker.getRegistration().then(function(reg) {
//         reg.showNotification('Hello world!');
//     });
// }

fetch(tasks_user)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            fetch(all_tasks + element.id_task)
                .then(response => response.json())
                .then(response => {
                    var dateParts = response[0].deadline.split("-");
                    var jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
                    var difference = parseInt(Math.ceil((jsDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)), 10) + 1;
                    if (response[0].status != 'done') {
                        if (difference == 1)
                            if (Notification.permission == 'granted') {
                                navigator.serviceWorker.getRegistration().then(function(reg) {
                                    reg.showNotification('Tasor', {
                                        body: 'Deadline for task ' + response[0].title + ' is close!',
                                        icon: '../images/logo.png'
                                    });
                                });
                            }
                        if (difference < 0)
                            if (Notification.permission == 'granted') {
                                navigator.serviceWorker.getRegistration().then(function(reg) {
                                    reg.showNotification('Tasor', {
                                        body: 'You just missed the deadline for task ' + response[0].title + ' !',
                                        icon: '../images/logo.png'
                                    });
                                });
                            }
                    }

                });



        });
    });

fetch(api_boards)
    .then(response => response.json())
    .then(response => {
        if (response.length == 0) {
            empty_state.style.display = "flex";
        } else {

            response.forEach(element => {
                var div_ = document.createElement('div');
                div_.innerHTML = element.title;
                div_.setAttribute('id', element.id_board)
                div_.setAttribute('class', 'board-title-request');
                div_.addEventListener('click', function(ev) {
                    redirect_page(ev);
                }, false)
                container.appendChild(div_);
            });
        }
    });

function redirect_page(event) {
    var board_name = event.target.innerText;
    caches.keys().then(function(names) {
        for (let name of names)
            caches.delete(name);
    });
    window.location.href = "https://localhost:3000/board/" + board_name;
}