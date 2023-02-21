// GET BILL VALUE
const bill = document.getElementById('billInput'); // Get bill input element from DOM
const tipButtons = document.querySelectorAll('.btn-percent'); // Get all tip buttons from DOM
const tipCustom = document.getElementById('custom'); // Get custom tip input element from DOM
const numPeople = document.getElementById('numPeople'); // Get number of people input element from DOM
const errMsg = document.querySelector('.err-msg'); // Get error message element from DOM
const output = document.querySelectorAll('.output-number'); // Get output elements from DOM
const buttonReset = document.querySelector('.btn-reset'); // Get reset button from DOM

const validateFloat = (s) => /^[0-9]*\.?[0-9]*$/.test(s); // Function to validate float numbers
const validateInt = (s) => /^[0-9]*$/.test(s); // Function to validate integer numbers

let billValue = 0.0; // Default value for bill
let tipValue = 0.0; // Default value for tip percentage
let peopleValue = 1; // Default value for number of people

bill.addEventListener('input', setBillValue); // Listen for bill input changes
tipButtons.forEach(btn => {
  btn.addEventListener('click', handleClick); // Listen for tip button clicks
});

tipCustom.addEventListener('input', setTipCustomValue); // Listen for custom tip input changes
numPeople.addEventListener('input', setPeopleValue); // Listen for number of people input changes
buttonReset.addEventListener('click', reset); // Listen for reset button click

// Sets the value of the bill and calls the calcTip function
function setBillValue() {
  if (bill.value.includes(',')) {
    bill.value = bill.value.replace(',', '.'); // Replace comma with decimal point
  }

  // Cut out invalid characters 
  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1); // Remove the last character from the string
  }

  billValue = parseFloat(bill.value); // Parse the bill value as a float
  calcTip(); // Recalculate the tip
}

// Handles click events on the tip buttons and calls the calcTip function
function handleClick(e) {
  tipButtons.forEach(btn => {
    // Clear active state
    btn.classList.remove('active');

    // Set active state
    if (e.target.innerHTML == btn.innerHTML) {
      btn.classList.add('active');
      tipValue = parseFloat(btn.innerHTML) / 100;

      calcTip(); // Recalculate the tip
    }

    // Clear custom tip
    tipCustom.value = '';
  });
}

// Sets the value of the custom tip and calls the calcTip function
function setTipCustomValue() {
  if (!validateInt(tipCustom.value)) {
    tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1); // Remove the last character from the string
  }

  tipValue = parseFloat(tipCustom.value / 100); // Parse the custom tip value as a float

  // Remove active state from buttons
  tipButtons.forEach(btn => {
    btn.classList.remove('active');
  });

  if (tipCustom.value !== '') {
    calcTip(); // Recalculate the tip
  }
}

// Set the number of people to split the bill between
function setPeopleValue() {
  // Check if the input value is an integer
  if (!validateInt(numPeople.value)) {
    // Remove the last character if it's not a number
    numPeople.value = numPeople.value.substring(0, numPeople.value.length - 1);
  }

  // Set the peopleValue to the input value
  peopleValue = parseFloat(numPeople.value);

  // Show an error message if the number of people is less than or equal to 0
  if (peopleValue <= 0) {
    errMsg.classList.add('show-err');
    numPeople.classList.add('err-outline');
  } else {
    // Hide the error message and remove the red border around the input
    errMsg.classList.remove('show-err');
    numPeople.classList.remove('err-outline');
  }

  // Calculate the tip and update the output
  calcTip();
}

// Calculate the tip and update the output
function calcTip() {
  if (peopleValue >= 1) {
    // Calculate the tip amount and the total bill amount per person
    let tipAmount = billValue * tipValue / peopleValue;
    let total = billValue * (tipValue + 1) / peopleValue;

    // Update the output to display the tip amount and the total bill amount per person
    output[0].innerHTML = '$' + tipAmount.toFixed(2);
    output[1].innerHTML = '$' + total.toFixed(2);
  }
}

// Reset the form to its initial state
function reset() {
  // Clear the bill input and set the billValue to 0
  bill.value = '';
  setBillValue();

  // Clear the number of people input and set the peopleValue to 1
  numPeople.value = '';
  setPeopleValue();

  // Reload the page to reset the custom tip input and the tip buttons
  location.reload();
}
