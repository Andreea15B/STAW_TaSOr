function open_modal() {
    var modal_edit = document.getElementById("modal-editTask");
    var closeButton_edit = document.getElementById("close-edit");
    var taskButtons = document.getElementsByClassName("btn-task");
    var dotsButtons = document.getElementsByClassName("fa");
    var menuDots = document.getElementById("menu-dots");
    var editButtons = document.getElementsByClassName("menu-edit");
    var close_url = document.getElementById("close-url");

    var button = document.getElementById('share-task');
    var show = document.getElementById('show-url-container');
    var content_ = document.getElementById('content-url');

    var taskId = null;

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    for (var i = 0; i < dotsButtons.length; i++) {
        dotsButtons[i].onclick = function(event) {
            menuDots.style.display = "flex";
        }
    }

    // close the menu when clicking anywhere else -- NOT WORKING
    window.onclick = function(event) {
        if (event.target == menuDots) {
            menuDots.style.display = "none";
        }
    };

    for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].onclick = function(event) {
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
                    taskTitleElement.value = response[0].title;
                    taskDeadlineElement.value = formatDate(response[0].deadline);
                    taskDomainElement.value = response[0].domain;
                    taskRegionElement.value = response[0].geographical_area;
                    taskDescriptionElement.value = response[0].description;
                });

            var images_tasks = 'http://localhost:3000/images/' + taskId;
            var images_container = document.getElementById('image-task-container');
            fetch(images_tasks)
                .then(response => response.json())
                .then(response => {
                    var image_res = response[0].image;
                    var arrayBufferView = new Uint8Array(image_res.data);
                    var blob = new Blob([arrayBufferView], { type: "image/jpeg" })
                    var image = new Image();
                    image.src = window.URL.createObjectURL(blob);
                    image.style.width = '40px';
                    image.style.height = '40px';
                    images_container.appendChild(image);
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
        var data = { title, deadline, domain, geographical_area, description };
        fetch("http://localhost:3000/tasks/" + taskId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        modal_edit.style.display = "none";
        location.reload();
    }
}

window.onload = function() {
    this.open_modal();
}