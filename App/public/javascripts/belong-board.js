var container_belong = document.getElementById('board-belong');
var username = document.getElementById('username').innerText;

var api_boards = 'http://localhost:3000/boards_get/' + username;
var boards = []
fetch(api_boards)
    .then(response => response.json())
    .then(response => {
        if (response.length == 0) {
            var div1 = document.createElement('div');
            var image = document.createElement('img');
            image.src = "/images/img_519534.png";
            image.setAttribute('width', '20px');
            image.setAttribute('heigth', '30px');
            image.style.filter = 'opacity(50%)';
            div1.appendChild(image);

            var p = document.createElement('p');
            p.innerHTML = "No boards here";
            p.style.fontFamily = 'oblic';
            div1.appendChild(p);

            container_belong.appendChild(div1);

        } else {
            response.forEach(element => {
                var div_ = document.createElement('div');
                div_.innerHTML = element.title;
                div_.setAttribute('id', element.id_board)
                div_.setAttribute('class', 'board-title-request');
                div_.addEventListener('click', function(ev) {
                    redirect_page(ev);
                }, false)
                container_belong.appendChild(div_);
            });
        }
    });