async function searchWord(word = null, target = "result") {

    const inputWord = word || document.getElementById("wordInput").value.trim();

    if (!inputWord) return;

    const output = document.getElementById(target);

    output.innerHTML = "Loading...";

    try {

        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`
        );

        const data = await response.json();

        if (!Array.isArray(data)) {
            output.innerHTML = "Word not found";
            return;
        }

        const entry = data[0];

        const wordText = entry.word || inputWord;

        const phonetic =
            entry.phonetic ||
            (entry.phonetics &&
                entry.phonetics.find(p => p.text)?.text) ||
            "Not Available";

        let audio = "";

        if (entry.phonetics) {
            const audioObj = entry.phonetics.find(
                p => p.audio && p.audio.length > 0
            );
            if (audioObj) audio = audioObj.audio;
        }

        const meaning =
            entry.meanings?.[0]?.definitions?.[0]?.definition ||
            "Not Available";

        const example =
            entry.meanings?.[0]?.definitions?.[0]?.example ||
            "Not Available";

        const part =
            entry.meanings?.[0]?.partOfSpeech ||
            "Not Available";

        const synonyms =
            entry.meanings?.[0]?.synonyms?.slice(0, 10).join(", ") ||
            "None";

        const antonyms =
            entry.meanings?.[0]?.antonyms?.slice(0, 10).join(", ") ||
            "None";

        output.innerHTML = `
        <h2>${wordText}</h2>

        <p><b>Meaning:</b><br>${meaning}</p>

        <p><b>Type:</b><br>${part}</p>

        <p><b>Pronunciation:</b><br>${phonetic}</p>

        <p><b>Example:</b><br>${example}</p>

        <p><b>Synonyms:</b><br>${synonyms}</p>

        <p><b>Antonyms:</b><br>${antonyms}</p>

        ${
            audio
                ? `<button onclick="new Audio('${audio}').play()">
                     🔊 Pronunciation
                   </button>`
                : ""
        }
        `;
    } catch (error) {

        output.innerHTML = "Error loading meaning";

        console.log(error);

    }
}

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("searchBtn");

    if (btn) {
        btn.addEventListener("click", () => {
            searchWord();
        });
    }

});
