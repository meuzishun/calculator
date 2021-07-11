const display = document.querySelector('.display');
const numberBtns = [...document.querySelectorAll('.number-btn')];
const operatorBtns = [...document.querySelectorAll('.operator-btn')];
const clearBtn = document.querySelector('.clear-btn');

let displayValue = '';

function updateDisplay() {
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '';
}

function appendDisplay(val) {
    if (val === '.' && displayValue.includes('.')) return;
    if (val === '0' && displayValue === '0') return;
    if (val !== '0' && displayValue === '0') clearDisplay();
    displayValue += val;
}

function handleNumberBtn(evt) {
    const val = evt.target.innerText;
    appendDisplay(val);
    updateDisplay();
}

function handleClearBtn() {
    clearDisplay();
    displayValue = '0';
    updateDisplay();
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    return operator(num1, num2);
}

numberBtns.forEach(btn => btn.addEventListener('click', handleNumberBtn));
clearBtn.addEventListener('click', handleClearBtn);