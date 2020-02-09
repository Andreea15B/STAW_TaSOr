var myParent = document.getElementById("select-container");
var board_name = document.getElementById('board_name').innerText;
var username_session = document.getElementById('username').innerText;
var array = [];
var board_members = [];

if (navigator.onLine === true) {
    var button_delete = document.getElementById('delete-board-button');
    button_delete.onclick = () => {
        fetch("https://localhost:3000/board_add/" + board_name, {
            method: 'delete'
        });
        caches.keys().then(function(names) {
            for (let name of names) caches.delete(name);
        });
        window.location.href = "https://localhost:3000/home";
    }
}

fetch('https://localhost:3000/boards_members/' + board_name)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            board_members.push(element.username);
        });
    });

fetch("https://localhost:3000/users")
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            var ok = 1;
            for (var i = 0; i < board_members.length; i++)
                if (board_members[i] == element.username)
                    ok = 0;
            if (ok == 1)
                array.push(element.username);
        });
        //Create and append select list
        var selectList = document.createElement("select");
        selectList.id = "mySelect";
        myParent.appendChild(selectList);
        for (var i = 0; i < array.length; i++)
            if (array[i] == username_session)
                array.splice(i, 1);
        //Create and append the options
        for (var i = 0; i < array.length; i++) {
            var option = document.createElement("option");
            option.value = array[i];
            option.text = array[i];
            selectList.appendChild(option);
        }
    });


var members_container = document.getElementById('members-container');
fetch('https://localhost:3000/boards_members/' + board_name)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            var div_ = document.createElement('span');
            div_.innerHTML = element.username[0] + element.username[1];
            div_.setAttribute('class', 'username-member');
            members_container.appendChild(div_);

            var overlay = document.createElement('div');
            overlay.setAttribute('class', 'overlay-container')

            var overlay_content = document.createElement('div');
            overlay_content.setAttribute('class', 'overlay-content');
            overlay_content.innerHTML = 'X';
            overlay.appendChild(overlay_content);

            members_container.appendChild(overlay);

        });
    });



var formular = document.getElementById("add-member-form");
formular.addEventListener('submit', (event) => {
    event.preventDefault();
    var username = event.target.elements[0].value;

    if (navigator.onLine === true) {
        var data = { board_name, username };
        fetch('https://localhost:3000/boards_members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        var history = username_session + ' add new member : ' + username;
        var data = { name_board, activity: history }
        fetch('https://localhost:3000/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    caches.keys().then(function(names) {
        for (let name of names)
            caches.delete(name);
    });

    window.location.href = "https://localhost:3000/board/" + board_name;

});

var myUsername = document.getElementById("username").innerText;
itIsHereAlready = 0;
fetch('https://localhost:3000/boards_members/' + board_name)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            if (element.username == myUsername) itIsHereAlready = 1;
        });
        if (itIsHereAlready == 0) {
            var data = { board_name, username: myUsername };
            fetch('https://localhost:3000/boards_members', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            window.location.href = "https://localhost:3000/board/" + board_name;
        }
    });

