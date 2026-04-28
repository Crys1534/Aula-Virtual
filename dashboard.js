import app from './firebase.js';

import {
getAuth,
signOut,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
collection,
addDoc,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

window.logout = function(){
signOut(auth).then(()=>{
window.location="index.html";
});
}

window.openModal = function(){
document.getElementById("modal").style.display="flex";
}

window.closeModal = function(){
document.getElementById("modal").style.display="none";
}

window.createClass = async function(){

let name = document.getElementById("className").value;

if(name=="") return;

await addDoc(collection(db,"classes"),{
name:name
});

closeModal();
loadClasses();

}

async function loadClasses(){

let area = document.getElementById("classes");
area.innerHTML="";

const querySnapshot = await getDocs(collection(db,"classes"));

querySnapshot.forEach((doc)=>{

area.innerHTML += `
<div class="card" onclick="goClass('${doc.id}')">
<h3>${doc.data().name}</h3>
<p>Clase activa</p>
</div>
`;

});

}

onAuthStateChanged(auth,(user)=>{

if(user){
document.getElementById("userEmail").innerHTML=user.email;
loadClasses();
}else{
window.location="index.html";
}

});

window.goClass = function(id){
window.location.href = "clase.html?id=" + id;
}