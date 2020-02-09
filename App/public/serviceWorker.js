// install event
const dynamicCache = 'dynamic-cache';
const staticCache = 'static-cache';
const assests = [
    '/offline.html'
];

// activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.open(staticCache)
        .then(cache => {
            return cache.addAll(assests);
        })
    );
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