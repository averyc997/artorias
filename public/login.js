// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*const firebaseConfig = {
    apiKey: "AIzaSyDUmLSiKSj0CcOaXvNqPeNxUw_7nMNXbto",
    authDomain: "artorias-the-abysswalker.firebaseapp.com",
    databaseURL: "https://artorias-the-abysswalker-default-rtdb.firebaseio.com",
    projectId: "artorias-the-abysswalker",
    storageBucket: "artorias-the-abysswalker.appspot.com",
    messagingSenderId: "642844625943",
    appId: "1:642844625943:web:c49f60d701f64cb2fb2052",
    measurementId: "G-RZ49PB8H8F"
  };

firebase.initializeApp(firebaseConfig);*/
/*function getUser() {
    var user = firebase.auth().currentUser;
    return user;
}*/
function signUp() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);

    //let uiD = getUser().uid;
   // writeUserData(uiD, email);

    promise.catch(e => alert(e.message));
    alert("Signed Up");
}

function signIn() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);

    promise.catch(e => alert(e.message));
    alert("Signed In: " + email.value);
}

function signOut() {
    auth.signOut();
    alert("Signed Out");
}



/*function writeUserData(userId, email) {
    firebase.database().ref('users/' + userId).set({
      email: email,
    });
  }*/