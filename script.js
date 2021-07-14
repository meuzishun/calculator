const display = document.querySelector('.display');
const numberBtns = [...document.querySelectorAll('.number-btn')];
const operatorBtns = [...document.querySelectorAll('.operator-btn')];
const clearBtn = document.querySelector('.clear-btn');

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
    if (result === 'Infinity') {
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
            return value.toFixed(11 - dotPosition);
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

    // if (queuedValue === null &&
    //     display.textContent === null &&
    //     operand1 === null &&
    //     operation === null &&
    //     operand2 === null) {
    //         // take the input and update display
    //         if (val === '.') {
    //             processDotInput(val);
    //             return;
    //         }
    //         if (val === '0') {
    //             processZeroInput(val);
    //             return;
    //         }
    //         processNumInput(val);
    //         printDetails();
    //         return;
    // }

    // if (queuedValue === null &&
    //     display.textContent !== null &&
    //     operand1 === null &&
    //     operation === null &&
    //     operand2 === null) {
    //         // take the input and update display
    //         if (val === '.') {
    //             processDotInput(val);
    //             return;
    //         }
    //         if (val === '0') {
    //             processZeroInput(val);
    //             return;
    //         }
    //         processNumInput(val);
    //         printDetails();
    //         return;
    //     }
        
    // if (queuedValue !== null &&
    //     display.textContent !== null &&
    //     operand1 === null &&
    //     operation === null &&
    //     operand2 === null) {
    //         // take the input and update display
    //         if (val === '.') {
    //             processDotInput(val);
    //             return;
    //         }
    //         if (val === '0') {
    //             processZeroInput(val);
    //             return;
    //         }
    //         processNumInput(val);
    //         printDetails();
    //         return;
    // }
        
    // if (queuedValue !== null &&
    //     display.textContent !== null &&
    //     operand1 !== null &&
    //     operation !== null &&
    //     operand2 === null) {
    //         // take the input and update display
    //         if (val === '.') {
    //             processDotInput(val);
    //             return;
    //         }
    //         if (val === '0') {
    //             processZeroInput(val);
    //             return;
    //         }
    //         processNumInput(val);
    //         printDetails();
    //         return;
    // }

    // if (queuedValue === null &&
    //     display.textContent !== null &&
    //     operand1 !== null &&
    //     operation !== null &&
    //     operand2 === null) {
    //         // take the input and update display
    //         if (val === '.') {
    //             processDotInput(val);
    //             return;
    //         }
    //         if (val === '0') {
    //             processZeroInput(val);
    //             return;
    //         }
    //         processNumInput(val);
    //         printDetails();
    //         return;
    // }
        
    // if (queuedValue === null &&
    //     display.textContent !== null &&
    //     operand1 !== null &&
    //     operation !== null &&
    //     operand2 !== null) {
    //         // clear the other data
    //         resetStatus();
    //         // take the input and update display
    //         if (val === '.') {
    //             processDotInput(val);
    //             return;
    //         }
    //         if (val === '0') {
    //             processZeroInput(val);
    //             return;
    //         }
    //         processNumInput(val);
    //         printDetails();
    //         return;
    // }

    if (queuedValue === null &&
        display.textContent !== null &&
        operand1 !== null &&
        operation !== null &&
        operand2 !== null) {
            // clear the other data
            resetStatus();
        }
            // take the input and update display
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
    if (queuedValue === null &&
        display.textContent === null &&
        operand1 === null &&
        operation === null &&
        operand2 === null) {
            return;
    }
    
    if (queuedValue !== null &&
        display.textContent === null &&
        operand1 === null &&
        operation === null &&
        operand2 === null) {
            return;
    }
    
    if (queuedValue === null &&
        display.textContent !== null &&
        operand1 === null &&
        operation === null &&
        operand2 === null) {
            return;
    }

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
}

function handleEquals() {

    if (queuedValue === null &&
        display.textContent === null &&
        operand1 === null &&
        operation === null &&
        operand2 === null) {
            return;
    }

    if (queuedValue === null &&
        display.textContent !== null &&
        operand1 === null &&
        operation === null &&
        operand2 === null) {
            return;
    }
    
    if (queuedValue !== null &&
        display.textContent !== null &&
        operand1 === null &&
        operation === null &&
        operand2 === null) {
            return;
    }
    
    if (queuedValue !== null &&
        display.textContent !== null &&
        operand1 !== null &&
        operation === null &&
        operand2 === null) {
            return;
    }

    if (queuedValue === null &&
        display.textContent !== null &&
        operand1 !== null &&
        operation !== null &&
        operand2 === null) {
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

function handleClearBtn() {
    queuedValue = '0';
    updateDisplay();
    resetStatus();
    printDetails();
}

numberBtns.forEach(btn => btn.addEventListener('click', handleNumberBtn));
operatorBtns.forEach(btn => btn.addEventListener('click', handleOperatorBtn));
clearBtn.addEventListener('click', handleClearBtn);



// When you click a number, it shows up in the display
// When you click an operator, it is stored in the code UNLESS

function testingDec(val) {
    let dotPosition = val.indexOf('.');
    let lastPosition = val.length - 1;
    let numberOfDec = 11 - dotPosition;
    // console.log(numberOfDec);
}

testingDec('23.455645678');
testingDec('24443.455666');