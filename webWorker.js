// Nazwa pamięci podręcznej dla plików statycznych
const CACHE_NAME = 'static-cache-v1';

// Pliki do zapisania w pamięci podręcznej
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js'
];

// Rejestrowanie pracownika usługi
self.addEventListener('install', function(event) {
  console.log('Service worker installing...');

  // Dodanie plików do pamięci podręcznej
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Service worker caching files...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Obsługa żądań sieciowych
self.addEventListener('fetch', function(event) {
  console.log('Service worker fetching...');

  // Sprawdzenie, czy plik jest w pamięci podręcznej
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found in cache:', event.request.url);
        return response;
      }
      console.log('Not found in cache:', event.request.url);

      // Pobranie pliku z sieci i zapisanie w pamięci podręcznej
      return fetch(event.request).then(function(response) {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});

// Czyszczenie nieaktualnych pamięci podręcznych
self.addEventListener('activate', function(event) {
  console.log('Service worker activating...');

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
