let selectedWord = "";

document.addEventListener(
"DOMContentLoaded",
function(){

const floatingBtn =
document.getElementById("floatingBtn");

const popupBox =
document.getElementById("popupBox");

const closePopup =
document.getElementById("closePopup");

floatingBtn.style.display =
"none";

document.addEventListener(
"selectionchange",
function(){

let text =
window.getSelection()
.toString()
.trim();

if(text.length > 0){

selectedWord = text;

floatingBtn.style.display =
"flex";

}else{

floatingBtn.style.display =
"none";

}

});

floatingBtn.addEventListener(
"click",
function(){

if(!selectedWord) return;

popupBox.style.display =
"block";
document.getElementById("popupResult").innerHTML =
document.getElementById("result").innerHTML;
searchWord(selectedWord);

floatingBtn.style.display =
"none";

});

closePopup.addEventListener(
"click",
function(){

popupBox.style.display =
"none";

});

window.addEventListener(
"click",
function(e){

if(e.target === popupBox){

popupBox.style.display =
"none";

}

});

});
