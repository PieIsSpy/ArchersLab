function clearStyle(){
    let inputs = document.querySelectorAll("th input[type=text]");

    inputs.forEach(input => {
        input.style.backgroundColor = "white";
    });
}

function checkInputs() {
    let valid = true;
    let inputs = document.querySelectorAll("th input[type=text]");

    clearStyle();
    
    inputs.forEach(input => {
        if (input.value.length == 0) {
            valid = false;
            input.style.backgroundColor = "red";
        }
    });

    console.log("checkInput() called");
    
    return valid;
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