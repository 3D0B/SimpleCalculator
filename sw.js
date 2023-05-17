const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './Icons/Mobile/2.0/192.png',
  './Icons/Mobile/2.0/512.png',
  './Icons/desktop/2.0/192.png',
  './Icons/desktop/2.0/512.png'
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
