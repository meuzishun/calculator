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

function appendQueuedValue(val) {
    queuedValue += val;
}

function getDisplayValue() {
    return +display.textContent;
}

function checkQueuedValueIsZero() {
    return queuedValue === '0';
}

function checkQueuedValueHasFloat() {
    return queuedValue.includes('.');
}

function processDotInput(val) {
    if (checkQueuedValueHasFloat()) return;
    appendQueuedValue(val);
    updateDisplay();
}

function processZeroInput(val) {
    if (checkQueuedValueIsZero()) return;
    appendQueuedValue(val);
    updateDisplay();
}

function processNumInput(val) {
    if (checkQueuedValueIsZero()) {
        queuedValue = val;
    } else {
        appendQueuedValue(val);
    }
    updateDisplay();
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