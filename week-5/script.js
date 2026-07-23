// Get the display element
let display = document.getElementById('display');

// Append a number or decimal point to the display
function appendNumber(num) {
    if (display.value === 'Error') {
        display.value = '';
    }
    
    // Avoid leading multiple zeros
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else {
        display.value += num;
    }
}

// Append an operator to the display
function appendOperator(op) {
    if (display.value === '' || display.value === 'Error') {
        return;
    }
    // Prevent consecutive operators
    let lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + op;
    } else {
        display.value += op;
    }
}

// Clear the display screen
function clearDisplay() {
    display.value = '';
}

// Perform calculation using eval()
function calculate() {
    if (display.value === '' || display.value === 'Error') {
        return;
    }
    try {
        // eval is a simple way for beginners to evaluate math expressions in JS
        let result = eval(display.value);
        
        // Handle division by zero
        if (result === Infinity || result === -Infinity) {
            display.value = 'Error';
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
    }
}
