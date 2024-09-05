function updateSearchBar() {
    const selector = document.getElementById("optionSelector");
    const andText = document.getElementById("andText");
    const searchFields = document.getElementById("searchFields");
    const inputFields = searchFields.getElementsByClassName("input-field");

    if (selector.value === "soy") {
        inputFields[0].style.display = "block";
        inputFields[1].style.display = "none"
        andText.style.display = "inline";
        inputFields[2].style.display = "block";
    } else {
        inputFields[0].style.display = "none";
        inputFields[1].style.display = "block";
        andText.style.display = "none";
        inputFields[2].style.display = "none";
    }
}
