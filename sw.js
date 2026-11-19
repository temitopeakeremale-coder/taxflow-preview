/* TaxFlow service worker. Generated at build time by the `serviceWorker` plugin in vite.config.ts:
 * the VERSION and PRECACHE placeholders below are filled with the build's hash and file list.
 * App shell pattern: every file in the build is cached on install, so the app opens with no connection.
 * Client data is not here; it lives in IndexedDB. */
const VERSION = '2886eddc93f1';
const CACHE = `taxflow-${VERSION}`;
const PRECACHE = ["./","./apple-touch-icon.png","./assets/index-BXnhjBuc.css","./assets/index-CivFkIPk.js","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./index.html","./manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
  // Wait for the page to ask before taking over, so an open session never mixes old and new files.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('taxflow-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    // Serve the cached shell; fall back to the network on first visit or if the cache was cleared.
    event.respondWith(caches.match('./index.html', { cacheName: CACHE }).then((hit) => hit || fetch(req)));
    return;
  }
  event.respondWith(
    caches.match(req, { cacheName: CACHE, ignoreSearch: true }).then((hit) => hit || fetch(req)),
  );
});
