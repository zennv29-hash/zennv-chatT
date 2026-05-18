import { auth, db } from './firebase.js';

import {
RecaptchaVerifier,
signInWithPhoneNumber
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
setDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.recaptchaVerifier =
new RecaptchaVerifier(
auth,
'recaptcha-container',
{
size:'normal'
}
);

let confirmationResult;

window.sendCode = async()=>{

let phone =
document.getElementById('phone').value;

if(!phone.startsWith('+62')){

phone = '+62' + phone.substring(1);

}

confirmationResult =
await signInWithPhoneNumber(
auth,
phone,
window.recaptchaVerifier
);

alert('OTP dikirim 😈🔥');

};

window.verifyCode = async()=>{

const otp =
document.getElementById('otp').value;

const result =
await confirmationResult.confirm(otp);

const user = result.user;

await setDoc(doc(db,'users',user.uid),{

uid:user.uid,
phone:user.phoneNumber,
online:true

});

location.href = 'chat.html';

};