const cacheName = 'my-app-cache-v1';
const staticAssets = [
    "./index.html",
    "./script.js",
    "./style.css",
    // Dodaj tutaj wszystkie statyczne zasoby Twojej aplikacji, które mają być przechowywane w pamięci podręcznej
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => cache.addAll(staticAssets))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
