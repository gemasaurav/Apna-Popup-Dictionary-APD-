const searchBtn =
document.getElementById("searchBtn");

const result =
document.getElementById("result");

async function searchWord() {

    let word = document.getElementById("wordInput").value.trim();

    if (!word) return;

    try {

        let response = await fetch(
            "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
        );

        let data = await response.json();

        let entry = data[0];

        let meaning = entry.meanings[0];

        let definition = meaning.definitions[0];

        document.getElementById("result").innerHTML = `

            <h2>${entry.word}</h2>

            <p><b>Pronunciation:</b> ${entry.phonetic || "N/A"}</p>

            <p><b>English Meaning:</b>
            ${definition.definition}</p>

            <p><b>Type:</b>
            ${meaning.partOfSpeech}</p>

            <p><b>Hindi Meaning:</b>
            (Coming in Step 2)</p>

            <p><b>Example:</b>
            ${definition.example || "Not Available"}</p>

            <p><b>Synonyms:</b>
            ${(definition.synonyms || []).join(", ") || "None"}</p>

            <p><b>Antonyms:</b>
            ${(definition.antonyms || []).join(", ") || "None"}</p>

            <button onclick="playAudio('${entry.phonetics[0]?.audio}')">
            🔊 Pronunciation
            </button>

        `;

    } catch {

        document.getElementById("result").innerHTML =
        "<h3>Word Not Found</h3>";

    }

}
