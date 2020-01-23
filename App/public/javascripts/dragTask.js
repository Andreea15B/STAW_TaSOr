function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, where) {
    console.log(where);
    ev.preventDefault();

    var data = { type: where };
    fetch('http://localhost:3000/status/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}