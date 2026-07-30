// Service worker voor installatie als app. Network-first zodat de demo nooit oud blijft hangen.
const VERSION = "base-app-v1";

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((antwoord) => {
        const kopie = antwoord.clone();
        caches.open(VERSION).then((cache) => cache.put(e.request, kopie));
        return antwoord;
      })
      .catch(() => caches.match(e.request).then((hit) => hit ?? Response.error()))
  );
});
