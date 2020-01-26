var button = document.getElementById('share-task');
var show = document.getElementById('show-url-container');


console.log(button);

button.addEventListener('click', (event) => {
    show.style.display = 'block';
})