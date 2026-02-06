function clearStyle(){
    let inputs = document.querySelectorAll("td input[type=text]");

    inputs.forEach(input => {
        input.style.backgroundColor = "#567257";
    });
}

function checkInputs() {
    // let valid = true;
    let inputs = document.querySelectorAll("td input[type=text]");

    clearStyle();
    
    inputs.forEach(input => {
        if (input.value.length == 0) {
            valid = false;
            input.style.backgroundColor = "#d95746";
            input.style.color = "white";
            input.style.border.style="solid";
            input.style.border.radius="8px";
            input.style.border.color="#d95746";
            input.style.outline="none";
        }
    });

    console.log("checkInput() called");
    
    
    // return valid;
}

function confirmPassword() {
    let valid = true;
    let passwords = document.querySelectorAll(".confirm-password");

    if (passwords[0].value != passwords[1].value) {
        passwords[0].style.backgroundColor = "red";
        passwords[1].style.backgroundColor = "red";

        valid = false;
    }

    return valid;
}