const cacheName = 'SwiftCart-v1';
const assets = ['./', './index.html', './script.js', './style.css', './assets/icons/icon-192x192.png', './assets/icons/icon-512x512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

