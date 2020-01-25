var myParent = document.getElementById("select-container");

//Create array of options to be added
var array = [];

fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
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
var board_name = document.getElementById('board_name').innerText;

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