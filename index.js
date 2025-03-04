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
      //if only one operand is inputted, it is displayed
      if (!Number.isNaN(string)) {
        return string;
      }
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

let canBeReplacedByNumber = false;

function displayResult(replaceable) {
  let result = calculator.operate(operation);
  screen.textContent = result;
  operation = String(result);
  canBeReplacedByNumber = replaceable;
}

function isLeadingZeros(event) {
  return event.target.textContent === "0" && screen.textContent === "0";
}

function isCalculatorButtonClicked(event) {
  return (
    !event.target.classList.contains("clear-button") &&
    !event.target.classList.contains("equals-button") &&
    event.target.tagName === "BUTTON"
  );
}

function isLastOperationCharAnOperator(event, lastOperationChar) {
  return (
    lastOperationChar === "÷" ||
    lastOperationChar === "×" ||
    lastOperationChar === "+" ||
    lastOperationChar === "-" ||
    lastOperationChar === "%"
  );
}

function checkPostOperatorInput(event, hasExistingOperator) {
  let lastOperationChar = String(operation).charAt(operation.length - 1);
  if (isLastOperationCharAnOperator(event, lastOperationChar)) {
    //check if post-operator operand is valid (digit or minus operator)
    //if it's an invalid operator, we don't add it to the operation
    if (
      !event.target.classList.contains("operator-button") ||
      event.target.classList.contains("minus-button")
    ) {
      //don't show minus on screen
      if (!event.target.classList.contains("minus-button")) {
        screen.textContent = event.target.textContent;
      }
      //check if the last char was a minus and the input too, then don't add to the operation
      if (
        !(
          operation.at(-1) === "-" &&
          event.target.classList.contains("minus-button")
        )
      ) {
        operation += event.target.textContent;
      }
    }
    //the input is a digit
  } else if (
    lastOperationChar !== "" &&
    event.target.classList.contains("minus-button") &&
    hasExistingOperator
  ) {
    //at this point, the operation is not empty, includes an operator and we try to add a minus after a digit,

    displayResult(false);
    operation += "-";
  } else {
    //add digit input to operation
    operation += event.target.textContent;
  }
}

function isTooManyPoints(event) {
  return (
    screen.textContent.indexOf(".") !== -1 && event.target.textContent === "."
  );
}

function isInputCorrect(event) {
  //prevent leading zeros
  //prevent adding multiple points
  //verifies if calculator button clicked
  return (
    !isLeadingZeros(event) &&
    !isTooManyPoints(event) &&
    isCalculatorButtonClicked(event)
  );
}

buttonPanel.addEventListener("click", function (event) {
  if (!isInputCorrect(event)) {
    return;
  }

  //check if result displayed and click on digit
  if (canBeReplacedByNumber && event.target.classList.contains("digit")) {
    screen.textContent = event.target.textContent;
    operation = event.target.textContent;
    canBeReplacedByNumber = false;
  } else {
    //check if result displayed and click on operator
    if (
      canBeReplacedByNumber &&
      event.target.classList.contains("operator-button")
    ) {
      canBeReplacedByNumber = false;
    }

    //check if click on digit to display on screen
    if (event.target.classList.contains("digit")) {
      screen.textContent += event.target.textContent;
    }

    let operatorsList = ["+", "%", "÷", "×"];
    let hasExistingOperator = operatorsList.some((operator) =>
      operation.includes(operator)
    );

    //check if current input is an operator (except minus)
    //if there is already an operator in the operation, calculate
    //the result and add the current input (an operator) to the result
    //to allow calculation chaining

    if (
      event.target.classList.contains("operator-button") &&
      !event.target.classList.contains("minus-button")
    ) {
      if (hasExistingOperator) {
        console.log("lancement d'un result");
        displayResult(false);
        operation = screen.textContent;
      }
    }

    checkPostOperatorInput(event, hasExistingOperator);
  }
  console.log(operation);
});

clearButton.addEventListener("click", function () {
  screen.textContent = "";
  operation = "";
});

equalsButton.addEventListener("click", function () {
  displayResult(true);
});

//TODO
//si dans l'opération y'a un - et qu'on essaie d'ajouter un opérateur,
//il faut displayResult
