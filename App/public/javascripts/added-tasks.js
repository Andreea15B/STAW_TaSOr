var container_to_do = document.getElementById("to-do-card");
var container_in_progress = document.getElementById("in-progress-card");
var container_done = document.getElementById("done-card");
var username = document.getElementById("username").innerText;
var name_board = document.getElementById("board_name").innerText;
var modal_edit = document.getElementById("modal-editTask");

var closeButton_edit = document.getElementById("close-edit");
var taskButtons = document.getElementsByClassName("btn-task");
var close_url = document.getElementById("close-url");
var images_container = document.getElementById("image-task-container");
var assignedUsersContainer = document.getElementById("show-assigned-users-div");

var show = document.getElementById("show-url-container");
var content_ = document.getElementById("content-url");

var taskId = null;
var length_ = 0;
var taskDomain = null;

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

var api_tasks = "https://localhost:3000/tasks/" + name_board;
var id_to_update = null;

fetch(api_tasks + "/to-do")
  .then(response => response.json())
  .then(response => {
    response.forEach(element => {
      var div_ = document.createElement("button");
      div_.innerHTML = element.title;
      div_.setAttribute("id", element.id_task);
      div_.setAttribute("class", "btn-task");
      div_.setAttribute("draggable", true);
      div_.addEventListener(
        "dragstart",
        function(ev) {
          drag(ev);
        },
        false
      );
      flag = 0;
      div_.addEventListener("click", function(event) {
        addModal(event);
      });

      container_to_do.appendChild(div_);
    });
  });

fetch(api_tasks + "/in-progress")
  .then(response => response.json())
  .then(response => {
    response.forEach(element => {
      var div_ = document.createElement("button");
      div_.innerHTML = element.title;
      div_.setAttribute("id", element.id_task);
      div_.setAttribute("class", "btn-task");
      div_.setAttribute("draggable", true);
      div_.addEventListener(
        "dragstart",
        function(ev) {
          drag(ev);
        },
        false
      );
      flag = 0;
      div_.addEventListener("click", function(event) {
        addModal(event);
      });
      container_in_progress.appendChild(div_);
    });
  });

fetch(api_tasks + "/done")
  .then(response => response.json())
  .then(response => {
    response.forEach(element => {
      var div_ = document.createElement("button");
      div_.innerHTML = element.title;
      div_.setAttribute("id", element.id_task);
      div_.setAttribute("class", "btn-task");
      div_.setAttribute("draggable", true);
      div_.addEventListener(
        "dragstart",
        function(ev) {
          drag(ev);
        },
        false
      );
      flag = 0;
      div_.addEventListener("click", function(event) {
        addModal(event);
      });
      container_done.appendChild(div_);
    });
  });

// for assign users selectbox
var selectContainer = document.getElementById("assigned-users");
var noUsersOption = document.createElement("option");
noUsersOption.setAttribute("class", "user-option");
noUsersOption.setAttribute("disabled", true);
noUsersOption.text = "No users in this domain.";
selectContainer.appendChild(noUsersOption);

flag = 0;

