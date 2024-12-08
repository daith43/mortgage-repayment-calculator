const clearAll = document.querySelector("#clearAll");
const form = document.querySelector("#calculator");
const inputsText = document.querySelectorAll('input[type="text"]');

// Resultados, Empty y Completed
const empty = document.querySelector("#empty");
const completed = document.querySelector("#completed");
let monthlyResult = document.querySelector(".month-result");
let totalResult = document.querySelector(".total-result");

// Input
let amount = document.querySelector("#amount");
let term = document.querySelector("#term");
let rate = document.querySelector("#rate");
let repayment = document.querySelector("#repayment");
let interestOnly = document.querySelector("#interest-only");


const contRadio1 = document.querySelector('#radio1');
const contRadio2 = document.querySelector('#radio2');

contRadio1.addEventListener('click', ()=>{
  repayment.checked = true;

  contRadio1.classList.add('checked');
  contRadio1.classList.remove('not-checked');

  contRadio2.classList.add('not-checked');
  contRadio2.classList.remove('checked');
});

contRadio2.addEventListener('click', ()=>{
  interestOnly.checked = true;

  contRadio2.classList.add('checked');
  contRadio2.classList.remove('not-checked');

  contRadio1.classList.add('not-checked');
  contRadio1.classList.remove('checked');
});


// Validar los datos introducidos en el primer input, solo se pueden numeros y cada 3, escribe una coma para marcar los miles
document.getElementById("amount").addEventListener("input", function (e) {
  let valor = e.target.value;
  let lastKey = valor.substring(valor.length - 1);
  if (!lastKey.match(/^[0-9]$/)) {
    valor = valor.substring(0, valor.length - 1);
  }
  valor = valor.replace(/,/g, "");
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  e.target.value = valor;
});

// Validar los datos introducidos en el segundo input, solo se pueden numeros
document.getElementById("term").addEventListener("input", function (e) {
  let valor = e.target.value;
  let lastKey = valor.substring(valor.length - 1);
  if (!lastKey.match(/^[0-9]$/)) {
    e.target.value = valor.substring(0, valor.length - 1);
  }
});

// Validar cada campo
function validateField(input, errorSelector, isAmount) {
  const span = input.previousElementSibling || input.nextElementSibling;
  const errorMessage = document.querySelector(errorSelector);

  if (input.value === "") {
    input.classList.add("failed");

    span.parentElement.style.border = "none";

    span.style.backgroundColor = "hsl(4, 69%, 50%)";
    span.style.border = "1px solid hsl(4, 69%, 50%)";
    span.style.color = "white";
    input.style.border = "1px solid hsl(4, 69%, 50%)";
    errorMessage.style.display = "block";

    isAmount
      ? (input.style.borderLeft = "none")
      : (input.style.borderRight = "none");
  } else {
    input.classList.remove("failed");

    span.style.backgroundColor = "hsl(202, 86%, 94%)";
    span.style.border = "1px solid grey";
    span.style.color = "black";
    input.style.border = "1px solid grey";
    errorMessage.style.display = "none";

    isAmount
      ? (input.style.borderLeft = "none")
      : (input.style.borderRight = "none");
  }
}

// Si el foco está o no en el input sus colores cambian
function isFocus(input, isAmount) {
  const span = input.previousElementSibling || input.nextElementSibling;

  input.addEventListener("focus", () => {
    input.classList.add("green");

    if (!span.classList.contains("failed")) {
      input.style.border = "1px solid hsl(61, 70%, 52%)";
      span.style.border = "1px solid hsl(61, 70%, 52%)";
      span.style.backgroundColor = "hsl(61, 70%, 52%)";
      span.style.color = "hsl(202, 55%, 16%)";

      isAmount
        ? (input.style.borderLeft = "none")
        : (input.style.borderRight = "none");
    }
  });

  input.addEventListener("blur", () => {
    input.classList.remove("green");

    if (input.classList.contains("failed")) {
      span.style.backgroundColor = "hsl(4, 69%, 50%)";
      span.style.border = "1px solid hsl(4, 69%, 50%)";
      span.style.color = "white";
      input.style.border = "1px solid hsl(4, 69%, 50%)";
    } else {
      input.style.border = "1px solid #ced4da";
      span.style.border = "1px solid #ced4da";
      span.style.backgroundColor = "hsl(202, 86%, 94%)";
      span.style.color = "hsl(200, 26%, 54%)";

      isAmount
        ? (input.style.borderLeft = "none")
        : (input.style.borderRight = "none");
    }
  });
}

isFocus(amount, true);
isFocus(term, false);
isFocus(rate, false);

// Calcular el precio
function calculate(isRepayment) {
  monthlyResult.innerHTML = "";
  totalResult.innerHTML = "";

  let rateFloat = parseFloat(rate.value);
  let termFloat = parseFloat(term.value);
  let amountFloat = parseFloat(amount.value.replace(/,/g, ""));

  const interestMonth = rateFloat / 100 / 12;
  const interestYear = amountFloat * (rateFloat / 100);
  const meses = termFloat * 12;

  const resultRepayment =
    (amountFloat * interestMonth) / (1 - Math.pow(1 + interestMonth, -meses));
  const resultRepaymentTotal = resultRepayment * meses;

  const interest = interestYear / 12;
  const interestTotal = interestYear * termFloat;

  empty.style.display = "none";
  completed.style.display = "flex";

  if (isRepayment) {
    monthlyResult.innerHTML = `£${resultRepayment
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    totalResult.innerHTML = `£${resultRepaymentTotal
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  } else {
    monthlyResult.innerHTML = `£${interest
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    totalResult.innerHTML = `£${interestTotal
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
}

// Enviar formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validamos los campos
  validateField(amount, ".error-amount", true);
  validateField(term, ".error-term", false);
  validateField(rate, ".error-rate", false);

  // Validamos los input radio
  if (!repayment.checked && !interestOnly.checked) {
    document.querySelector(".error-radio").style.display = "block";
  } else {
    document.querySelector(".error-radio").style.display = "none";
  }

  // Si todos los campos están rellenos
  if (amount.value !== "" && term.value !== "" && rate.value !== "") {
    if (repayment.checked) {
      calculate(true);
    } else if (interestOnly.checked) {
      calculate(false);
    }
  }
});


/*Funcion responsive para cambiar el layout de bootstrap*/
// function responsive() {
//   if (window.innerWidth <= 768) {
//     document.getElementById("mortgage-term").classList.remove("col");
//     document.getElementById("mortgage-term").classList.add("col6");

//     document.getElementById("interest-rate").classList.remove("col");
//     document.getElementById("interest-rate").classList.add("col6");
//   } else {
//     document.getElementById("mortgage-term").classList.add("col");
//     document.getElementById("mortgage-term").classList.remove("col6");

//     document.getElementById("interest-rate").classList.add("col");
//     document.getElementById("interest-rate").classList.remove("col6");
//   }
// }

// responsive();
// window.addEventListener("resize", responsive);
