const previousOperationText = document.querySelector("#previousOperation");
const currentOperationText = document.querySelector("#currentOperation");
const buttons = document.querySelectorAll(".calc-container div");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // Add digit to calculator screen
  addDigit(digit) {
    // Check if current operator already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // Process all calculator operations
  processOperation(operation) {
    // Check if current is empty
    if (
      this.currentOperationText.innerText === "" &&
      operation !== "C"
    ) {
      // Change operation
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // Get current and previous value
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        break;
      case "-":
        operationValue = previous - current;
        break;
      case "÷":
        operationValue = previous / current;
        break;
      case "×":
        operationValue = previous * current;
        break;
      case "C":
        this.processClearOperator();
        return;
      case "=":
        this.processEqualOperator();
        return;
      default:
        return;
    }

    this.updateScreen(operationValue, operation, previous, current);
    console.log(operationValue, operation, previous, current)
  }

  // Change values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    previous = null,
    current = null
  ) {
    if (operationValue === null) {
      // Append number to current value
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      console.log(operationValue, operation, previous, current)
      // Check if value is zero, if it is just add current value
      if (previous === 0) {
        operationValue = current;
      }

      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Change the operation
  changeOperation(newOperation) {
    // Display the new operation without altering the previous value
    const operations = ["+", "-", "÷", "×"];

    if (!operations.includes(newOperation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + newOperation;
  }

    // Clear all operations
    processClearOperator() {
      this.previousOperationText.innerText = "";
      this.currentOperationText.innerText = "";
    }

    // Process an operation
    processEqualOperator(){
      let operation = this.previousOperationText.innerText.split(" ")[1]

      this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((button) =>
  button.addEventListener("click", (event) => {
    const value = event.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  })
);
