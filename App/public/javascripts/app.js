const publicVapidKey =
    "BGrZ_Y60uwSrh-Zrf_FjIBfw5kvB2ziYs6i5pgKY5iw8E601jdeePi6QHByuXB94YbLf4MxHPCS7_o_j7TtknU0";

if ("serviceWorker" in navigator) {
    send().catch(err => console.log(err));
}

var response_boards = "";
var boards = "https://localhost:3000/boards";

var response_tasks = "";
var tasks = "https://localhost:3000/tasks";
var new_ = "";

var response_boards_members = "";
var boards_members = "https://localhost:3000/boards_members";
var new_boards = "";

var response_users = "";
var users = "https://localhost:3000/users";
var new_users = "";

var response_history = "";
var history_ = "https://localhost:3000/history";
var new_history = "";

var response_task_assign = "";
var task_assign = "https://localhost:3000/task_users";
var new_task_assign = "";

fetch(boards)
    .then(response => response.json())
    .then(response => {
        response_boards = response;
    });

fetch(tasks)
    .then(response => response.json())
    .then(response => {
        response_tasks = response;
    })
    .then(() => { new_ = response_tasks });

fetch(boards_members)
    .then(response => response.json())
    .then(response => {
        response_boards_members = response;
    })
    .then(() => {
        new_boards = response_boards_members;
    });

fetch(users)
    .then(response => response.json())
    .then(response => {
        response_users = response;
    })
    .then(() => {
        new_users = response_users;
    });

fetch(history_)
    .then(response => response.json())
    .then(response => {
        response_history = response;
    })
    .then(() => {
        new_history = response_history;
    });

fetch(task_assign)
    .then(response => response.json())
    .then(response => {
        response_task_assign = response;
    })
    .then(() => {
        new_task_assign = response_task_assign;
    });

async function send() {
    self.indexedDB.deleteDatabase("TASOR");

    var indexedDB = self.indexedDB;

    // Open (or create) the database
    var open = indexedDB.open("TASOR", 1);

    // Create the schema
    open.onupgradeneeded = function() {
        var db = open.result;
        var store = db.createObjectStore("Info", { keyPath: "id" });
    };

    open.onsuccess = async function() {
        // Start a new transaction
        var db = open.result;
        var tx = db.transaction("Info", "readwrite");
        var store = tx.objectStore("Info");

        store.put({
            id: "1",
            boards: { result: response_boards }
        });
        store.put({
            id: "2",
            tasks: { result: new_ }
        });
        store.put({
            id: "3",
            boards_members: { result: new_boards }
        });
        store.put({
            id: "4",
            users: { result: new_users }
        });
        store.put({
            id: "5",
            history: { result: new_history }
        });
        store.put({
            id: "6",
            task_assignments: { result: new_task_assign }
        });

        tx.oncomplete = function() {
            db.close();
        };
    };

    console.log("Register service worker");
    const register = await navigator.serviceWorker.register("/serviceWorker.js");
    console.log("Service Worker registered");

    console.log("Registering Push..");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}