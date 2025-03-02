class Calculator {
  a;
  b;
  result;

  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.result = null;
  }

  operate(string) {
    string = string.trim();
    string = string.replace("×", "*");
    string = string.replace("÷", "/");
    let match = string.match(/[\*\+\-/%]/);
    if (!match) {
      return "Error";
    }
    let operateur = match[0];
    let operandes = string.split(/[\*\+\-/%]/);
    let operande1 = operandes[0];
    let operande2 = operandes[1];
    console.log(operandes);

    if (!(Number.isNaN(Number(operande1)) || Number.isNaN(Number(operande2)))) {
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
          console.log("div");
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

screen.textContent = "";

buttonPanel.addEventListener("click", function (event) {
  if (
    !event.target.classList.contains("clear-button") &&
    !event.target.classList.contains("equals-button") &&
    event.target.tagName === "BUTTON" &&
    !(
      screen.textContent.charAt(screen.textContent.length - 1) === "." &&
      event.target.textContent === "."
    )
  ) {
    screen.textContent += event.target.textContent;
  }
});

clearButton.addEventListener("click", function () {
  screen.textContent = "";
});

equalsButton.addEventListener("click", function () {
  console.log(screen.textContent);
  let result = calculator.operate(screen.textContent);
  screen.textContent = result;
});
