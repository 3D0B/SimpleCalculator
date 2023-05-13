self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
});

self.addEventListener("activate", event => {
    console.log("Service worker activated");
});

var staticCacheName = 'static-cache-v1';

const filesToCache = [
    "/index.html",
    "/script.js",
    "/style.css"
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('static-cache-') && cacheName !== staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

