alert("app.js loaded");
const searchBtn =
document.getElementById("searchBtn");

const result =
document.getElementById("result");

searchBtn.addEventListener("click", function(){

```
searchWord();
```

});

async function searchWord() {

```
let word =
document.getElementById("wordInput")
.value
.trim();

if(!word){

    result.innerHTML =
    "<h3>Please enter a word</h3>";

    return;

}

result.innerHTML =
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
    entry.meanings[0];

    let definition =
    meaning.definitions[0];

    result.innerHTML =

    `
    <h2>${entry.word}</h2>

    <p><b>English Meaning:</b><br>
    ${definition.definition}</p>

    <p><b>Hindi Meaning:</b><br>
    Coming Soon</p>

    <p><b>Type:</b><br>
    ${meaning.partOfSpeech}</p>

    <p><b>Pronunciation:</b><br>
    ${entry.phonetic || "N/A"}</p>

    <p><b>Example:</b><br>
    ${definition.example || "Not Available"}</p>

    <p><b>Synonyms:</b><br>
    ${(definition.synonyms || []).join(", ") || "None"}</p>

    <p><b>Antonyms:</b><br>
    ${(definition.antonyms || []).join(", ") || "None"}</p>

    <button onclick="playAudio('${entry.phonetics[0]?.audio || ""}')">

    🔊 Pronunciation

    </button>
    `;

}

catch{

    result.innerHTML =
    "<h3>Word Not Found</h3>";

}
```

}

function playAudio(audioUrl){

```
if(!audioUrl){

    alert("Audio not available");

    return;

}

let audio =
new Audio(audioUrl);

audio.play();
```

}
