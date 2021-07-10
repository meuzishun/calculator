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
    updateDisplay();
}

function appendDisplay(val) {
    displayValue += val;
    updateDisplay();
}

function handleNumberBtn(evt) {
    const val = evt.target.innerText;
    appendDisplay(val);
}

numberBtns.forEach(btn => btn.addEventListener('click', handleNumberBtn));

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