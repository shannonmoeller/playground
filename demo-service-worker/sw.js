self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    console.log(event.request.url);
});
