var form = document.getElementById('myForm');
var checkValidationButton = document.getElementById("checkValidation");
checkValidation();


function checkValidation() {
    var validInputs = form.getElementsByClassName("is-valid").length;

    if (validInputs === 3) {
        checkValidationButton.disabled = false;
    } else {
        checkValidationButton.disabled = true; 
    }
}


function validate(element) {
    var input = document.getElementsByName(element)[0];
    var inputValue = input.value;
    if (isValidNumber(inputValue)) {
        setValid(element)
    } else {
        setInvalid(element)
        displayError(element);
    }
    checkValidation();
}

function isValidNumber(number) {
    const numberPattern = /^\d*\.?\d+$/;

    return numberPattern.test(number);
}



function displayError(id) {
    const errorElement = document.getElementById(id + 'Error');
    errorElement.style.display = "block";
    errorElement.textContent = 'only positive numbers';
    document.getElementById(id.replace("Error", "")).classList.add("error-border");
}

function resetForm() {
    const errorElements = document.querySelectorAll(".error");
    const inputFields = document.querySelectorAll(".input-text");

    errorElements.forEach((element) => {
        element.style.display = "none";
    });

    inputFields.forEach((field) => {
        field.classList.remove("error-border");
    });
}

function setInvalid(element) {
    var input = document.getElementsByName(element)[0];
    input.classList.add('is-invalid');
    input.classList.remove('is-valid')
}

function setValid(element) {
    var input = document.getElementsByName(element)[0];
    input.classList.add('is-valid');
    input.classList.remove('is-invalid')
    const errorElement = document.getElementById(element + 'Error');
    errorElement.style.display = "block";
    errorElement.textContent = '';
};