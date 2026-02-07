export function checkInputs() {
    let valid = true;
    let inputs = document.querySelectorAll("td input[type=text]");

    clearStyle();
    
    inputs.forEach(input => {
        if (input.value.length == 0) {
            valid = false;
            input.style.backgroundColor = "#d95746";
            input.style.color = "white";
            input.style.border="solid #d95746";
            input.style.borderRadius="3px";
            input.style.outline="none";
        }
    });

    console.log("checkInput() called");
    
    
    return valid;
}

function clearStyle(){
    let inputs = document.querySelectorAll("td input[type=text]");

    inputs.forEach(input => {
        input.style.backgroundColor = "";
            input.style.color = "";
            input.style.border="";
            input.style.borderRadius="";
            input.style.outline="";
    });
}

function confirmPassword() {
    let valid = true;
    let passwords = document.querySelectorAll(".confirm-password");

    if (passwords[0].value != passwords[1].value) {
        passwords.forEach(input => {
            input.style.backgroundColor = "#d95746";
            input.style.color = "white";
            input.style.border="solid #d95746";
            input.style.borderRadius="3px";
            input.style.outline="none";
        });

        valid = false;
    }

    return valid;
}

window.checkInputs = checkInputs;
window.confirmPassword = confirmPassword;