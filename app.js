async function fetchMeaning(word,targetId){

const target =
document.getElementById(targetId);

target.innerHTML =
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

target.innerHTML =
"<h3>Word Not Found</h3>";

return;

}

let entry =
data[0];

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

let example =
definition?.example ||
"Not Available";

let synonyms =
definition?.synonyms?.length
? definition.synonyms.join(", ")
: "None";

let antonyms =
definition?.antonyms?.length
? definition.antonyms.join(", ")
: "None";

target.innerHTML =

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


}
catch{

target.innerHTML =
"<h3>Error loading meaning</h3>";

}

}

document.addEventListener(
"DOMContentLoaded",
function(){

const searchBtn =
document.getElementById("searchBtn");

if(searchBtn){

searchBtn.addEventListener(
"click",
function(){

let word =
document.getElementById("wordInput")
.value
.trim();

if(!word) return;

fetchMeaning(
word,
"result"
);

});

}

});

function searchWord(word){
if(!word){
word = popupWord.value.trim();
}
fetchMeaning(
word,
"popupResult"
);

}
