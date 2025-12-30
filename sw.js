const CACHE_NAME = 'grocery-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Basic pass-through (Network first, fall back to cache if offline)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});