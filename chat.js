import { auth, db } from './firebase.js';

import {
collection,
getDocs,
addDoc,
query,
orderBy,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let currentRoom = null;

const usersDiv =
document.getElementById('users');

const messagesDiv =
document.getElementById('messages');

async function loadUsers(){

const snapshot =
await getDocs(collection(db,'users'));

snapshot.forEach((docu)=>{

const data = docu.data();

if(data.uid !== auth.currentUser.uid){

const div =
document.createElement('div');

div.className = 'user';

div.innerText = data.phone;

div.onclick = ()=>openChat(data);

usersDiv.appendChild(div);

}

});

}

function openChat(user){

document.getElementById('chatWith')
.innerText = user.phone;

currentRoom =
[auth.currentUser.uid,user.uid]
.sort()
.join('_');

loadMessages();

}

function loadMessages(){

messagesDiv.innerHTML = '';

const q = query(
collection(db,'chats',currentRoom,'messages'),
orderBy('time')
);

onSnapshot(q,(snapshot)=>{

messagesDiv.innerHTML = '';

snapshot.forEach((docu)=>{

const data = docu.data();

const div =
document.createElement('div');

div.className = 'message';

if(data.sender === auth.currentUser.uid){

div.classList.add('me');

}else{

div.classList.add('other');

}

div.innerText = data.text;

messagesDiv.appendChild(div);

});

messagesDiv.scrollTop =
messagesDiv.scrollHeight;

});

}

window.sendMessage = async()=>{

const input =
document.getElementById('messageInput');

const text = input.value;

if(!text) return;

await addDoc(
collection(db,'chats',currentRoom,'messages'),
{
text,
sender:auth.currentUser.uid,
time:Date.now()
}
);

input.value = '';

}

auth.onAuthStateChanged((user)=>{

if(!user){

location.href = 'index.html';
return;

}

loadUsers();

});