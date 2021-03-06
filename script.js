function Operation(operator, a, b){
    switch (true) {
        case operator == '*':
            console.log(`${a} * ${b}`);
            return a * b;
        case operator == '/':
            return a / b;
        case operator == '+':
            console.log(`${a} + ${b}`);
            return a + b; 
        case operator == '-':
            return a - b;
        default:
            return operator;
    }
}

const operators = document.querySelectorAll('.operator');
const userInput = document.getElementById('userInput');
const calculation = document.getElementById('calculation');

const numbers = document.querySelectorAll('.number');


numbers.forEach(function(number) {
    number.addEventListener('click', function() {

        if (userInput.innerHTML == '0' && backgroundColorChecker() == 2)
            userInput.innerHTML = this.innerHTML;
        else if(backgroundColorChecker() == 4)
        {
            userInput.innerHTML = this.innerHTML;
            operators.forEach((e) => {e.style.backgroundColor = '#808080';});
        }
        else
            userInput.innerHTML = userInput.innerHTML + this.innerHTML;

    });
});

const multiplication = document.getElementById('*');

let a = undefined;
let b = undefined;
let CurrentOperator = undefined;
let checker = 0; 

operators.forEach(function(e){
    
    e.addEventListener('click', function(){
        this.style.backgroundColor = '#949494';
        checker = 0;
        operators.forEach(function(e){
            if(e.style.backgroundColor[5] == '4')
            {
                checker++;
                e.style.backgroundColor = '#808080';
            }
        })
        
        if (checker > 1)
        {
            console.log(checker);
            calculation.innerHTML = calculation.innerHTML.slice(0,-1) + this.id;
        }
        else if (a == undefined)
        {
            a = parseFloat(userInput.innerHTML);
            calculation.innerHTML = `${a}` + this.id;
        }
        else{
            console.log(calculation.innerHTML.slice(-1))
            a = parseFloat(calculation.innerHTML.slice(0,-1));
            b = parseFloat(userInput.innerHTML);
            userInput.innerHTML = Operation(calculation.innerHTML.slice(-1), a, b);
            calculation.innerHTML = userInput.innerHTML + this.id;
        }  
        this.style.backgroundColor = '#949494';
        CurrentOperator = this.id;
    });
});

const Eq = document.querySelector('#equal');
equal.addEventListener('click', function(){
    if (a != undefined) {
        a = parseFloat(calculation.innerHTML.slice(0,-1));
        b = parseFloat(userInput.innerHTML);
        userInput.innerHTML = Operation(CurrentOperator, a, b);
        a = undefined;
        calculation.innerHTML = '';
    }
});

const clean = document.querySelector('#clean');
clean.addEventListener('click', function(){
    a = undefined;
    b = undefined;
    userInput.innerHTML = '0';
    calculation.innerHTML = '';
    operators.forEach((e) => e.style.backgroundColor = '#808080');
})

const dot = document.querySelector('#dot');
dot.addEventListener('click', function(){
    if (!userInput.innerHTML.includes("."))
    {
        userInput.innerHTML = userInput.innerHTML + '.';
    }
});

const sign = document.querySelector('#sign');
sign.addEventListener('click', function(){
    if (userInput.innerHTML[0] == '-')
        userInput.innerHTML = userInput.innerHTML.substring(1);
    else if (userInput.innerHTML[0] != '0')
        userInput.innerHTML = '-' + userInput.innerHTML;
});

function backgroundColorChecker(){
    let color = 2;
    operators.forEach(function(e){
        if(e.style.backgroundColor[5] == '4')
        {
            color = 4;
        }
    });
    return color;
}

const modulus = document.querySelector('#modulus');
modulus.addEventListener('click', function(){
        userInput.innerHTML = parseFloat(userInput.innerHTML) / 100.0;
});


//    background-color: #808080; darker rgb(128, 128, 128)
//    background-color: #949494; ligther  rgb(148, 148, 148)

// 12 + 7 - 5 * 3 = should yield 42