
// Basic functions for various calculator operations

function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

// More complex functions to operate on the numbers and operators input from the browser

function operate (a, b, op) {
    let result = undefined;
    if (op === 'add') {
        result = add(a, b);
    }
    else if (op === 'sub') {
        result = subtract(a, b);
    }
    else if (op === 'mul') {
        result = multiply(a, b);
    }
    else if (op === 'div') {
        result = divide(a, b);
    }
    return result;
}