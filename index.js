class Calculator {
  a;
  b;
  _result;

  constructor(a, b) {
    this.a = a;
    this.b = b;
    this._result = null;
  }

  get result() {
    return this._result;
  }

  set result(newRes) {
    if (newRes % 1 !== 0) {
      newRes = parseFloat(newRes.toFixed(11));
      console.log("set detecté");
    }
    this._result = newRes;
  }

  operate(string) {
    let operateur1Negatif = false;
    let operateur2Negatif = false;

    string = string.replace("×", "*");
    string = string.replace("÷", "/");

    if (string.charAt(0) === "-") {
      string = string.replace("-", "");
      operateur1Negatif = true;
    }

    let match = string.match(/[\*\+\-/%]/);

    if (!match) {
      return "Error";
    }
    let operateur = match[0];
    let operandes = string.split(/[\*\+/%]/);

    if (operandes.length === 1) {
      operandes = string.split(/[\*\+\-/%]/);
    }
    if (operandes.length > 2) {
      return "Error";
    }

    let operande1 = operandes[0];
    let operande2 = operandes[1];

    if (operande2.charAt(0) === "-") {
      operande2 = operande2.replace("-", "");
      operateur2Negatif = true;
    }

    if (operateur1Negatif) {
      operande1 = -operande1;
    }
    if (operateur2Negatif) {
      operande2 = -operande2;
    }

    console.log(operande1, operande2);

    if (
      operande1 !== "" &&
      operande2 !== "" &&
      !(Number.isNaN(Number(operande1)) || Number.isNaN(Number(operande2)))
    ) {
      operande1 = Number(operande1);
      operande2 = Number(operande2);
      this.a = operande1;
      this.b = operande2;
      switch (operateur) {
        case "+":
          return this.add();
        case "-":
          return this.subtract();
        case "*":
          return this.multiply();
        case "/":
          return this.divide();
        case "%":
          return this.modulo();
      }
    }

    return "Error";
  }

  add() {
    this.result = this.a + this.b;
    return this.result;
  }

  subtract() {
    this.result = this.a - this.b;
    return this.result;
  }

  multiply() {
    this.result = this.a * this.b;
    return this.result;
  }

  divide() {
    this.result = this.a / this.b;
    return this.result;
  }

  modulo() {
    this.result = this.a % this.b;
    return this.result;
  }
}

const calculator = new Calculator(10, 15);

let screen = document.querySelector(".screen");
let clearButton = document.querySelector(".clear-button");
let equalsButton = document.querySelector(".equals-button");
let buttonPanel = document.querySelector(".button-panel");

let operation = "";

screen.textContent = "";

buttonPanel.addEventListener("click", function (event) {
  let lastOperationChar = String(operation).charAt(operation.length - 1);
  if (
    !event.target.classList.contains("clear-button") &&
    !event.target.classList.contains("equals-button") &&
    event.target.tagName === "BUTTON" &&
    !(
      screen.textContent.indexOf(".") !== -1 && event.target.textContent === "."
    )
  ) {
    if (!event.target.classList.contains("operator-button")) {
      screen.textContent += event.target.textContent;
    }

    if (
      lastOperationChar === "÷" ||
      lastOperationChar === "×" ||
      lastOperationChar === "+" ||
      lastOperationChar === "-" ||
      lastOperationChar === "%"
    ) {
      if (
        !event.target.classList.contains("operator-button") ||
        event.target.classList.contains("minus-button")
      ) {
        if (!event.target.classList.contains("minus-button")) {
          screen.textContent = event.target.textContent;
        }
        operation += event.target.textContent;
      }
    } else {
      operation += event.target.textContent;
    }
    console.log(operation);
  }
});

clearButton.addEventListener("click", function () {
  screen.textContent = "";
  operation = "";
});

equalsButton.addEventListener("click", function () {
  let result = calculator.operate(operation);
  screen.textContent = result;
  operation = result;
});

//TODO empecher entrer plusieurs 0 en premiers caractères
