// install event

const dynamicCache = 'dynamic-cache';

self.addEventListener('install', event => {
    console.log('service worker has been installed');
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
        })
    );
});