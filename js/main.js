
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCGZBjtbQ05SrT0wpBton2TKh29Q6Gr9Lc",
  authDomain: "chrono-main.firebaseapp.com",
  databaseURL: "https://chrono-main.firebaseio.com",
  projectId: "chrono-main",
  storageBucket: "chrono-main.appspot.com",
  messagingSenderId: "63898698136",
  appId: "1:63898698136:web:4389232ac8fbacf4d9ebed",
  measurementId: "G-FXHLEQL5YR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// s
// // init firebase
// firebaseConfig.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//grab dom form elements
const submitBtn = document.querySelector("#submit");
let userName = document.querySelector("#userName");
let userEmail = document.querySelector("#userEmail");
let userMessage = document.querySelector("#userMessage");
var userForm = document.getElementById('contactForm');

const db = firestore.collection("contactData");

submitBtn.addEventListener('click', function() {
  let nameInput = userName.value;
  let emailInput = userEmail.value;
  let messageInput = userMessage.value;
  let timeOfDay = new Date();
  let documentID = nameInput + ":" +
    timeOfDay.getMinutes() + "m"
    + timeOfDay.getSeconds() + "s";

  if(nameInput == '' || emailInput == '' || messageInput== ''){
    swal({
      title: "Fields Empty!",
      text: "Please fill in the form!",
      icon: "warning",
      button: "Got it!",
    });
  }
  else{
    // acess the db collection
    db.doc(documentID).set({
      name: nameInput,
      email: emailInput,
      message: messageInput,
      date: timeOfDay
    }).then(function() {
      console.log("data secured")
      swal({
        title: "Thank You!",
        text: "We will get back to you shortly!",
        icon: "success",
        button: "Done!",
      });
      userForm.reset();
      return false;
    }).catch(function(error){
      console.log(error);
    });
  }




});

// CLI RM ALL DOCUMENTS
// firebase firestore:delete --all-collections -y
