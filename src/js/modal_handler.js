export function displayModal() {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";
}

export function hideModal() {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";

    let inputs = document.querySelectorAll(".modal-content input[type=text]");

    inputs.forEach(input => {
        console.log(input.value)
        input.value = "";
        input.style.backgroundColor = "#567257";
        input.style.border = ""
    });
}

window.displayModal = displayModal;
window.hideModal = hideModal;