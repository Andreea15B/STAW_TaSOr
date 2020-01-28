var board_name = document.getElementById('board_name').innerText;
var history_container = document.getElementById('history_content');

var history_api = "http://localhost:3000/history/" + board_name;

fetch(history_api)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            var div_ = document.createElement('div');
            div_.innerHTML = element.activity;
            history_container.appendChild(div_);
        });
    })