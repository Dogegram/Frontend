importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyBECHCVjA-hS75oPDJEqucXm_cbnDTzsuU",
    authDomain: "dogegram-notifications.firebaseapp.com",
    projectId: "dogegram-notifications",
    storageBucket: "dogegram-notifications.appspot.com",
    messagingSenderId: "49364419593",
    appId: "1:49364419593:web:1888a63d9d6c287dab64d8",
    measurementId: "G-Q39SPSGBQ8"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    icon: '/logo192.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();
  const promiseChain = clients
      .matchAll({
          type: 'window',
          includeUncontrolled: true
       })
      .then(windowClients => {
          let matchingClient = null;
          for (let i = 0; i < windowClients.length; i++) {
              const windowClient = windowClients[i];
              if (windowClient.url === feClickAction) {
                  matchingClient = windowClient;
                  break;
              }
          }
          if (matchingClient) {
              return matchingClient.focus();
          } else {
              return clients.openWindow(feClickAction);
          }
      });
      event.waitUntil(promiseChain);
});

