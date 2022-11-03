// array to hold values entered from the buttons
let displayText = [];

// tracks last type of button pressed to properly process array values
let lastType = undefined;

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

// these two functions are used to properly handle button clicks and feed them into an array

function keyInput (entry) {
    //  displayText.push(entry);
    let div = document.getElementById('display');
    if ((entry === 'add') || (entry === 'sub') || (entry === 'mul') || (entry === 'div')) {
        //console.log(typeof entry);
        arrayInput('string', entry);
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
        arrayInput('num', entry);
    }
    return;
}

function arrayInput (type, entry) {
    let len = displayText.length;
    if (lastType === undefined) {
        displayText.push(entry);
        console.log(displayText);
        lastType = type;
        return; 
    }
    else if (type === 'string') {
        displayText.push(entry);
        console.log(displayText);
        lastType = type;
        return;
    }
    else if (lastType != 'string') {
        let current = displayText[len - 1].toString();
        entry.toString();
        displayText[len - 1] = parseInt(current.concat(entry));
        console.log(displayText);
        return;
    }
    else {
        displayText.push(entry);
        console.log(displayText);
        lastType = type;
        return; 
    }
}

// clears the display and resets global parameters to default values

function clearDisplay () {
    // clears current display and all array elements
    let div = document.getElementById('display');
    div.innerHTML = '';
    displayText = [];
    lastType = undefined;
}

// executes upon pressing the enter key. computes value of prior numbers and operators

function calculate () {
    let div = document.getElementById('display');
    // add in error handling function if user inputs an invalid sequence of characters
    let result;
    let len = displayText.length;
    for (let i = 2; i < len; i = i+2) {
        let a = displayText[i-2];
        let op = displayText[i-1];
        let b = displayText[i];
        result = operate(a, b, op);
        displayText[i] = result;
    }
    displayText = [];
    displayText[0] = result;
    div.innerHTML = `${result}`;
    lastType = 'num';
}

/* to be added: 

error handling function to check if a user input an operator first,
two consecutive operators,
or if they have input one number and one operator without another number, ex 2 + ''

backspace key and function to remove last element from array and display

*/