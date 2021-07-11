const display = document.querySelector('.display');
const numberBtns = [...document.querySelectorAll('.number-btn')];
const operatorBtns = [...document.querySelectorAll('.operator-btn')];
const clearBtn = document.querySelector('.clear-btn');

let displayValue = '';
let operand1 = null;
let operand2 = null;
let operation = null;

function updateDisplay() {
    display.textContent = displayValue;
}

function appendDisplay(val) {
    if (val === '.' && displayValue.includes('.')) return;
    if (val === '0' && displayValue === '0') return;
    if (val !== '0' && displayValue === '0') displayValue = '';
    displayValue += val;
}

function handleNumberBtn(evt) {
    const val = evt.target.innerText;
    appendDisplay(val);
    updateDisplay();
}

function handleClearBtn() {
    operation = null;
    displayValue = '0';
    updateDisplay();
}

function handleOperatorBtn(evt) {
    const val = evt.target.textContent;
    if (val !== '=') {
        operand1 = +displayValue;
        operation = operations[val];
        displayValue = '';
        return;
    }
    if (val === '=') {
        operand2 = +displayValue;
        displayValue = operate(operation, operand1, operand2);
        updateDisplay();
        displayValue = '';
        return;
    }
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

numberBtns.forEach(btn => btn.addEventListener('click', handleNumberBtn));
clearBtn.addEventListener('click', handleClearBtn);
operatorBtns.forEach(btn => btn.addEventListener('click', handleOperatorBtn));