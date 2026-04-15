// Version 2 kar diya hai taaki mobile samajh jaye ki naya update aaya hai
const CACHE_NAME = 'mcx-pro-v2'; 
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// Naye update ko turant install karne ke liye
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Purane kachre (Cache) ko delete karne ke liye
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// "Network-First" Strategy: Hamesha internet se fresh file layega!
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Agar internet band hai (offline), tabhi save ki hui file dikhayega
      return caches.match(event.request);
    })
  );
});
