const CACHE_NAME = 'faust-pwa-v1';
const APP_SHELL = [
  '/',
  '/id/index.html',
  '/src/style.css',
  '/src/main.js',
  '/src/load-right-sidebar.js',
  '/src/logo-solusi-teknologi.png',
  '/src/logo-solusi-teknologi-BATAM.png',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          const clonedResponse = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clonedResponse));
          return networkResponse;
        })
        .catch(() => caches.match('/id/index.html'));
    })
  );
});
