//listen for submit
document.querySelector('#loan-form').addEventListener('submit', calculate);


//calculate results
function calculate(e) {
  //UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  //others vars
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;
  //compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  //check if monthly is finite
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);
  }
  else {
    showError('Please Check Your Numbers');
    monthlyPayment.value = '';
    totalPayment.value = '';
    totalInterest.value = '';
  }
  e.preventDefault();
}

// show error function
function showError(error) {
  //create a div
  const errorDiv = document.createElement('div');
  //add a class
  errorDiv.className = 'alert alert-danger';
  //get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  //create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  //insert error above heading
  card.insertBefore(errorDiv, heading);
  //clear error
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}
