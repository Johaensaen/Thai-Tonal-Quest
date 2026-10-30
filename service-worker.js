self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("thai-tonal-quest-v1").then(cache => cache.addAll([
            "./",
            "./index.html",
            "./style.css",
            "./data.js",
            "./app.js",
            "./manifest.webmanifest",
            "./icon.svg",
            "./icons/icon-192.png",
            "./icons/icon-512.png",
            "./icons/apple-touch-icon.png"
        ])).then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames
                .filter(cacheName => cacheName.startsWith("thai-tonal-quest-") && cacheName !== "thai-tonal-quest-v1")
                .map(cacheName => caches.delete(cacheName))
        )).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) {
        return;
    }

    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request).catch(() => caches.match("./index.html"))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cachedResponse => cachedResponse || fetch(event.request))
    );
});

self.addEventListener("notificationclick", event => {
    event.notification.close();
    const targetUrl = event.notification.data?.url || self.registration.scope;

    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
            const existingClient = clientList.find(client => client.url.startsWith(self.registration.scope));
            if (existingClient) {
                return existingClient.focus();
            }
            return self.clients.openWindow(targetUrl);
        })
    );
});
