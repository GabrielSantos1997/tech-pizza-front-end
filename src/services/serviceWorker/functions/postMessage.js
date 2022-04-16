export function postPush({ event, notification, type, origin }) {
  function post(client) {
    console.log('POST', client, notification);
    client.postMessage({
      msg: notification,
      type,
    });
  }
  const { clients } = global;
  const { route } = notification.data;

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i += 1) {
        const client = windowClients[i];
        // If so, just focus it.
        if (client.url === origin + route && 'focus' in client) {
          post(client);
          return type === 'read' && client.focus();
        }
      }
      // If not, then open the target URL in a new window/ta
      if (type === 'read' && clients.openWindow) {
        return clients.openWindow(route).then((client) => {
          post(client);
        });
      }
      return '';
    })
  );
}
