const display = document.querySelector('.display');
const numberBtns = [...document.querySelectorAll('.number-btn')];
const operatorBtns = [...document.querySelectorAll('.operator-btn')];
const miscBtns = [...document.querySelectorAll('.misc-btn')];

// Calculator status
let queuedValue = null;
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

function resetStatus() {
    queuedValue = null;
    operand1 = null;
    operand2 = null;
    operation = null;
    result = null;
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
    const result = `${operator(num1, num2)}`;
    return validateResult(result);
}

function validateResult(result) {
    if (result === 'Infinity' || isNaN(result)) {
        return 'Error';
    } else {
        return result;
    }
}

function validateQueuedValue() {
    if (queuedValue.length > 12) {
        let dotPosition = queuedValue.indexOf('.');
        if (dotPosition > -1) {
            let value = +queuedValue;
            let str = value.toFixed(11 - dotPosition);
            return `${Number(str)}`;
        } else {
            return 'Too large';
        }
    } else {
        return queuedValue;
    }
}

function updateDisplay() {
    queuedValue = validateQueuedValue();
    display.textContent = `${queuedValue}`;
    if (queuedValue === 'Too large' || queuedValue === 'Error') {
        resetStatus();
        printDetails();
    }
}

function getDisplayValue() {
    return +display.textContent;
}

function processDotInput(val) {
    if (queuedValue?.includes('.')) {
        return;
    }
    if (queuedValue === null) queuedValue = '0';
    queuedValue += val;
    updateDisplay();
    printDetails();
}

function processZeroInput(val) {
    if (queuedValue === '0' || queuedValue === null) {
        queuedValue = '0';
    } else {
        queuedValue += val;
    }
    updateDisplay();
    printDetails();
}

function processNumInput(val) {
    if (queuedValue === '0' || queuedValue === null) {
        queuedValue = val;
    } else {
        queuedValue += val;
    }
    updateDisplay();
    printDetails();
}

function validateOperation() {}

function handleNumberBtn(evt) {
    const val = evt.target.innerText;

    if (queuedValue === null &&
        display.textContent !== null &&
        operand1 !== null &&
        operation !== null &&
        operand2 !== null) {
            resetStatus();
    }
    if (val === '.') {
        processDotInput(val);
        return;
    }
    if (val === '0') {
        processZeroInput(val);
        return;
    }
    processNumInput(val);
    printDetails();
    return;
}

function handleOperatorBtn(evt) {
    const val = evt.target.textContent;
    if (val !== '=') handleOperator(val);
    if (val === '=') handleEquals();
}

function handleOperator(val) {
    // if (queuedValue === null &&
    //     display.textContent === null &&
    //     operand1 === null &&
    //     operation === null &&
    //     operand2 === null) {
    //         return;
    // }
    
    // if (queuedValue !== null &&
    //     display.textContent === null &&
    //     operand1 === null &&
    //     operation === null &&
    //     operand2 === null) {
    //         return;
    // }
    
    // if (queuedValue === null &&
    //     display.textContent !== null &&
    //     operand1 === null &&
    //     operation === null &&
    //     operand2 === null) {
    //         return;
    // }

    if (queuedValue !== null &&
        display.textContent !== null &&
        operand1 === null &&
        operation === null &&
        operand2 === null) {
            operand1 = +queuedValue;
            operation = operations[val];
            queuedValue = null;
            printDetails();
            return;
    }

    if (queuedValue !== null &&
        display.textContent !== null &&
        operand1 !== null &&
        operation !== null &&
        operand2 === null) {
            operand2 = +display.textContent;
            result = operate(operation, operand1, operand2);
            queuedValue = result;
            updateDisplay();
            queuedValue = null;
            operand1 = +display.textContent;
            operand2 = null;
            operation = operations[val];
            result = null;
            printDetails();
            return;
    }
    
    if (queuedValue === null &&
        display.textContent !== null &&
        operand1 !== null &&
        operation !== null &&
        operand2 === null) {
            operation = operations[val];
            printDetails();
            return;
    }
    
    if (queuedValue === null &&
        display.textContent !== null &&
        operand1 !== null &&
        operation !== null &&
        operand2 !== null) {
            operand1 = +display.textContent;
            operation = operations[val];
            operand2 = null;
            printDetails();
            return;
    }
    
    if (queuedValue !== null &&
        display.textContent !== null &&
        operand1 !== null &&
        operation !== null &&
        operand2 !== null) {
            operand1 = +display.textContent;
            operation = operations[val];
            operand2 = null;
            queuedValue = null;
            printDetails();
            return;
    }
}

function handleEquals() {
    // if (queuedValue === null &&
    //     display.textContent === null &&
    //     operand1 === null &&
    //     operation === null &&
    //     operand2 === null) {
    //         return;
    // }

    // if (queuedValue === null &&
    //     display.textContent !== null &&
    //     operand1 === null &&
    //     operation === null &&
    //     operand2 === null) {
    //         return;
    // }
    
    // if (queuedValue !== null &&
    //     display.textContent !== null &&
    //     operand1 === null &&
    //     operation === null &&
    //     operand2 === null) {
    //         return;
    // }
    
    // if (queuedValue !== null &&
    //     display.textContent !== null &&
    //     operand1 !== null &&
    //     operation === null &&
    //     operand2 === null) {
    //         return;
    // }

    // if (queuedValue === null &&
    //     display.textContent !== null &&
    //     operand1 !== null &&
    //     operation !== null &&
    //     operand2 === null) {
    //         return;
    // }

    if (queuedValue !== null &&
        display.textContent !== null &&
        operand1 !== null &&
        operation !== null &&
        operand2 === null) {
            operand2 = +display.textContent;
            result = operate(operation, operand1, operand2);
            queuedValue = result;
            updateDisplay();
            queuedValue = null;
            printDetails();
            return;
    }
    
    if (queuedValue === null &&
        display.textContent !== null &&
        operand1 !== null &&
        operation !== null &&
        operand2 !== null) {
            operand1 = +display.textContent;
            result = operate(operation, operand1, operand2);
            queuedValue = result;
            updateDisplay();
            queuedValue = null;
            printDetails();
            return;
    }
}

function handleMiscBtn(evt) {
    const val = evt.target.textContent;
    if (val === 'AC') handleClearBtn();
    if (val === '%') handlePercentageBtn();
    if (val === '+/-') handleSignBtn();
}

function handleClearBtn() {
    queuedValue = '0';
    updateDisplay();
    resetStatus();
    printDetails();
}

function handlePercentageBtn() {
    const displayedValue = +display.textContent;
    const result = displayedValue * 0.01;
    queuedValue = `${validateResult(result)}`;
    updateDisplay();
    queuedValue = null;
    printDetails();
}

function handleSignBtn() {
    const displayedValue = +display.textContent;
    const result = displayedValue * -1;
    queuedValue = `${validateResult(result)}`;
    updateDisplay();
    printDetails();
}

numberBtns.forEach(btn => btn.addEventListener('click', handleNumberBtn));
operatorBtns.forEach(btn => btn.addEventListener('click', handleOperatorBtn));
miscBtns.forEach(btn => btn.addEventListener('click', handleMiscBtn));
