var container = document.getElementById('board-created');
var username = document.getElementById('username').innerText;

var api_boards = 'http://localhost:3000/boards/' + username;

fetch(api_boards)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            var div_ = document.createElement('div');
            div_.innerHTML = element.title;
            div_.setAttribute('id', element.id_board)
            div_.setAttribute('class', 'board-title-request');
            container.appendChild(div_);
        });

    });