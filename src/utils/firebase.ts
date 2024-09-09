import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCbLGYutsfYJVZCUIxvLiosgQp3xyg2u_c",
  authDomain: "amaranth-platform-notifs.firebaseapp.com",
  projectId: "amaranth-platform-notifs",
  storageBucket: "amaranth-platform-notifs.appspot.com",
  messagingSenderId: "237286150666",
  appId: "1:237286150666:web:06c32c5b9070df3d6185f3"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
