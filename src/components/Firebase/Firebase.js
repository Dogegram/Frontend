// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBECHCVjA-hS75oPDJEqucXm_cbnDTzsuU",
  authDomain: "dogegram-notifications.firebaseapp.com",
  projectId: "dogegram-notifications",
  storageBucket: "dogegram-notifications.appspot.com",
  messagingSenderId: "49364419593",
  appId: "1:49364419593:web:1888a63d9d6c287dab64d8",
  measurementId: "G-Q39SPSGBQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // google should not use this data which is collected here ever as stated by me while setting up the firebase project. 
var tokenSentToServer = false;



const messaging = getMessaging(app);

const sendTokenToServer = ()=>{

 getToken(messaging, {vapidKey: process.env.REACT_APP_FCM_WEBKEY }).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      // send token to server
      console.log('sending token to server');
     fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/fcm/add`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          token: currentToken
        })
      })
      .then(res => {
        console.log("here firebase.js 47");
        if (res.status === 200) {
          console.log("token sent to server");
          tokenSentToServer = true;
        }
      }
      )
      .catch(err => {
        console.log(err);
      }
      );

      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

  onMessage((payload) => {
    console.log(payload)
  })





  export default sendTokenToServer;