const display = document.querySelector('.display');
const numberBtns = [...document.querySelectorAll('.number-btn')];
const operatorBtns = [...document.querySelectorAll('.operator-btn')];
const clearBtn = document.querySelector('.clear-btn');

let queuedValue = '';
let operand1 = null;
let operand2 = null;
let operation = null;
let result = null;

// For testing purposes
function printDetails() {
    console.table({
        queuedValue,
        displayedValue: display.textContent,
        operand1,
        operand2,
        operation,
        result
    });
}

function updateDisplay() {
    display.textContent = queuedValue;
}

// function appendDisplay() {
//     display.textContent += queuedValue;
// }

function appendQueuedValue(val) {
    queuedValue += val;
}

function getDisplayValue() {
    return +display.textContent;
}

function checkDisplayIsZero() {
    return display.textContent === '0';
}

function checkDisplayHasFloat() {
    return display.textContent.includes('.');
}

function processDotInput(val) {
    if (checkDisplayHasFloat()) return;
    appendQueuedValue(val);
}

function processZeroInput(val) {
    if (checkDisplayIsZero()) return;
    appendQueuedValue(val);
}

function processNumInput(val) {
    if (checkDisplayIsZero()) {
        queuedValue = val;
        return;
    }
    appendQueuedValue(val);
}


const operations = {
    '+': function add(num1, num2) {
        return num1 + num2;
    },
    '−': function subtract(num1, num2) {
        return num1 - num2;
    },
    '×': function multiply(num1, num2) {
        return num1 * num2;
    },
    '÷': function divide(num1, num2) {
        return num1 / num2;
    }
}

function operate(operator, num1, num2) {
    return operator(num1, num2);
}

function handleNumberBtn(evt) {
    const val = evt.target.innerText;

    if (operation && operand1 && operand2) {
        queuedValue = '0';
        updateDisplay();
        operand1 = null;
        operand2 = null;
        operation = null;
        result = null;
    }

    // if (operation && operand1) {
    //     display.textContent = '';
    // }

    if (val === '.') processDotInput(val);
    if (val === '0') processZeroInput(val);
    if (val !== '.' && val !== '0') processNumInput(val);
    updateDisplay();
    printDetails();
}

function handleOperatorBtn(evt) {
    const val = evt.target.textContent;
    if (val !== '=') handleOperator(val);
    if (val === '=') handleEquals();
}

function handleOperator(val) {
    operand1 = getDisplayValue();
    if (result) {
        queuedValue = '0';
    } else {
        queuedValue = '';
    }
    operand2 = null;
    operation = operations[val];
    printDetails();
    return;
}

function handleEquals() {
    if (operand2) {
        operand1 = getDisplayValue();
    } else {
        operand2 = getDisplayValue();
    }
    result = operate(operation, operand1, operand2);
    queuedValue = result;
    updateDisplay();
    printDetails();
    return;
}

function handleClearBtn() {
    operand1 = null;
    operand2 = null;
    operation = null;
    result = null;
    queuedValue = '0';
    updateDisplay();
    printDetails();
}

numberBtns.forEach(btn => btn.addEventListener('click', handleNumberBtn));
clearBtn.addEventListener('click', handleClearBtn);
operatorBtns.forEach(btn => btn.addEventListener('click', handleOperatorBtn));