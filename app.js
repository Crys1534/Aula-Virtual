import app from './firebase.js';

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);

window.register = function(){

let email = document.getElementById("email").value;
let pass = document.getElementById("password").value;

createUserWithEmailAndPassword(auth,email,pass)
.then(()=>{
document.getElementById("msg").innerHTML="Cuenta creada";
})
.catch(error=>{
document.getElementById("msg").innerHTML=error.message;
});

}

window.login = function(){

let email = document.getElementById("email").value;
let pass = document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,pass)
.then(()=>{
window.location="dashboard.html";
})
.catch(error=>{
document.getElementById("msg").innerHTML=error.message;
});

}