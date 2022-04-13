// GET BILL VALUE
const bill = document.getElementById('billInput');
const tipButtons = document.querySelectorAll('.btn-percent');
const tipCustom = document.getElementById('custom');
const numPeople = document.getElementById('numPeople');
const errMsg = document.querySelector('.err-msg');
const output = document.querySelectorAll('.output-number');
const buttonReset = document.querySelector('.btn-reset');

let billValue = 0.0; // Default Value
let tipValue = 0.15; // Default Value -> 15% button is active
let peopleValue = 1; // Default Value

bill.addEventListener('input', setBillValue);

tipButtons.forEach(btn => {
  btn.addEventListener('click', handleClick);
});

tipCustom.addEventListener('input', setTipCustomValue);
numPeople.addEventListener('input', setPeopleValue);
buttonReset.addEventListener('click', reset);

function setBillValue() {
  billValue = parseFloat(bill.value);

  calcTip();
}

function handleClick() {
  tipButtons.forEach(btn => {
    // Clear active state
    btn.classList.remove('active');

    // Set active state
    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add('active');
      tipValue = parseFloat(btn.innerHTML)/100;

      calcTip();
    }

    // Clear custom tip
    tipCustom.value = '';
  });
}

function setTipCustomValue() {
  tipValue = parseFloat(tipCustom.value/100);

  // Remove active state from buttons
  tipButtons.forEach(btn => {
    btn.classList.remove('active');
  });

  if (tipCustom.value !== '') {
    calcTip();
  }
}

function setPeopleValue() {
  peopleValue = parseFloat(numPeople.value);
  if (peopleValue <= 0) {
    errMsg.classList.add('show-err');
    numPeople.classList.add('err-outline');
  } else {
    errMsg.classList.remove('show-err');
    numPeople.classList.remove('err-outline');
 
  }

  calcTip();
}

function calcTip() {
  if (peopleValue >= 1) {
    let tipAmount = billValue * tipValue / peopleValue;
    let total = billValue * (tipValue + 1) / peopleValue;
    output[0].innerHTML = '$' + tipAmount.toFixed(2);
    output[1].innerHTML = '$' + total.toFixed(2);
  }
}

function reset() {
  bill.value = '0.0';
  setBillValue();

  tipButtons[2].click();

  numPeople.value = '1';
  setPeopleValue();
}
