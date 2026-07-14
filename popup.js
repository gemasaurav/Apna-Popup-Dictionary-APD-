let popupBtn = document.createElement("div");

popupBtn.innerHTML = "📖";
popupBtn.style.position = "absolute";
popupBtn.style.display = "none";
popupBtn.style.width = "40px";
popupBtn.style.height = "40px";
popupBtn.style.background = "#ff9800";
popupBtn.style.borderRadius = "50%";
popupBtn.style.textAlign = "center";
popupBtn.style.lineHeight = "40px";
popupBtn.style.fontSize = "22px";
popupBtn.style.cursor = "pointer";
popupBtn.style.zIndex = "9999";

document.body.appendChild(popupBtn);

document.addEventListener("mouseup", function () {

let selectedText = window.getSelection().toString().trim();

if(selectedText.length > 0){

let range = window.getSelection().getRangeAt(0);

let rect = range.getBoundingClientRect();

popupBtn.style.left =
(window.scrollX + rect.right + 10) + "px";

popupBtn.style.top =
(window.scrollY + rect.top) + "px";

popupBtn.style.display = "block";

popupBtn.dataset.word = selectedText;

}else{

popupBtn.style.display = "none";

}

});

popupBtn.addEventListener("click", function(){

let word = popupBtn.dataset.word;

window.open(
"https://gemasaurav.github.io/Apna-Popup-Dictionary-APD-/?word="
+ encodeURIComponent(word),
"_blank"
);

});
