let screen = document.getElementsByClassName("screen")[0];

let operand1 = document.getElementsByClassName("operand1")[0];
let operand2 = document.getElementsByClassName("operand2")[0];
let operator = document.getElementsByClassName("operator")[0];
let answer = document.getElementsByClassName("answer")[0];

let submit = document.getElementsByClassName("submit")[0];
let clear = document.getElementsByClassName("clear")[0];

let Calculation = document.querySelectorAll(".calc");
let keys = document.querySelectorAll(".key");
let operands = document.querySelectorAll(".operand");


// =====================================================
// VARIABLES
// =====================================================

let isSecondOperand = false;

// Tells us that "=" was pressed
let calculationFinished = false;

// Stores the previous answer
let previousAnswer = null;


// =====================================================
// MATH FUNCTIONS
// =====================================================

function sum(a, b) {
    return a + b;
}

function minus(a, b) {
    return a - b;
}

function Multiply(a, b) {
    return a * b;
}

function div(a, b) {

    if (b === 0) {
        return "Cannot divide by 0";
    }

    return a / b;
}


// =====================================================
// ENTER FIRST NUMBER
// =====================================================

function enterOperand1(value) {

    /*
       If previous calculation was completed
       and user enters a NUMBER,

       start a completely NEW calculation.
    */

    if (calculationFinished) {

        operand1.textContent = "";
        operand2.textContent = "";
        operator.textContent = "";
        answer.textContent = "";

        calculationFinished = false;
        previousAnswer = null;

        isSecondOperand = false;

        Calculation.forEach(item => {
            item.style.display = "flex";
        });

        answer.classList.add("dis");
    }


    // Prevent multiple decimals

    if (
        value === "." &&
        operand1.textContent.includes(".")
    ) {
        return;
    }


    // If first character is decimal

    if (
        value === "." &&
        operand1.textContent === ""
    ) {

        operand1.textContent = "0.";

        return;
    }


    operand1.textContent += value;
}


// =====================================================
// ENTER SECOND NUMBER
// =====================================================

function enterOperand2(value) {

    // Prevent multiple decimals

    if (
        value === "." &&
        operand2.textContent.includes(".")
    ) {
        return;
    }


    // If first character is decimal

    if (
        value === "." &&
        operand2.textContent === ""
    ) {

        operand2.textContent = "0.";

        return;
    }


    operand2.textContent += value;
}


// =====================================================
// ENTER OPERATOR
// =====================================================

function enterOperator(value) {

    /*
       IMPORTANT:

       If "=" was already pressed,

       Example:

       5 + 3 = 8

       then pressing +

       should make:

       8 + ...
    */

    if (calculationFinished) {

        operand1.textContent = previousAnswer;

        operand2.textContent = "";

        operator.textContent = value;

        answer.textContent = "";

        calculationFinished = false;

        isSecondOperand = true;


        // Show calculation again

        Calculation.forEach(item => {
            item.style.display = "flex";
        });

        answer.classList.add("dis");

        return;
    }


    // Don't allow operator without number

    if (operand1.textContent === "") {
        return;
    }


    /*
       If user presses another operator
       before entering second number,
       replace the operator.
    */

    if (
        isSecondOperand &&
        operand2.textContent === ""
    ) {

        operator.textContent = value;

        return;
    }


    operator.textContent = value;

    isSecondOperand = true;
}


// =====================================================
// NUMBER BUTTONS
// =====================================================

keys.forEach(button => {

    button.addEventListener("click", () => {

        let value = button.textContent;


        // Ignore C here
        // C has its own event listener

        if (button.classList.contains("clear")) {
            return;
        }


        if (!isSecondOperand) {

            enterOperand1(value);

        } else {

            enterOperand2(value);

        }

    });

});


// =====================================================
// OPERATOR BUTTONS
// =====================================================

operands.forEach(button => {

    button.addEventListener("click", () => {

        enterOperator(button.textContent);

    });

});


// =====================================================
// EQUAL BUTTON
// =====================================================

submit.addEventListener("click", () => {


    // Make sure calculation is complete

    if (
        operand1.textContent === "" ||
        operand2.textContent === "" ||
        operator.textContent === ""
    ) {
        return;
    }


    let a = Number(operand1.textContent);

    let b = Number(operand2.textContent);

    let result;


    // =================================================
    // CALCULATE
    // =================================================

    switch (operator.textContent) {

        case "+":

            result = sum(a, b);

            break;


        case "-":

            result = minus(a, b);

            break;


        case "*":

        case "×":

            result = Multiply(a, b);

            break;


        case "/":

        case "÷":

            result = div(a, b);

            break;

    }


    // =================================================
    // SHOW RESULT
    // =================================================

    answer.textContent = result;


    // Store result

    previousAnswer = result;


    // Hide calculation

    Calculation.forEach(item => {

        item.style.display = "none";

    });


    // Show answer

    answer.classList.remove("dis");


    // Mark calculation finished

    calculationFinished = true;

    isSecondOperand = false;

});


// =====================================================
// CLEAR
// =====================================================

clear.addEventListener("click", () => {

    operand1.textContent = "";

    operand2.textContent = "";

    operator.textContent = "";

    answer.textContent = "";


    isSecondOperand = false;

    calculationFinished = false;

    previousAnswer = null;


    // Show calculation

    Calculation.forEach(item => {

        item.style.display = "flex";

    });


    // Hide answer

    answer.classList.add("dis");

});


// =====================================================
// KEYBOARD SUPPORT
// =====================================================

document.addEventListener("keydown", (event) => {

    const key = event.key;


    // =================================================
    // NUMBERS
    // =================================================

    if (!isNaN(key)) {

        if (!isSecondOperand) {

            enterOperand1(key);

        } else {

            enterOperand2(key);

        }

    }


    // =================================================
    // DECIMAL
    // =================================================

    else if (key === ".") {

        if (!isSecondOperand) {

            enterOperand1(".");

        } else {

            enterOperand2(".");

        }

    }


    // =================================================
    // OPERATORS
    // =================================================

    else if (
        ["+", "-", "*", "/"].includes(key)
    ) {

        enterOperator(key);

    }


    // =================================================
    // ENTER / =
    // =================================================

    else if (
        key === "Enter" ||
        key === "="
    ) {

        submit.click();

    }


    // =================================================
    // BACKSPACE
    // =================================================

    else if (key === "Backspace") {


        /*
           If calculation is finished,
           don't destroy the previous answer.
        */

        if (calculationFinished) {
            return;
        }


        if (!isSecondOperand) {

            operand1.textContent =
                operand1.textContent.slice(0, -1);

        }

        else if (
            operand2.textContent !== ""
        ) {

            operand2.textContent =
                operand2.textContent.slice(0, -1);

        }

        else {

            operator.textContent = "";

            isSecondOperand = false;

        }

    }


    // =================================================
    // ESCAPE = CLEAR
    // =================================================

    else if (key === "Escape") {

        clear.click();

    }

});