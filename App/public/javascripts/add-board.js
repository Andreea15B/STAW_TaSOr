var container = document.getElementById('board-created');
var username = document.getElementById('username').innerText;
var empty_state = document.getElementById('empty-state-boards');

var api_boards = 'https://localhost:3000/boards/' + username;

if (navigator.onLine === true) {
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

}