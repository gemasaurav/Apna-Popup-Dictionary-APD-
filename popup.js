document.addEventListener("DOMContentLoaded", function () {

    const floatingBtn = document.getElementById("floatingBtn");

    floatingBtn.style.display = "none";

    document.addEventListener("selectionchange", function () {

        let selectedText = window.getSelection().toString().trim();

        if (selectedText.length > 0) {

            alert("Selected: " + selectedText);

            floatingBtn.style.display = "block";

        } else {

            floatingBtn.style.display = "none";

        }

    });

});
