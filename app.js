//DOM Elements
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const displayEl = document.querySelector('.display');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');

const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray = [
  number0El, number1El, number2El, number3El, number4El, number5El, number6El, number7El, 
  number8El, number9El
];

//Varibles
let valueStrInMemory = null;
let operatorInMemory = null;


//Functions
const getDisplayAsStr = () => displayEl.textContent.split(',').join('');

const getDisplayAsNum = () => {
  return parseFloat(getDisplayAsStr());
};

const setStrAsDisplay = (displayStr) => {
  if(displayStr[displayStr.length - 1] === '.') {
    displayEl.textContent += '.';
    return;
  }

  const [wholeNumStr, decimalStr] = displayStr.split('.');
  if (decimalStr) {
    displayEl.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    displayEl.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

const handleNumberClick = (numStr) => {
  const currentDisplayStr = getDisplayAsStr();
  if (currentDisplayStr === '0') {
    setStrAsDisplay(numStr);
  } else {
    setStrAsDisplay(currentDisplayStr + numStr);
  }
};

const getResultOfOperationAsStr = () => {
  const currentDisplayNum = getDisplayAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory)
  let newDisplayNum;
  if (operatorInMemory === 'addition') {
    newDisplayNum = valueNumInMemory + currentDisplayNum;
  } else if (operatorInMemory === 'subtraction') {
    newDisplayNum = valueNumInMemory - currentDisplayNum;
  } else if (operatorInMemory === 'multiplication') {
    newDisplayNum = valueNumInMemory * currentDisplayNum;
  } else if (operatorInMemory === 'division') {
    newDisplayNum = valueNumInMemory / currentDisplayNum;
  }

  return newDisplayNum.toString();
}

const handleOperatorClick = (operation) => {
  const currentDisplayStr = getDisplayAsStr();
  if (!valueStrInMemory) {
    valueStrInMemory = currentDisplayStr;
    operatorInMemory = operation;
    setStrAsDisplay('0');
    return;
  }
  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue('0');
};







//Add Event Listeners to buttons

//Numbers
for (let i=0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener('click', () => {
    handleNumberClick(i.toString());
  });
};

//Decimal
decimalEl.addEventListener('click', () => {
  const currentDisplayStr = getDisplayAsStr();
  if(!currentDisplayStr.includes('.')) {
    setStrAsDisplay(currentDisplayStr + '.');
  }
});

//Calculator Funcitons
acEl.addEventListener ('click', () => {
  setStrAsDisplay('0');
  valueStrInMemory = null;
  operatorInMemory = null;
});

pmEl.addEventListener('click', () => {
  const currentDisplayNum = getDisplayAsNum();
  const currentDisplayStr = getDisplayAsStr();

  if (currentDisplayStr === '-0') {
    setStrAsDisplay('0');
    return;
  }
  if (currentDisplayNum >= 0) {
    setStrAsDisplay('-' + currentDisplayStr)
  } else {
    setStrAsDisplay(currentDisplayStr.substring(1));
  }
});

percentEl.addEventListener('click', () => {
  const currentDisplayNum = getDisplayAsNum();
  const newValueNum = currentDisplayNum / 100;
  setStrAsDisplay(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});

//Operators
additionEl.addEventListener('click', () => {
  handleOperatorClick('addition');
});

subtractionEl.addEventListener('click', () => {
  handleOperatorClick('subtraction');
});

multiplicationEl.addEventListener('click', () => {
  handleOperatorClick('multiplication');
});

divisionEl.addEventListener('click', () => {
  handleOperatorClick('division');
});

equalEl.addEventListener('click', () => {
  if (valueStrInMemory) {
    setStrAsDisplay(getResultOfOperationAsStr());
    valueStrInMemory = null; 
    operatorInMemory = null;
  }
});


//set up time
const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes().toString().padStart(2, '0');

  if (currentHour > 12) {
    currentHour -= 12;
  }

  hourEl.textContent = currentHour;
  minuteEl.textContent = currentMinute;
};


setInterval(updateTime, 2000);
updateTime();

