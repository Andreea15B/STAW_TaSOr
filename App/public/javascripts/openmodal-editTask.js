function open_modal() {
    var modal_edit = document.getElementById("modal-editTask");
    var closeButton_edit = document.getElementById("close-edit");
    var taskButtons = document.getElementsByClassName("btn-task");
    var close_url = document.getElementById("close-url");
    var images_container = document.getElementById('image-task-container');
    var assignedUsersContainer = document.getElementById("show-assigned-users-div");

    var button = document.getElementById('share-task');
    var show = document.getElementById('show-url-container');
    var content_ = document.getElementById('content-url');

    var taskId = null;
    var length_ = 0;

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    for (var i = 0; i < taskButtons.length; i++) {
        taskButtons[i].onclick = async function(event) {
            taskId = event.toElement.id;
            modal_edit.style.display = "block";
            var api_tasks = 'http://localhost:3000/tasks/' + taskId;
            fetch(api_tasks)
                .then(response => response.json())
                .then(response => {
                    var taskTitleElement = document.getElementById("edit-task-title");
                    var taskDeadlineElement = document.getElementById("edit-task-deadline");
                    var taskDomainElement = document.getElementById("edit-task-domain");
                    var taskRegionElement = document.getElementById("edit-task-region");
                    var taskDescriptionElement = document.getElementById("edit-task-description");
                    var taskLinkElement = document.getElementById("edit-task-link");
                    taskTitleElement.value = response[0].title;
                    taskDeadlineElement.value = formatDate(response[0].deadline);
                    taskDomainElement.value = response[0].domain;
                    taskRegionElement.value = response[0].geographical_area;
                    taskDescriptionElement.value = response[0].description;
                    taskLinkElement.value = response[0].link;
                });

            var images_tasks = 'http://localhost:3000/images/' + taskId;
            if (images_container.childNodes.length == 1) {
                await fetch(images_tasks)
                    .then(response => response.json())
                    .then(response => {
                        length_ = response.length
                        if (length_ > 0) {
                            while (images_container.firstChild) {
                                images_container.removeChild(images_container.firstChild);
                            }
                            var image_res = response[0].image;
                            var arrayBufferView = new Uint8Array(image_res.data);
                            var blob = new Blob([arrayBufferView], { type: "image/jpg" })
                            var image = new Image();
                            image.src = window.URL.createObjectURL(blob);
                            image.style.width = '40px';
                            image.style.height = '40px';
                            image.setAttribute('class', 'image-task');
                            images_container.appendChild(image);
                        }
                    });
            }

            var assignedUsers = 'http://localhost:3000/task_users/' + taskId;
            fetch(assignedUsers)
                .then(response => response.json())
                .then(response => {
                    for (var i = 0; i < response.length; i++) {
                        var assignedUserElement = document.createElement('div');
                        assignedUserElement.setAttribute('class', 'user-div');
                        assignedUserElement.textContent = response[i].username;
                        assignedUsersContainer.appendChild(assignedUserElement);
                    }
                });

            function makeid(length) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }

            var value_content = 'http://localhost:3000/task/' + makeid(16) + taskId;

            button.addEventListener('click', (event) => {
                event.preventDefault();
                modal_edit.style.display = "none";
                show.style.display = 'block';
                content_.innerHTML = value_content;
            });
        };
    }

    close_url.onclick = function() {
        show.style.display = "none";
    }

    closeButton_edit.onclick = function() {
        modal_edit.style.display = "none";
    };

    var saveButton = document.getElementById("edit-task-submit");
    saveButton.onclick = function(event) {
        event.preventDefault();
        title = event.target.form.elements[1].value;
        deadline = event.target.form.elements[2].value;
        domain = event.target.form.elements[3].value;
        geographical_area = event.target.form.elements[4].value;
        description = event.target.form.elements[10].value;
        link = event.target.form.elements[6].value;
        arrayAssignedUsers = event.target.form.elements[7].selectedOptions;

        var data = { title, deadline, domain, geographical_area, description, link };
        fetch("http://localhost:3000/tasks/" + taskId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        var image = event.target.form.elements[5].value;
        var data = { id_task: taskId, image };
        var method = "";

        if (length_ == 0) {
            method = "POST";
        } else {
            method = "PUT";
        }
        fetch("http://localhost:3000/images", {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });


        [].forEach.call(arrayAssignedUsers, function(element) {
            username = element.value;
            var data = { id_task: taskId, username }
            fetch('http://localhost:3000/task_users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        });
        modal_edit.style.display = "none";
        location.reload();
    }

}

window.onload = function() {
    this.open_modal();
}