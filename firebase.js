//npm install firebase
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCISRD_9s2C5Rg89rN5dDQgpOWh_PqEaoo",
  authDomain: "cinema-8d07f.firebaseapp.com",
  databaseURL: "https://cinema-8d07f.firebaseio.com",
  projectId: "cinema-8d07f",
  storageBucket: "cinema-8d07f.appspot.com",
  messagingSenderId: "1001816122706",
  appId: "1:1001816122706:web:d3f41afd8759e09a58068b",
  measurementId: "G-13EHC387CV"
};
  
  const app=firebase.initializeApp(firebaseConfig);

  console.log(firebase)

 
  export default firebase;