const {
  eventsConsole,
} = require('services/serviceWorker/functions/eventsConsole');
const { postPush } = require('services/serviceWorker/functions/postMessage');

eventsConsole();

// push notifications
global.onpush = (event) => {
  console.log('onpush'.toUpperCase(), event);
  const { notification: push, data } = event.data?.json() || {};
  const {
    target: { origin },
  } = event;
  const notification = { push, data };

  const { body, image, tag, title } = push;

  const icon = image || './assets/icons/android-icon-192x192.png';
  postPush({ event, notification, type: 'unread', origin });
  event.waitUntil(
    global.self.registration.showNotification(title, {
      body,
      icon,
      tag,
      data: { ...notification },
    })
  );
};

global.onnotificationclick = (event) => {
  console.log('onnotificationclick'.toUpperCase(), event);
  event.notification.close(); // Android needs explicit close.

  const {
    notification,
    target: { origin },
  } = event || {};

  postPush({ event, notification: notification.data, type: 'read', origin });
};
