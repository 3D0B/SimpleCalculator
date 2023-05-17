const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
    '/',
    '/SimpleCalculator/index.html',
    '/SimpleCalculator/style.css',
    '/SimpleCalculator/script.js',
    '/SimpleCalculator/manifest.json'
    // nowy
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
