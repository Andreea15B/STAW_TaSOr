function open_modal() {
    var modal_edit = document.getElementById("modal-editTask");
    var closeButton_edit = document.getElementById("close-edit");
    var taskButtons = document.getElementsByClassName("btn-task");
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

    for (var i = 0; i < taskButtons.length; i++) {
        taskButtons[i].onclick = function(event) {
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

    window.onclick = function(event) {
        if (event.target == modal_edit) {
            modal_edit.style.display = "none";
        }
    };

    var saveButton = document.getElementById("edit-task-submit");
    saveButton.onclick = function() {
        // TODO put data
        fetch("http://localhost:3000/tasks/" + taskId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
}

window.onload = function() {
    this.open_modal();
}