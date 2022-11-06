// array to hold values entered from the buttons
let displayText = [];

// tracks last type of button pressed to properly process array values
// can be number (decimal counts as number), string, error, or undefine (no data entered yet)
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
        return 'zero';  // special error case for dividing by zero
    }
    return a / b;
}

// function to determine which operations to perform based on array values

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

// this function is used to properly handle button clicks

function keyInput (entry) {
    if (lastType === 'Error!') {
        clearDisplay(); // wipe display so error message won't persist for new calculations
    }
    let div = document.getElementById('display');
    if ((entry === 'add') || (entry === 'sub') || (entry === 'mul') || (entry === 'div')) {
        // reenables decimal key because a new number will be entered next
        document.getElementById('decimal').disabled = false;
        arrayInput('string', entry);
        switch(entry) { // handles various operator entries
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
        decimalCheck(entry);
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
        displayText[len - 1] = current.concat(entry);
        decimalCheck(entry);
        return;
    }
    else {  // condition if last type was string and current type is number
        displayText.push(entry);
        lastType = type;
        decimalCheck(entry);
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
    // reenable decimal key as part of data clearing
    document.getElementById('decimal').disabled = false;
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
        result = operate(parseFloat(a), parseFloat(b), op);
        if (result === 'zero') {
            return;
        }
        displayText[i] = result;
    }
    if ((result === undefined) || (isNaN(result))) {
        error();
        return;
    }
    displayText = [];
    result = parseFloat(result.toFixed(4)); // round decimal places for long numbers
    displayText[0] = result
    div.innerHTML = `${result}`;
    lastType = 'num';   // calculations always yield number unless error state entered
    if (result % 1 != 0) {  // if integer reenable decimal otherwise disable until operator
        document.getElementById('decimal').disabled = true;
    }
    else {
        document.getElementById('decimal').disabled = false;
    }
    return;
}

// below is a function that is called when an error state is entered

function error (zero) {
    let div = document.getElementById('display');
    displayText = [];
    lastType = 'Error!';
    if (zero) { // special error case for dividing by zero
        let div = document.getElementById('display');    
        div.innerHTML = 'Cannot divide by zero!';
        return;
    }   
    else {  // general error case
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
        div.innerHTML = `${display.slice(0, -1)}`;
        let last = displayText.pop();
        last = last.toString().slice(0, -1);
        // checks if number still exists after backspace and array isn't empty
        if (isNaN(last) && (displayText.length > 0)) {  
            lastType = 'string';
            // no reason to disable decimal if an operator is the last entry
            document.getElementById('decimal').disabled = false;
            return; // if all numbers erased and array exists an operator must be left
        }
        else if (isNaN(last)) {
            clearDisplay();
            return; // if all numbers erased and length is zero then the display is empty
        }
        else {
            if (last.includes(".")) {  // if integer reenable decimal otherwise disable until operator
                document.getElementById('decimal').disabled = true;
            }
            else {
                document.getElementById('decimal').disabled = false;
            }
            displayText.push(last);
            return; // if numbers exist still then the last number isn't entirely deleted
        }
    }
    else {  // state can only be entered if an operator was the last input
        let div = document.getElementById('display');
        let display = div.innerText;
        div.innerHTML = `${display.slice(0, -1)}`;
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

// function to check if a decimal point is present in the current number

function decimalCheck(dec) {
    if (dec === '.') {
        // disable decimal key so only one can be input per number, any operator entry reenables
        document.getElementById('decimal').disabled = true;
    }
    return;
}

/* to be added: 
Handle long decimal strings or numbers going off the edge of the calculator screen

General CSS cleanup and visual improvements
*/