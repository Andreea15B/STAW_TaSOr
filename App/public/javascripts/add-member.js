var myParent = document.getElementById("select-container");
var board_name = document.getElementById('board_name').innerText;
//Create array of options to be added
var array = [];
var board_members = [];

fetch('http://localhost:3000/boards_members/' + board_name)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            board_members.push(element.username);
        });
    });

fetch("http://localhost:3000/users")
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

        //Create and append the options
        for (var i = 0; i < array.length; i++) {
            var option = document.createElement("option");
            option.value = array[i];
            option.text = array[i];
            selectList.appendChild(option);
        }
    });


var members_container = document.getElementById('members-container');
fetch('http://localhost:3000/boards_members/' + board_name)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            var div_ = document.createElement('span');
            div_.innerHTML = element.username[0] + element.username[1];
            div_.setAttribute('class', 'username-member');
            members_container.appendChild(div_);
        });
    });



var formular = document.getElementById("add-member-form");
formular.addEventListener('submit', (event) => {
    event.preventDefault();
    var username = event.target.elements[0].value;

    var data = { board_name, username };
    fetch('http://localhost:3000/boards_members', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    window.location.href = "http://localhost:3000/board/" + board_name;

});