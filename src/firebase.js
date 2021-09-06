import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDp78qO_wnEBYcG5aKOp5G_UqVSrwO-MTU",
  authDomain: "clone-linkedin-e50e3.firebaseapp.com",
  projectId: "clone-linkedin-e50e3",
  storageBucket: "clone-linkedin-e50e3.appspot.com",
  messagingSenderId: "701980432708",
  appId: "1:701980432708:web:b8634e4202af1939411f11",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
