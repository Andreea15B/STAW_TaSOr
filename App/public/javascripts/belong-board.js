var container_belong = document.getElementById('board-belong');
var username = document.getElementById('username').innerText;
var empty_state_belong = document.getElementById('empty-state-boards-belong');

var api_boards = 'https://localhost:3000/boards_get/' + username;
var boards = []
fetch(api_boards)
    .then(response => response.json())
    .then(response => {
        var length = response.length;
        var numbers = 0;
        if (response.length != 0) {
            response.forEach(element => {
                if (element.created_by != username) {
                    var div_ = document.createElement('div');
                    div_.innerHTML = element.title;
                    div_.setAttribute('id', element.id_board)
                    div_.setAttribute('class', 'board-title-request');
                    div_.addEventListener('click', function(ev) {
                        redirect_page(ev);
                    }, false)
                    container_belong.appendChild(div_);
                } else {
                    numbers = numbers + 1;
                }
            });
            if (numbers == length) {
                empty_state_belong.style.display = "flex";
            }
        } else {
            empty_state_belong.style.display = "flex";
        }
    });