const searchBtn =
document.getElementById("searchBtn");

const result =
document.getElementById("result");

searchBtn.addEventListener(
"click",
function(){

let word =
document.getElementById(
"wordInput"
).value.toLowerCase();

if(dictionary[word]){

let data =
dictionary[word];

result.innerHTML =

`
<h2>${word}</h2>

<p><b>Type:</b>
${data.type}</p>

<p><b>English Meaning:</b>
${data.english}</p>

<p><b>Hindi Meaning:</b>
${data.hindi}</p>

<p><b>Synonyms:</b>
${data.synonyms}</p>

<p><b>Antonyms:</b>
${data.antonyms}</p>

<p><b>Example:</b>
${data.example}</p>

`;

}

else{

result.innerHTML =

"<h2>Word Not Found</h2>";

}

});
