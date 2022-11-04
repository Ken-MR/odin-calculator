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
    if (b === 0) {
        error(true);
        return 'zero';
    }
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
        if (result === 'zero') {
            return result;
        }
    }
    return result;
}

// these two functions are used to properly handle button clicks and feed them into an array

function keyInput (entry) {
    if (lastType === 'Error!') {
        clearDisplay(); // wipe display so error message won't persist for new calculations
    }
    let div = document.getElementById('display');
    if ((entry === 'add') || (entry === 'sub') || (entry === 'mul') || (entry === 'div')) {
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

// the function below handles logging information to the array for future calculations

function arrayInput (type, entry) {
    let len = displayText.length;
    if (lastType === undefined) { // condition for no data entered
        displayText.push(entry);
        lastType = type;
        return; 
    }
    else if (type === 'string') { // condition if string was input last
        displayText.push(entry);
        lastType = type;
        return;
    }
    else if (lastType != 'string') { // condition if number was input last and current type is num
        let current = displayText[len - 1].toString();
        entry.toString();
        displayText[len - 1] = parseInt(current.concat(entry));
        return;
    }
    else {  // condition if last type was string and current type is number
        displayText.push(entry);
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
    return;
}

// executes upon pressing the enter key. computes value of prior numbers and operators

function calculate () {
    let div = document.getElementById('display');
    // add in error handling function if user inputs an invalid sequence of characters
    if (((displayText[0] !== undefined) || displayText[0] === undefined)  
    && (displayText[1] === undefined)) {
        return; // only one character has been entered; result will always be the same
    }
    let result;
    let len = displayText.length;
    for (let i = 2; i < len; i += 2) {
        let a = displayText[i-2];
        let op = displayText[i-1];
        let b = displayText[i];
        result = operate(a, b, op);
        if (result === 'zero') {
            return;
        }
        displayText[i] = result;
    }
    if ((result === undefined) || (result === NaN)) {
        error();
        return;
    }
    displayText = [];
    displayText[0] = result;
    div.innerHTML = `${result}`;
    lastType = 'num';
}

// below is a function that is called when an error state is entered

function error (zero) {
    let div = document.getElementById('display');
    displayText = [];
    lastType = 'Error!';
    if (zero) {
        let div = document.getElementById('display');    
        div.innerHTML = 'Cannot divide by zero!';
        return;
    }   
    else {
        div.innerHTML = `${lastType}`;
        return;
    }
}

// function to delete last entered value

function backspace () {
    if (lastType === undefined) {
        return; // nothing to do, no data entered yet
    }
    else if (lastType === 'Error!') {
        clearDisplay();
        return; // clears error state
    }
    else if (lastType === 'num') {
        let div = document.getElementById('display');
        let display = div.innerText;
        display = display.slice(0, -1);
        div.innerHTML = `${display}`;
        let last = displayText.pop();
        console.log(displayText);
        last = last.toString();
        last = last.slice(0, -1); 
        last = parseInt(last);
        if (isNaN(last) && (displayText.length > 0)) {  
            // checks if number still exists after backspace and array isn't empty
            lastType = 'string';
            return; // if all numbers erased and array exists an operator must be left
        }
        else if (isNaN(last)) {
            clearDisplay();
            return; // if all numbers erased and length is zero then the display is empty
        }
        else {
            displayText.push(last);
            return; // if numbers exist still then the last number isn't entirely deleted
        }
    }
    else {  // state can only be entered if an operator was the last input
        let div = document.getElementById('display');
        let display = div.innerText;
        display = display.slice(0, -1);
        div.innerHTML = `${display}`;
        displayText.pop();
        if (displayText.length === 0) {
            clearDisplay();
            return; // the screen is empty, reset the calculator
        }
        else if (isNaN(displayText.slice(-1))) {
            lastType = 'string';
            return; // if isNaN is true then an operator was entered last
        }
        else {
            lastType = 'num';
            return; // if isNaN returns false then a number is still in the array and display
        }
    }
}

/* to be added: 

error handling function to check if a user input an operator first,
two consecutive operators,
or if they have input one number and one operator without another number, ex 2 + ''
DONE

backspace key and function to remove last element from array and display

decimal point key

*/