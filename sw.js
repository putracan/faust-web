/**
 * Service Worker - Optimized for Mobile-First PWA
 * Strategy: Stale-While-Revalidate for speed
 */

const CACHE_VERSION = 'v3';
const CACHE_NAME = `faust-pwa-${CACHE_VERSION}`;

// App Shell - Critical files for offline
const APP_SHELL = [
  '/',
  '/id/index.html',
  '/src/tailwind-build.css',
  '/src/global-enhancements.css',
  '/src/global-enhancements.js',
  '/src/main.js',
  '/src/logo-solusi-teknologi.png',
  '/src/logo-solusi-teknologi-BATAM.png',
  '/manifest.webmanifest'
];

// Dynamic cache for pages
const PAGES_CACHE = `faust-pages-${CACHE_VERSION}`;
const IMAGES_CACHE = `faust-images-${CACHE_VERSION}`;

// Install - Cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching App Shell');
        return cache.addAll(APP_SHELL);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => {
          return key.startsWith('faust-') &&
                 key !== CACHE_NAME &&
                 key !== PAGES_CACHE &&
                 key !== IMAGES_CACHE;
        }).map((key) => {
          console.log('[SW] Removing old cache:', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Smart caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and external requests
  if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
    return;
  }

  // Strategy based on resource type
  if (request.destination === 'image') {
    // Images: Cache First (long-term cache)
    event.respondWith(cacheFirst(request, IMAGES_CACHE));
  } else if (request.destination === 'document') {
    // HTML Pages: Stale While Revalidate (fast + fresh)
    event.respondWith(staleWhileRevalidate(request, PAGES_CACHE));
  } else if (request.destination === 'style' || request.destination === 'script') {
    // CSS/JS: Cache First with Network Fallback
    event.respondWith(cacheFirst(request, CACHE_NAME));
  } else {
    // Everything else: Network First
    event.respondWith(networkFirst(request));
  }
});

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    return caches.match('/id/index.html');
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    cache.put(request, networkResponse.clone());
    return networkResponse;
  }).catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || caches.match('/id/index.html');
  }
}

// Background Sync for forms (optional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

// Push Notifications (optional)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Ada notifikasi baru dari Solusi Teknologi Batam',
    icon: '/src/logo-solusi-teknologi-BATAM.png',
    badge: '/src/logo-solusi-teknologi.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/id/index.html' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Solusi Teknologi Batam', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
