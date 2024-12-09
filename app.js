const clearAll = document.querySelector("#clearAll");
const form = document.querySelector("#calculator");

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

const contRadio1 = document.querySelector("#radio1");
const contRadio2 = document.querySelector("#radio2");

contRadio1.addEventListener("click", () => {
  repayment.checked = true;

  contRadio1.classList.add("checked");
  contRadio1.classList.remove("not-checked");

  contRadio2.classList.add("not-checked");
  contRadio2.classList.remove("checked");
});

contRadio2.addEventListener("click", () => {
  interestOnly.checked = true;

  contRadio2.classList.add("checked");
  contRadio2.classList.remove("not-checked");

  contRadio1.classList.add("not-checked");
  contRadio1.classList.remove("checked");
});

// Vaciamos cada campo y reseteamos sus estilos
clearAll.addEventListener("click", () => {
  if (repayment.checked) {
    repayment.parentElement.style.backgroundColor = "white";
    repayment.parentElement.style.borderColor = "rgb(107, 148, 168)";
  } else if (interestOnly.checked) {
    interestOnly.parentElement.style.backgroundColor = "white";
    interestOnly.parentElement.style.borderColor = "rgb(107, 148, 168)";
  }

  form.reset();

  const inputs = [amount, rate, term];
  const errores = document.querySelectorAll(".error");
  const icons = document.querySelectorAll(".icon");

  inputs.forEach((input) => {
    input.parentElement.classList.remove("failed");
    input.parentElement.style.border = "1px solid hsl(200, 26%, 54%)";
  });

  errores.forEach((error) => {
    error.style.display = "none";
  });

  icons.forEach((icon) => {
    icon.style.backgroundColor = "hsl(202, 86%, 94%)";
    icon.style.color = "hsl(200, 26%, 54%)";
    icon.parentElement.style.border = "1px solid hsl(200, 26%, 54%)";
  });
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

// Valida el campo de Rate, para que solo pueda introducir numeros y puntos para meter decimales, no puede meter dos puntos seguidos ni empezar o terminar con un punto
document.getElementById("rate").addEventListener("input", function (e) {
  let valor = e.target.value;

  if (!/^[0-9.]*$/.test(valor)) {
    valor = valor.slice(0, -1);
  }

  const regex = /^(?!.*\.\.)(?!\.)[0-9]+(?:\.[0-9]*)?$/;
  if (!regex.test(valor) && valor !== "") {
    valor = valor.slice(0, -1);
  }

  e.target.value = valor;
});

// Validar cada campo
function validateField(input, errorSelector) {
  const span = input.previousElementSibling || input.nextElementSibling;
  const errorMessage = document.querySelector(errorSelector);

  if (input.value === "") {
    input.parentElement.classList.add("failed");
    input.parentElement.style.border = "1px solid hsl(4, 69%, 50%)";
    span.style.border = "none";
    input.style.border = "none";

    span.style.backgroundColor = "hsl(4, 69%, 50%)";
    span.style.color = "white";
    errorMessage.style.display = "block";
  } else {
    input.parentElement.classList.remove("failed");
    input.parentElement.style.border = "1px solid hsl(200, 26%, 54%)";
    span.style.backgroundColor = "hsl(202, 86%, 94%)";
    span.style.color = "hsl(200, 26%, 54%)";
    errorMessage.style.display = "none";
  }
}

// Si el foco está o no en el input sus colores cambian
function isFocus(input) {
  const span = input.previousElementSibling || input.nextElementSibling;

  input.addEventListener("focus", () => {
    input.parentElement.style.border = "1px solid hsl(61, 70%, 52%)";
    input.style.border = "none";
    span.style.border = "none";
    span.style.backgroundColor = "hsl(61, 70%, 52%)";
    span.style.color = "hsl(202, 55%, 16%)";
  });

  input.addEventListener("blur", () => {
    if (input.parentElement.classList.contains("failed")) {
      span.style.backgroundColor = "hsl(4, 69%, 50%)";
      span.style.color = "white";
      input.parentElement.style.border = "1px solid hsl(4, 69%, 50%)";
      input.parentElement.style.borderColor = "hsl(4, 69%, 50%)";
    } else {
      input.parentElement.style.borderColor = "hsl(200, 26%, 54%)";
      span.style.backgroundColor = "hsl(202, 86%, 94%)";
      span.style.color = "hsl(200, 26%, 54%)";
    }
  });
}

isFocus(amount);
isFocus(term);
isFocus(rate);

// Si haces hover a un elemento, este cambia de color sus bordes
function isHover(input) {
  const span = input.previousElementSibling || input.nextElementSibling;

  input.addEventListener("mouseover", () => {
    let estilo = window.getComputedStyle(input.parentElement);
    const colorBorde = estilo.getPropertyValue("border-color");

    if (
      colorBorde === "rgb(107, 148, 168)" &&
      input !== repayment &&
      input !== interestOnly
    ) {
      input.parentElement.style.borderColor = "hsl(202, 55%, 16%)";
    } else if (input.id === "radio1" || input.id === "radio2") {
      input.style.borderColor = "hsl(61, 70%, 52%)";
    }
  });

  input.addEventListener("mouseout", () => {
    let estilo = window.getComputedStyle(input.parentElement);
    const colorBorde = estilo.getPropertyValue("border-color");

    if (
      colorBorde === "rgb(18, 47, 63)" &&
      input !== repayment &&
      input !== interestOnly
    ) {
      input.parentElement.style.borderColor = "rgb(107, 148, 168)";
    } else if (
      (input.id === "radio1" && !repayment.checked) ||
      (input.id === "radio2" && !interestOnly.checked)
    ) {
      input.style.borderColor = "hsl(200, 26%, 54%)";
    }
  });
}

isHover(amount);
isHover(term);
isHover(rate);

isHover(repayment.parentElement);
isHover(interestOnly.parentElement);


repayment.parentElement.addEventListener('click', () => {
  if (repayment.checked) {
      repayment.parentElement.style.backgroundColor = "rgba(215, 218, 47, 0.2)";
      interestOnly.parentElement.style.borderColor = 'hsl(200, 26%, 54%)';
      interestOnly.parentElement.style.backgroundColor = "white";
  } 
});

interestOnly.parentElement.addEventListener('click', () => {
  if (interestOnly.checked) {
      interestOnly.parentElement.style.backgroundColor = "rgba(215, 218, 47, 0.2)";
      repayment.parentElement.style.borderColor = 'hsl(200, 26%, 54%)';
      repayment.parentElement.style.backgroundColor = "white";
  } 
});



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
