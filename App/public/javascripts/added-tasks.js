var container_to_do = document.getElementById('to-do-card');
var container_in_progress = document.getElementById('in-progress-card');
var container_done = document.getElementById('done-card');
var username = document.getElementById('username').innerText;
var name_board = document.getElementById('board_name').innerText;

var api_tasks = 'http://localhost:3000/tasks/' + name_board;
var id_to_update = null;

fetch(api_tasks + '/todo')
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
            var div_ = document.createElement('div');
            var span_title = document.createElement('span');
            span_title.innerHTML = element.title;
            div_.appendChild(span_title);

            var div_empty = document.createElement('div');
            div_empty.setAttribute('class', 'dots-image')

            var image = document.createElement("IMG");
            image.setAttribute('src', '/images/3_dots.png');
            image.setAttribute('width', '3px');
            image.setAttribute('heigth', '5px');
            image.setAttribute('class', 'dots-image-style');

            div_empty.appendChild(image);
            div_.appendChild(div_empty)
                // div_.innerHTML = element.title;
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

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    id_to_update = ev.target.id;
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, where) {
    ev.preventDefault();
    var data = { status: where };
    if (ev.target.hasAttribute('draggable') == false) {
        fetch('http://localhost:3000/tasks/' + id_to_update, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

}