var container_to_do = document.getElementById('to-do-card');
var container_in_progress = document.getElementById('in-progress-card');
var container_done = document.getElementById('done-card');
var username = document.getElementById('username').innerText;
var name_board = document.getElementById('board_name').innerText;

var api_tasks = 'https://localhost:3000/tasks/' + name_board;
var id_to_update = null;

if (navigator.onLine === true) {

    fetch(api_tasks + '/to-do')
        .then(response => response.json())
        .then(response => {
            response.forEach(element => {
                var div_ = document.createElement('button');
                div_.innerHTML = element.title;
                div_.setAttribute('id', element.id_task)
                div_.setAttribute('class', 'btn-task');
                div_.setAttribute('draggable', true);
                div_.addEventListener("dragstart", function(ev) {
                    drag(ev);
                }, false);
                container_to_do.appendChild(div_);
            });

        });

    fetch(api_tasks + '/in-progress')
        .then(response => response.json())
        .then(response => {
            response.forEach(element => {
                var div_ = document.createElement('button');
                div_.innerHTML = element.title;
                div_.setAttribute('id', element.id_task)
                div_.setAttribute('class', 'btn-task');
                div_.setAttribute('draggable', true);
                div_.addEventListener("dragstart", function(ev) {
                    drag(ev);
                }, false);
                container_in_progress.appendChild(div_);
            });
        });


    fetch(api_tasks + '/done')
        .then(response => response.json())
        .then(response => {
            response.forEach(element => {
                var div_ = document.createElement('button');
                div_.innerHTML = element.title;
                div_.setAttribute('id', element.id_task)
                div_.setAttribute('class', 'btn-task');
                div_.setAttribute('draggable', true);
                div_.addEventListener("dragstart", function(ev) {
                    drag(ev);
                }, false);
                container_done.appendChild(div_);
            });

        });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    id_to_update = ev.target.id;
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, where) {
    ev.preventDefault();
    if (ev.target.hasAttribute('draggable') == false) {
        if (navigator.onLine === true) {
            fetch('https://localhost:3000/tasks/' + id_to_update)
                .then(response => response.json())
                .then(response => {
                    let link = '';

                    try {
                        link = response[0].link;
                    } catch (err) {}

                    if (link == "" && where == "done")
                        alert("To be done, a task must have a link added.Have a nice day, team TASOR! :)");
                    else {
                        var data = { status: where };
                        fetch('https://localhost:3000/tasks/' + id_to_update, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        });

                        var history = username + ' move task ';
                        fetch('https://localhost:3000/tasks/' + id_to_update)
                            .then(response => response.json())
                            .then(response => {
                                var title = response[0].title;
                                history = history + title + ' in ' + where;
                                var data = { name_board, id_task: id_to_update, activity: history }
                                fetch('https://localhost:3000/history', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(data),
                                });
                                location.reload();
                            })

                        caches.keys().then(function(names) {
                            for (let name of names)
                                caches.delete(name);
                        });

                        var data = ev.dataTransfer.getData("text");
                        ev.target.appendChild(document.getElementById(data));
                    }

                });
        }

    }

}