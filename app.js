async function searchWord(word){

const popupWordTitle =
document.getElementById("popupWordTitle");

const popupResult =
document.getElementById("popupResult");

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

let entry =
data[0];

let meaning =
entry.meanings[0];

let definition =
meaning.definitions[0];

let synonyms = [];

entry.meanings.forEach(m=>{

if(m.synonyms){

synonyms.push(...m.synonyms);

}

});

synonyms =
[...new Set(synonyms)]
.slice(0,10);

let antonyms = [];

entry.meanings.forEach(m=>{

if(m.antonyms){

antonyms.push(...m.antonyms);

}

});

antonyms =
[...new Set(antonyms)]
.slice(0,10);

popupResult.innerHTML =

`

<p><b>Meaning:</b><br>
${definition.definition}</p>

<p><b>Type:</b><br>
${meaning.partOfSpeech}</p>

<p><b>Pronunciation:</b><br>
${entry.phonetic || "N/A"}</p>

<p><b>Example:</b><br>
${definition.example || "Not Available"}</p>

<p><b>Synonyms:</b><br>
${synonyms.length ? synonyms.join(", ") : "None"}</p>

<p><b>Antonyms:</b><br>
${antonyms.length ? antonyms.join(", ") : "None"}</p>

<button onclick="playAudio('${entry.phonetics?.[0]?.audio || ""}')">

🔊 Pronunciation

</button>
`;

}
catch{

popupResult.innerHTML =
"<h3>Word Not Found</h3>";

}

}

function playAudio(audioUrl){

if(!audioUrl){

alert("Audio not available");

return;

}

new Audio(audioUrl).play();

}

