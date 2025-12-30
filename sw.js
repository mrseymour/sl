const CACHE_NAME = 'grocery-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // We wrap this in a catch so one bad file doesn't break the whole app
        return cache.addAll(urlsToCache).catch(err => console.error("Cache failed:", err));
      })
  );
});

self.addEventListener('fetch', event => {
  // 1. IGNORE API CALLS (Let them go straight to network)
  // If we try to cache POST/PUT or Lambda calls, it will break.
  if (event.request.method !== 'GET' || event.request.url.includes('lambda-url')) {
    return; 
  }

  // 2. For Static Files (HTML, Manifest), try Network -> Fallback to Cache
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});