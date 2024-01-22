const app = () => {
  const state = {
    currentValueElement: document.querySelector('[data-current-value]'),
    previusValueElement: document.querySelector('[data-previus-value]'),
    numberButtons: document.querySelectorAll('[data-number]'),
    operationButtons: document.querySelectorAll('[data-operation]'),
    equalsButton: document.querySelector('[data-equals]'),
    deleteButton: document.querySelector('[data-delete]'),
    allClearButton: document.querySelector('[data-all-clear]'),
    currentValue: "",
    previusValue: "",
    operatorValue: undefined,
  }

  const log = (message) => {
    console.log(message);
  }

  const removeCommas = (input) => {
    return input.replace(/,/g, '');
  }

  const updateValues = () => {
    state.currentValue = removeCommas(state.currentValueElement.innerText);
    state.previusValue = removeCommas(state.previusValueElement.innerText);
  }

  const displayNumber = (number) => {
    const stringNumber = number.toString(); 
    const integerDigits = parseFloat(stringNumber.split('.')[0]); 
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    log("integer displey:" + integerDisplay);
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  const updateDisplay = () => {
    log("Update")
    state.currentValueElement.innerText = displayNumber(state.currentValue);
    if (state.operatorValue != null) {
      state.previusValueElement.innerText = `${displayNumber(state.previusValue)} ${state.operatorValue}`;
    } else {
      state.previusValueElement.innerText = '';
    }
  }

  const clear = () => {
    state.currentValue = "";
    state.previusValue = "";
    state.operatorValue = undefined;
  }

  const appendNumber = (number) => {
    if (number === "." && state.currentValue.includes(".")) {
      return;
    }
    state.currentValue = state.currentValue.toString() + number.toString();
  }

  const deleteValue = () => {
    state.currentValue = state.currentValue.toString().slice(0, -1);
  }

  const compute = () => {
    log("Is compute")
    let computation = 0;
    const prev = parseFloat(state.previusValue);
    const current = parseFloat(state.currentValue);
    log("prev: " + prev);
    log("current: " + current);
    if (isNaN(prev) || isNaN(current)) return
    switch (state.operatorValue) {
      case '+':
        computation = prev + current
        break;
      case '-':
        computation = prev - current
        break;
      case '*':
        computation = prev * current
        break;
      case '÷':
        computation = prev / current
        break;
      default:
        return
    }
    log("Result is: " + computation)
    state.currentValue = computation;
    state.operatorValue = undefined;
    state.previusValue = '';
  }

  const chooseOperation = (operator) => {
    if (state.currentValue === "") return
    if(state.previusValue != "") {
      compute();
    }
    state.operatorValue = operator;
    state.previusValue = state.currentValue;
    state.currentValue = "";
}

  const initialNumbersButtons = () => {
    state.numberButtons.forEach(button => {
      button.addEventListener('click', () => {
        updateValues();
        appendNumber(button.innerText);
        updateDisplay();
      })
    })    
  }

  const initialOperationsButtons = () => {
    state.operationButtons.forEach(button => {
      button.addEventListener('click', () => {
        chooseOperation(button.innerText);
        updateDisplay();
      })
    })
  }

  const initialEqualsButton = () => {
    state.equalsButton.addEventListener('click', button => {
      compute()
      updateDisplay()
    })
  }

  const initialClearsButton = () => {
    state.allClearButton.addEventListener('click', button => {
      clear()
      updateDisplay()
    })
  }

  const initialDeletesButton = () => {
    state.deleteButton.addEventListener('click', button => {
      deleteValue()
      updateDisplay()
    })
  }

  const initial = () => {
    initialNumbersButtons();
    initialOperationsButtons();
    initialEqualsButton();
    initialClearsButton();
  }


  initial();

}

app();