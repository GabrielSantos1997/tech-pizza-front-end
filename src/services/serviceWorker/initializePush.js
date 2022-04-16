import { messaging } from 'config/firebaseConfig';
import { setFirebaseToken } from 'utils/notifications/notifications';

export function initializePush() {
  messaging
    .requestPermission()
    .then(() => messaging.getToken())
    .then((token) => {
      setFirebaseToken(token);
    })
    .catch((error) => {
      if (error.code === 'messaging/permission-blocked') {
        console.error('Please Unblock Notification Request Manually');
      } else {
        console.error('Error Occurred', error);
      }
    });
}