function addModal(event) {
  caches.keys().then(function(names) {
    for (let name of names) caches.delete(name);
  });
  modal_edit.style.display = "block";
  taskId = event.toElement.id;

  var api_tasks = "https://localhost:3000/tasks/" + taskId;
  fetch(api_tasks)
    .then(response => response.json())
    .then(response => {
      var taskTitleElement = document.getElementById("edit-task-title");
      var taskDeadlineElement = document.getElementById("edit-task-deadline");
      var taskDomainElement = document.getElementById("edit-task-domain");
      var taskRegionElement = document.getElementById("edit-task-region");
      var taskDescriptionElement = document.getElementById(
        "edit-task-description"
      );
      var taskLinkElement = document.getElementById("edit-task-link");
      taskTitleElement.value = response[0].title;
      taskDeadlineElement.value = formatDate(response[0].deadline);
      taskDomainElement.value = response[0].domain;
      taskRegionElement.value = response[0].geographical_area;
      taskDescriptionElement.value = response[0].description;
      taskLinkElement.value = response[0].link;

      taskDomain = response[0].domain;
    });

  var imageDiv = document.createElement("img");
  imageDiv.setAttribute("class", "imgElement");
  var images = "https://localhost:3000/images/" + taskId;
  fetch(images)
    .then(response => response.json())
    .then(response => {
      length_ = response.length;
      if (length_ > 0) {
        imageDiv.src = "../uploads/" + response[0].image;
        images_container.appendChild(imageDiv);
      }
    });

  var assignedUsers = "https://localhost:3000/task_users/" + taskId;
  var arrayUsersAlreadyAssigned = [];

  fetch(assignedUsers)
    .then(response => response.json())
    .then(response => {
      if (response.length == 0 && flag == 0) {
        flag = 1;
        caches.keys().then(function(names) {
          for (let name of names) caches.delete(name);
        });
        var noUsersAssigned = document.createElement("div");
        noUsersAssigned.setAttribute("class", "user-div");
        noUsersAssigned.setAttribute("id", "no-users-assigned");
        noUsersAssigned.textContent = "No users assigned for this task.";
        assignedUsersContainer.appendChild(noUsersAssigned);
      }
      for (var i = 0; i < response.length; i++) {
        found = arrayUsersAlreadyAssigned.find(elem => elem == response[i].username);
        if (found == undefined) {
          arrayUsersAlreadyAssigned.push(response[i].username);

          var assignedBigDiv = document.createElement("div");
          assignedBigDiv.setAttribute("class", "user-big-div");
          var deleteUserButton = document.createElement("button");
          deleteUserButton.setAttribute("class", "delete-assigned-user");
          deleteUserButton.textContent = "X";
          var assignedUserElement = document.createElement("div");
          assignedUserElement.setAttribute("class", "user-div");
          assignedUserElement.textContent = response[i].username;
          assignedBigDiv.appendChild(assignedUserElement);
          assignedBigDiv.appendChild(deleteUserButton);
          assignedUsersContainer.appendChild(assignedBigDiv);

          // var assignedUserElement = document.createElement("div");
          // assignedUserElement.setAttribute("class", "user-div");
          // assignedUserElement.textContent = response[i].username;
          // assignedUsersContainer.appendChild(assignedUserElement);
        }
      }
    });

    var deleteButtons = document.getElementsByClassName("delete-ssigned-button");
    console.log("deleteButtons: ", deleteButtons);

  var boardName = document.getElementById("board_name").innerText;
  var usersArray = [];
  var alreadyThere = [];

  // add users to the assign-users selectbox
  fetch("https://localhost:3000/boards_members/" + boardName)
    .then(response => response.json())
    .then(response => {
      response.forEach(element => {
        fetch("https://localhost:3000/users/" + element.username)
          .then(resp => resp.json())
          .then(resp => {
            userDomain = resp[0].domain;
            if (taskDomain == userDomain) {
              usersArray.push(element.username);
            }
            if (usersArray.length == 0) {
              noUsersOption.style.visibility = "visible";
            }
            for (var i = 0; i < usersArray.length; i++) {
              foundUser = alreadyThere.find(elem => elem == usersArray[i]);
              if (foundUser == undefined) {
                noUsersOption.style.visibility = "hidden";
                var newOption = document.createElement("option");
                newOption.setAttribute("class", "user-option");
                newOption.value = usersArray[i];
                newOption.text = usersArray[i];
                alreadyThere.push(usersArray[i]);
                selectContainer.appendChild(newOption);
              }
            }
          });
      });
    });

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  var value_content = "https://localhost:3000/task/" + makeid(16) + taskId;
  var button = document.getElementById("share-task");
  button.addEventListener("click", event => {
    event.preventDefault();
    console.log("ieii");
    caches.keys().then(function(names) {
      for (let name of names) caches.delete(name);
    });
    modal_edit.style.display = "none";
    show.style.display = "block";
    content_.innerHTML = value_content;
  });

  close_url.onclick = function() {
    show.style.display = "none";
  };

  closeButton_edit.onclick = function() {
    modal_edit.style.display = "none";
    location.reload();
  };

  var delete_button = document.getElementById("delete-task");
  delete_button.onclick = function(event) {
    event.preventDefault();
    fetch("https://localhost:3000/tasks/" + taskId, {
      method: "delete"
    });
    caches.keys().then(function(names) {
      for (let name of names) caches.delete(name);
    });
    location.reload();
  };

  var saveButton = document.getElementById("edit-task-submit");
  saveButton.onclick = function(event) {
    event.preventDefault();
    // console.log(event);
    title = event.target.form.elements[1].value;
    deadline = event.target.form.elements[2].value;
    domain = event.target.form.elements[3].value;
    geographical_area = event.target.form.elements[4].value;
    description = event.target.form.elements[7].value;
    link = event.target.form.elements[5].value;
    arrayAssignedUsers = event.target.form.elements[6].selectedOptions;

    var data = {
      title,
      deadline,
      domain,
      geographical_area,
      description,
      link
    };
    fetch("https://localhost:3000/tasks/" + taskId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // console.log(arrayAssignedUsers);
    [].forEach.call(arrayAssignedUsers, function(element) {
      username = element.value;
      var data = { id_task: taskId, username };
      fetch("https://localhost:3000/task_users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    });

    modal_edit.style.display = "none";
    caches.keys().then(function(names) {
      for (let name of names) caches.delete(name);
    });
    location.reload();
  };

  var uploadButton = document.getElementById("upload-button");
  uploadButton.onclick = function(event) {
    event.preventDefault();
    image = event.toElement.form.elements[0].files[0].name;
    data = { id_task: taskId, image };
    var method = "";
    if (length_ == 0) {
      method = "POST";
    } else {
      method = "PUT";
    }
    fetch("https://localhost:3000/images/", {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    caches.keys().then(function(names) {
      for (let name of names) caches.delete(name);
    });

    // add image to uploads file
    var imgForm = document.getElementById("imageForm");
    imgForm.action = "/image";
    imgForm.method = "POST";
    imgForm.enctype = "multipart/form-data";
    imgForm.submit();
  };
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  id_to_update = ev.target.id;
  ev.dataTransfer.setData("text", ev.target.id);
  caches.keys().then(function(names) {
    for (let name of names) caches.delete(name);
  });
}

function drop(ev, where) {
  caches.keys().then(function(names) {
    for (let name of names) caches.delete(name);
  });
  ev.preventDefault();
  if (ev.target.hasAttribute("draggable") == false) {
    fetch("https://localhost:3000/tasks/" + id_to_update)
      .then(response => response.json())
      .then(response => {
        var link = response[0].link;
        if (link == "" && where == "done")
          alert(
            "To be done, a task must have a link added. Have a nice day, team TASOR! :)"
          );
        else {
          var data = { status: where };
          if (navigator.onLine === true) {
            fetch("https://localhost:3000/tasks/" + id_to_update, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            });
          }

          var history = username + " move task ";
          fetch("https://localhost:3000/tasks/" + id_to_update)
            .then(response => response.json())
            .then(response => {
              var title = response[0].title;
              history = history + title + " in " + where;
              var data = {
                name_board,
                id_task: id_to_update,
                activity: history
              };
              if (navigator.onLine === true) {
                fetch("https://localhost:3000/history", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(data)
                });
              }
              location.reload();
            });

          caches.keys().then(function(names) {
            for (let name of names) caches.delete(name);
          });

          var data = ev.dataTransfer.getData("text");
          ev.target.appendChild(document.getElementById(data));
        }
      });
  }
}
