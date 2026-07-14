const popupSearch =
document.getElementById("popupSearch");

const popupResult =
document.getElementById("popupResult");

popupSearch.addEventListener(
"click",
searchWord
);

async function searchWord(){

let word =
document.getElementById("popupWord")
.value
.trim();

if(!word){

popupResult.innerHTML =
"<h3>Please enter a word</h3>";

return;

}

popupResult.innerHTML =
"<h3>Searching...</h3>";

try{

let response =
await fetch(
"https://api.dictionaryapi.dev/api/v2/entries/en/" + word
);

let data =
await response.json();

let entry =
data[0];

let meaning =
entry.meanings.find(
m => m.partOfSpeech === "noun"
) || entry.meanings[0];

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

<h2>${entry.word}</h2>

<p>
<b>Meaning:</b><br>
${definition.definition}
</p>

<p>
<b>Type:</b><br>
${meaning.partOfSpeech}
</p>

<p>
<b>Pronunciation:</b><br>
${entry.phonetic || "N/A"}
</p>

<p>
<b>Example:</b><br>
${definition.example || "Not Available"}
</p>

<p>
<b>Synonyms:</b><br>
${synonyms.length ?
synonyms.join(", ")
: "None"}
</p>

<p>
<b>Antonyms:</b><br>
${antonyms.length ?
antonyms.join(", ")
: "None"}
</p>

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

let audio =
new Audio(audioUrl);

audio.play();

}
