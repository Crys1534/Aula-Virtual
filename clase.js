import app from './firebase.js';

import {
getFirestore,
doc,
getDoc,
collection,
addDoc,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

window.back = function(){
window.location="dashboard.html";
}

window.showTab = function(tab){

document.querySelectorAll(".tab").forEach(x=>{
x.classList.remove("active");
});

document.getElementById(tab).classList.add("active");

}

async function loadClass(){

const ref = doc(db,"classes",id);
const snap = await getDoc(ref);

if(snap.exists()){
document.getElementById("classTitle").innerHTML = snap.data().name;
}

}

window.publish = async function(){

let text = document.getElementById("postText").value;

if(text=="") return;

await addDoc(collection(db,"classes",id,"posts"),{
text:text
});

document.getElementById("postText").value="";

loadPosts();

}

async function loadPosts(){

let area = document.getElementById("posts");
area.innerHTML="";

const querySnapshot = await getDocs(collection(db,"classes",id,"posts"));

querySnapshot.forEach((doc)=>{

area.innerHTML += `
<div class="post">
${doc.data().text}
</div>
`;

});

}

loadClass();
loadPosts();

window.createTask = async function(){

let title = document.getElementById("taskTitle").value;
let desc = document.getElementById("taskDesc").value;
let date = document.getElementById("taskDate").value;

if(title=="") return;

await addDoc(collection(db,"classes",id,"tasks"),{
title:title,
desc:desc,
date:date
});

document.getElementById("taskTitle").value="";
document.getElementById("taskDesc").value="";
document.getElementById("taskDate").value="";

loadTasks();

}

async function loadTasks(){

let area = document.getElementById("tasks");
area.innerHTML="";

const querySnapshot = await getDocs(collection(db,"classes",id,"tasks"));

querySnapshot.forEach((doc)=>{

area.innerHTML += `
<div class="task">
<h3>${doc.data().title}</h3>
<p>${doc.data().desc}</p>
<small>Entrega: ${doc.data().date}</small>
</div>
`;

});

}

loadTasks();