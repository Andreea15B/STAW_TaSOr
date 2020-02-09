// install event
const dynamicCache = 'dynamic-cache';
const staticCache = 'static-cache';
const assests = [
    '/offline.html'
];

// var response_boards = '';
// var boards = 'https://localhost:3000/boards';

// var response_tasks = '';
// var tasks = 'https://localhost:3000/tasks';
// var new_ = '';

// fetch(boards)
//     .then(response => response.json())
//     .then(response => {
//         response_boards = response;
//     });

// fetch(tasks)
//     .then(response => response.json())
//     .then(response => {
//         response_tasks = response;
//     })
//     .then(() => new_ = response_tasks);


self.addEventListener('install', event => {
    console.log('service worker has been installed');
    caches.open(staticCache).then(cache => {
        cache.addAll(assests);
    })

    // self.indexedDB.deleteDatabase("TASOR");

    // var indexedDB = self.indexedDB;

    // // Open (or create) the database
    // var open = indexedDB.open("TASOR", 1);

    // // Create the schema
    // open.onupgradeneeded = function() {
    //     var db = open.result;
    //     var store = db.createObjectStore("Info", { keyPath: "id" });
    // };

    // open.onsuccess = async function() {
    //     // Start a new transaction
    //     var db = open.result;
    //     var tx = db.transaction("Info", "readwrite");
    //     var store = tx.objectStore("Info");


    //     store.put({
    //         id: '1',
    //         boards: { result: response_boards }
    //     })
    //     store.put({
    //         id: '99',
    //         tasks: { result: new_ }
    //     })


    //     tx.oncomplete = function() {
    //         db.close();
    //     };
    // Add some data

    // Query the data
    // var getJohn = store.get(12345);

    // getJohn.onsuccess = function() {
    //     console.log(getJohn.result.name.first); // => "John"
    // };
    // Close the db when the transaction is done

})

// activate event
self.addEventListener('activate', event => {
    console.log('service worker has been activated');
});

//fetch event
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).then(fetchtRes => {
                return caches.open(dynamicCache).then(
                    cache => {
                        cache.put(event.request.url, fetchtRes.clone())
                        return fetchtRes
                    }
                )
            });
        }).catch(() => caches.match('/offline.html'))
    );
});