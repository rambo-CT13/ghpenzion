const firebase = require("firebase");
import "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJyEdBKl5E4Db45eayIqajlOP-srY2LmY",
  authDomain: "penzion-1ecd1.firebaseapp.com",
  projectId: "penzion-1ecd1",
  storageBucket: "penzion-1ecd1.appspot.com",
  messagingSenderId: "933296423299",
  appId: "1:933296423299:web:139843d0f11ea56599b6b6",
};

//if (firebase.apps.length) {
const fireApp = firebase.initializeApp(firebaseConfig);

//}

export const storage = firebase.storage();
export const db = fireApp.firestore();
export const auth = fireApp.auth();

export { firebase };
