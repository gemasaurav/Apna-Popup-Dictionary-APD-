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

let meaning =
entry.meanings?.[0];

let definition =
meaning?.definitions?.[0];

let meaningText =
definition?.definition ||
"Meaning not available";

let partOfSpeech =
meaning?.partOfSpeech ||
"N/A";

let phonetic =
entry.phonetic ||
entry.phonetics?.[0]?.text ||
"N/A";

let audio =
entry.phonetics?.find(
p => p.audio
)?.audio || "";

let example =
definition?.example ||
"Not Available";

let synonyms =
definition?.synonyms?.length
? definition.synonyms.slice(0,10).join(", ")
: "None";

let antonyms =
definition?.antonyms?.length
? definition.antonyms.slice(0,10).join(", ")
: "None";

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

<p>
<b>Pronunciation:</b><br>
${phonetic}
</p>

<p>
<b>Example:</b><br>
${example}
</p>

<p>
<b>Synonyms:</b><br>
${synonyms}
</p>

<p>
<b>Antonyms:</b><br>
${antonyms}
</p>

<button onclick="playAudio('${audio}')">
🔊 Pronunciation
</button>

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
