const display = document.querySelector('.display');
const numberBtns = [...document.querySelectorAll('.number-btn')];
const operatorBtns = [...document.querySelectorAll('.operator-btn')];
const clearBtn = document.querySelector('.clear-btn');

let inputValue = '';
let operand1 = null;
let operand2 = null;
let operation = null;
let result = null;

function printDetails() {
    console.table({
        inputValue,
        operand1,
        operand2,
        operation,
        result
    });
}

function updateDisplay() {
    display.textContent = `${inputValue}`;
}

function retrieveDisplay() {
    inputValue = display.textContent;
    console.log(inputValue);
}

function appendDisplay(val) {
    if (val === '.' && inputValue.includes('.')) return;
    if (val === '0' && inputValue === '0') return;
    if (val !== '0' && inputValue === '0') inputValue = '';
    inputValue += val;
}

function handleNumberBtn(evt) {
    const val = evt.target.innerText;
    appendDisplay(val);
    updateDisplay();
    printDetails();
}

function handleClearBtn() {
    operand1 = null;
    operand2 = null;
    operation = null;
    result = null;
    inputValue = '0';
    updateDisplay();
    printDetails();
}

function handleOperatorBtn(evt) {
    const val = evt.target.textContent;
    if (val !== '=') {
        operand1 = result || +inputValue;
        operation = operations[val];
        inputValue = '';
        printDetails();
        return;
    }
    if (val === '=') {
        operand2 = +inputValue;
        result = operate(operation, operand1, operand2);
        inputValue = result;
        updateDisplay();
        inputValue = '';
        printDetails();
        // operand1 = null;
        // operand2 = null;
        // operation = null;
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