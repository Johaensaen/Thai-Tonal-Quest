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
