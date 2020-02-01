var board_name = document.getElementById('board_name').innerText;
var history_container = document.getElementById('history_content');

var history_api = "https://localhost:3000/history/" + board_name;

fetch(history_api)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            var main_div = document.createElement('div')
            main_div.setAttribute('class', 'info-history');
            var date_ = document.createElement('span');
            date_.innerHTML = element.date_update + ': ';
            main_div.appendChild(date_);
            var div_ = document.createElement('span');
            div_.innerHTML = element.activity;
            main_div.appendChild(div_);
            history_container.appendChild(main_div);
        });
    })