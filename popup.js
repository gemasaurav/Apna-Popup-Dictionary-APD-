let selectedWord = "";

document.addEventListener("DOMContentLoaded", function () {

    const floatingBtn = document.getElementById("floatingBtn");

    floatingBtn.style.display = "none";

    document.addEventListener("selectionchange", function () {

        let text = window.getSelection().toString().trim();

        if (text.length > 0) {

            selectedWord = text;

            floatingBtn.style.display = "flex";

        } else {

            floatingBtn.style.display = "none";

        }
    });

    floatingBtn.addEventListener("click", function () {

        if (!selectedWord) return;

        document.getElementById("wordInput").value = selectedWord;

        document.getElementById("searchBtn").click();

        floatingBtn.style.display = "none";
    });

});
