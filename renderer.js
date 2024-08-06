


// renderer.js

const validUsername = "user";
const validPassword = "password";

document.querySelector('.login-form button').addEventListener('click', () => {
    const username = document.querySelector('.login-form input[type="text"]').value;
    const password = document.querySelector('.login-form input[type="password"]').value;

    if (username === validUsername && password === validPassword) {
        // Hide login page and show calculator
        document.querySelector('.login-page').style.display = 'none';
        document.querySelector('.calculator-page').style.display = 'flex';
    } else {
        alert('Invalid credentials, please try again.');
    }
});

let display = document.querySelector('.display');
let buttons = Array.from(document.querySelectorAll('.buttons button'));
let operand1 = null;
let operand2 = null;
let operator = null;
let previousResult = null;
let isRadians = true;

buttons.map(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerText;

        if (value === 'AC') {
            display.innerText = '0';
            operand1 = null;
            operand2 = null;
            operator = null;
        } else if (value === '=') {
            operand2 = parseFloat(display.innerText);
            switch (operator) {
                case '+':
                    display.innerText = operand1 + operand2;
                    break;
                case '-':
                    display.innerText = operand1 - operand2;
                    break;
                case '*':
                    display.innerText = operand1 * operand2;
                    break;
                case '/':
                    display.innerText = operand1 / operand2;
                    break;
                case '%':
                    display.innerText = operand1 % operand2;
                    break;
                case 'xy':
                    display.innerText = Math.pow(operand1, operand2);
                    break;
            }
            previousResult = display.innerText;
            operand1 = null;
            operand2 = null;
            operator = null;
        } else if (['+', '-', '*', '/', '%', 'xy'].includes(value)) {
            operator = value;
            operand1 = parseFloat(display.innerText);
            display.innerText = '';
        } else if (value === 'RAD') {
            isRadians = true;
            display.innerText = 'Rad';
        } else if (value === 'Deg') {
            isRadians = false;
            display.innerText = 'Deg';
        } else if (value === 'sin') {
            display.innerText = Math.sin(isRadians ? parseFloat(display.innerText) : parseFloat(display.innerText) * Math.PI / 180);
        } else if (value === 'cos') {
            display.innerText = Math.cos(isRadians ? parseFloat(display.innerText) : parseFloat(display.innerText) * Math.PI / 180);
        } else if (value === 'tan') {
            display.innerText = Math.tan(isRadians ? parseFloat(display.innerText) : parseFloat(display.innerText) * Math.PI / 180);
        } else if (value === 'ln') {
            display.innerText = Math.log(parseFloat(display.innerText));
        } else if (value === 'loge') {
            display.innerText = Math.log10(parseFloat(display.innerText));
        } else if (value === '√') {
            display.innerText = Math.sqrt(parseFloat(display.innerText));
        } else if (value === 'x!') {
            let num = parseFloat(display.innerText);
            let fact = 1;
            for (let i = 1; i <= num; i++) {
                fact *= i;
            }
            display.innerText = fact;
        } else if (value === 'π') {
            display.innerText = Math.PI;
        } else if (value === 'Ans') {
            display.innerText = previousResult;
        } else if (value === 'EXP') {
            display.innerText = Math.exp(parseFloat(display.innerText));
        } else if (value === 'Inv') {
            // Toggle between inverse functions
            // This example toggles between sin and arcsin
            // You can add similar toggles for cos, tan, etc.
            if (display.innerText.includes('sin')) {
                display.innerText = display.innerText.replace('sin', 'asin');
            } else if (display.innerText.includes('asin')) {
                display.innerText = display.innerText.replace('asin', 'sin');
            } else if (display.innerText.includes('cos')) {
                display.innerText = display.innerText.replace('cos', 'acos');
            } else if (display.innerText.includes('acos')) {
                display.innerText = display.innerText.replace('acos', 'cos');
            } else if (display.innerText.includes('tan')) {
                display.innerText = display.innerText.replace('tan', 'atan');
            } else if (display.innerText.includes('atan')) {
                display.innerText = display.innerText.replace('atan', 'tan');
            }
        } else if (value === '(' || value === ')') {
            display.innerText += value;
        } else {
            if (display.innerText === '0') display.innerText = value;
            else display.innerText += value;
        }
    });
});
