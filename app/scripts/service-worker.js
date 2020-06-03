'use strict';

const rootPath = ['localhost', '127.0.0.1'].includes(location.origin)
  ? '/'
  : '/notepad-pwa/';

const cacheName = 'static-cache-v1';

const filesToCache = [
  'index.html',
  'styles/material.min.css',
  'scripts/material.min.js',
  'scripts/app.js',
]
  .map((path) => `${rootPath}${path}`)
  .push('https://fonts.googleapis.com/icon?family=Material+Icons');

self.addEventListener('install', (event) => {
  // Cache files.
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
});

self.addEventListener('activate', (event) => {
  // Clean old caches.
  event.waitUntil(
    caches
      .keys()
      .then((keyList) =>
        Promise.all(
          keyList
            .filter((key) => key !== cacheName)
            .map((key) => caches.delete(key))
        )
      )
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  console.log('requested:' + event.request);

  if (url.origin === location.origin && url.pathname === rootPath) {
    event.respondWith(caches.match(`${rootPath}index.html`));
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
