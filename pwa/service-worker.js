const UNIQUE_CACHE = 'Music-app';
const assetsToPrefetch = [
  '/index.html',
  '/app.js',
  '/style.css',
  '/assets/google-music-icon-3.png',
  
];

self.addEventListener('install', installationEvent => {
  installationEvent.waitUntil(
    caches.open(UNIQUE_CACHE)
      .then(cacheStorage => {
    
        return cacheStorage.addAll(assetsToPrefetch);
      })
  );
});

self.addEventListener('fetch', retrievalEvent => {
  retrievalEvent.respondWith(
    fetch(retrievalEvent.request).then(networkResponse => {
      if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
        return networkResponse;
      }
      let responseClone = networkResponse.clone();
      caches.open(UNIQUE_CACHE)
        .then(cacheStorage => {
          cacheStorage.put(retrievalEvent.request, responseClone);
        });
      return networkResponse;
    }).catch(() => {
      return caches.match(retrievalEvent.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
        });
    })
  );
});

self.addEventListener('activate', activationEvent => {
  const allowedCaches = [UNIQUE_CACHE];
  activationEvent.waitUntil(
    caches.keys().then(cacheKeys => {
      return Promise.all(
        cacheKeys.map(key => {
          if (allowedCaches.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
