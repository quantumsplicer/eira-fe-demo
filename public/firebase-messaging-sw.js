importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCbLGYutsfYJVZCUIxvLiosgQp3xyg2u_c",
    authDomain: "amaranth-platform-notifs.firebaseapp.com",
    projectId: "amaranth-platform-notifs",
    storageBucket: "amaranth-platform-notifs.appspot.com",
    messagingSenderId: "237286150666",
    appId: "1:237286150666:web:06c32c5b9070df3d6185f3"
  };

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});