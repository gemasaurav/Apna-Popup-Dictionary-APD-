async function searchWord(word){

const popupWordTitle =
document.getElementById("popupWordTitle");

const popupResult =
document.getElementById("popupResult");

if(!popupWordTitle || !popupResult){
return;
}

popupWordTitle.innerHTML =
"<h2>" + word + "</h2>";

popupResult.innerHTML =
"<h3>Searching...</h3>";

try{

let response =
await fetch(
"https://api.dictionaryapi.dev/api/v2/entries/en/" +
encodeURIComponent(word)
);

let data =
await response.json();

if(!data || !data[0]){

popupResult.innerHTML =
"<h3>Word Not Found</h3>";

return;

}

let entry = data[0];

let meaningText =
entry.meanings?.[0]?.definitions?.[0]?.definition
|| "Meaning not available";

let partOfSpeech =
entry.meanings?.[0]?.partOfSpeech
|| "N/A";

popupResult.innerHTML =

`

<h2>${entry.word}</h2>

<p>
<b>Meaning:</b><br>
${meaningText}
</p>

<p>
<b>Type:</b><br>
${partOfSpeech}
</p>
`;

}
catch(error){

popupResult.innerHTML =
"<h3>Error loading meaning</h3>";

console.log(error);

}

}

function playAudio(audioUrl){

if(!audioUrl){
alert("Audio not available");
return;
}

new Audio(audioUrl).play();

}
