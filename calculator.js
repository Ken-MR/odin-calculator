// array to hold values entered from the buttons
let displayText = [];

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

function keyInput (entry) {
    displayText.push(entry);
    let div = document.getElementById('display');
    if ((entry === 'add') || (entry === 'sub') || (entry === 'mul') || (entry === 'div')) {
        switch(entry) {
            case 'add':
                div.innerHTML += '+';
                break;
            case 'sub':
                div.innerHTML += '-';
                break;
            case 'mul':
                div.innerHTML += 'x';
                break;
            case 'div':
                div.innerHTML += '/';
                break;
        }
    }
    else {
        div.innerHTML += entry;
    }
}

function clearDisplay () {
    // clears current display and all array elements
    let div = document.getElementById('display');
    div.innerHTML = '';
    let len = displayText.length;
    for (i = 0; i < len; i++) {
    displayText[i] = null;
    }
}

function calculate () {
    // to be filled in
}