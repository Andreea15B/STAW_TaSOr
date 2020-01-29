var selectContainer = document.getElementById("assigned-users");
var boardName = document.getElementById("board_name").innerText;
var usersArray = []

// add users to the assign-users selectbox
fetch("http://localhost:3000/boards_members/" + boardName)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            usersArray.push(element.username);
        });

        for (var i = 0; i < usersArray.length; i++) {
            var newOption = document.createElement("option");
            newOption.setAttribute('class', 'user-option');
            newOption.value = usersArray[i];
            newOption.text = usersArray[i];
            selectContainer.appendChild(newOption);
        }
    });
