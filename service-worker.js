// A service worker in many ways acts as a proxy for 
// fetch requests. The service worker can supply 
// cached data when your app makes a fetch request but
// is offline. 

// Give your cache a name
const CACHE_NAME = 'news-app-cache-v1';

// NOTE: self is another name for window! 
// It is important to use that here 

// Install service worker - Service worker must be 
// registered before it is installed! 
self.addEventListener('install', event => {
  // Wait until this service worker is installed
  event.waitUntil(
    // Open the cache! 
    caches.open(CACHE_NAME)
      .then(cache => {
        // Precache the assets needed for this page
        // List all of the files that should be cached
        // a PWA might list all of the files that will 
        // be needed offline
        return cache.addAll([
          '/',
          'index.html',
          'styles.css',
          'app.js'
        ]);
      })
  );
});

// Fetch event - Used as middleware between fetch events 
// in other code. Service workers intercept network 
// requests and handles them. 
self.addEventListener('fetch', event => {
  // Intercepts the browsers default fetch handling. 
  event.respondWith(
    // Check the chache for a matching request
    caches.match(event.request)
      .then(response => {
        // If there is a match re return that
        if (response) {
          return response;
        }
        // If not in the cache fetch from the network
        return fetch(event.request)
          .then(response => {
            // Dynamic caching - The response can only be
            // used once so we clone it and put the copy in
            // the cache for later! 
            const clonedResponse = response.clone();
            // Open the cache
            caches.open(CACHE_NAME)
              .then(cache => {
                // save the cloned response to the cache
                cache.put(event.request, clonedResponse);
              });
            return response;
          });
      })
  );
});

// Activate event - Activate this service worker 
self.addEventListener('activate', event => {
  // Wait until ???
  event.waitUntil(
    // Get the keys of the cache
    caches.keys().then(cacheNames => {
      // Clean the cahce for the new service worker ???
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


/*

Service workers 
- Control cahcing behavior 
- Handle push messages 
- Are executed independent of the application in the background
- Can receive messages when the application is in the background
- Act as a proxy between fetch and your app
- Have a life cycle independent of your web app
- 

*/