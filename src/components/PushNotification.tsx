// import React, { useEffect }from "react";
// import { messaging } from "../utils/firebase";
// import { getToken, onMessage } from "firebase/messaging";

// const FIREBASE_VAPID_KEY = 'BNRVNVEc4LMaDIRns8kHpYLKSdgxvHJOKlxcIsq7oWTF19zZIehwRQA2L7A-2WUCO1l9u9LziKNDwdevLnV_J7U'

// onMessage(messaging, (payload) => {
//   console.log('Received foreground message ', payload);
//   // Customize notification here
//   const notificationTitle = payload?.notification?.title;
//   const notificationOptions = {
//     body: payload?.notification?.body,
//     icon: '../assets/images/png/tick-mark.png' // Replace with the path to your icon
//   };

//   new Notification(notificationTitle as string, notificationOptions);
// });

// export const PushNotification: React.FC = () => {
//   console.log("here here");
//   const requestPermission = () => {
//     Notification.requestPermission().then((permission) => {
//       console.log(permission);
//       if (permission === "granted") {
//         getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
//           .then((currentToken) => {
//             console.log("fsakjdhfkjsadhfsadf")
//             if (currentToken) {
//               // Send the token to your server
//               console.log("FCM token:", currentToken);
//             } else {
//               console.log("No registration token available.");
//             }
//           })
//           .catch((err) => {
//             console.log("An error occurred while retrieving token:", err);
//           });
//       } else {
//         console.log("Notification permission denied.");
//       }
//     });
//   };

//   useEffect(() => {
//     requestPermission();
//   }, []);

//   return <div></div>;
// };

export {}