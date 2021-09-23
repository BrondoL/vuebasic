const firebaseConfig = {
    apiKey: "AIzaSyARJSoQzLdqkkyaVQg9e_AwHtdrb64NRJE",
    authDomain: "coba-vuejs.firebaseapp.com",
    projectId: "coba-vuejs",
    storageBucket: "coba-vuejs.appspot.com",
    messagingSenderId: "529724148292",
    appId: "1:529724148292:web:05075f6e7b3fae1f4dca11",
    databaseURL:
        "https://coba-vuejs-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const kelasRef = db.ref("kelas");
