import React, { useState, useEffect, useReducer, useRef } from "react";
import Display from "./Display";
import Keypad from "./Keypad";

function calculateDisplayFontSize(displayValue) {
  if (window.innerWidth <= 480) {
    return displayValue.length < 9
      ? "calc(min(60vw, 45vh) * 0.2)"
      : `calc(min(60vw, 45vh) * ${1.8 / displayValue.length})`;
  } else {
    return displayValue.length < 9
      ? "calc(min(60vw, 45vh) * 0.15)"
      : `calc(min(60vw, 45vh) * ${1.35 / displayValue.length})`;
  }
}

function calculateKeypadFontSize() {
  return window.innerWidth <= 480
    ? "calc(min(60vw, 45vh) * 0.18)"
    : "calc(min(60vw, 45vh) * 0.135)";
}

function performOperation(state, operation, invokedRecursively) {
  let finalValueBeforeOperation;
  let displayValue;
  let newTotal;

  switch (operation.type) {
    case OPERATIONS.NUM_PRESSED:
      displayValue = operation.payload.displayValue;

      if (state.clearWithNextInput) {
        displayValue = operation.payload.value.toString();
      } else if (operation.payload.displayValue.length < 15) {
        if (
          parseFloat(operation.payload.displayValue) === 0 &&
          operation.payload.displayValue.length === 1
        ) {
          displayValue = operation.payload.value.toString();
        } else if (
          parseFloat(operation.payload.displayValue) === 0 &&
          operation.payload.displayValue.slice(0, 1) === "-" &&
          operation.payload.displayValue.length === 2
        ) {
          displayValue = "-" + operation.payload.value.toString();
        } else {
          displayValue =
            operation.payload.displayValue + operation.payload.value;
        }
      }

      operation.payload.setDisplayValue(displayValue);

      return {
        ...state,
        clearWithNextInput: false,
        finalValueBeforeOperation: displayValue,
        currentOperation: state.equalsWasPressed
          ? null
          : state.currentOperation,
        totalValue: state.equalsWasPressed
          ? parseFloat(displayValue)
          : state.totalValue,
        changeOfValueOccurred: true,
      };
    case OPERATIONS.DOT_PRESSED:
      displayValue = operation.payload.displayValue;
      if (!state.decimal) {
        if (state.clearWithNextInput) {
          displayValue = "0.";
        } else {
          displayValue = displayValue + ".";
        }
      }
      operation.payload.setDisplayValue(displayValue);

      finalValueBeforeOperation =
        parseFloat(displayValue) === 0
          ? state.finalValueBeforeOperation
          : displayValue;
      return {
        ...state,
        decimal: true,
        equalsWasPressed: false,
        finalValueBeforeOperation: finalValueBeforeOperation,
        clearWithNextInput: false,
      };
    case OPERATIONS.SWITCH_SIGN:
      displayValue = operation.payload.displayValue;
      if (displayValue.slice(0, 1) === "-") {
        displayValue = displayValue.slice(1);
      } else {
        displayValue = "-" + displayValue;
      }
      operation.payload.setDisplayValue(displayValue);
      return {
        ...state,
        totalValue:
          state.currentOperation === null
            ? -state.totalValue
            : state.totalValue,
        finalValueBeforeOperation: -state.finalValueBeforeOperation,
        equalsWasPressed: false,
      };
    case OPERATIONS.CLEAR:
      operation.payload.setDisplayValue("0");
      return { ...state, decimal: false, equalsWasPressed: false };
    case OPERATIONS.CLEAR_ALL:
      operation.payload.setDisplayValue("0");
      return {
        ...state,
        totalValue: 0,
        currentOperation: null,
        decimal: false,
        clearWithNextInput: false,
        finalValueBeforeOperation: "0",
        equalsWasPressed: false,
        changeOfValueOccurred: true,
      };
    case OPERATIONS.ADD:
      if (state.equalsWasPressed) {
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.ADD,
          clearWithNextInput: true,
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      } else if (
        state.currentOperation !== null &&
        state.changeOfValueOccurred
      ) {
        newTotal = performOperation(
          state,
          { ...operation, type: OPERATIONS.EQUALS },
          true
        );
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.ADD,
          totalValue: newTotal,
          clearWithNextInput: true,
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      } else {
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.ADD,
          clearWithNextInput: true,
          totalValue: parseFloat(state.finalValueBeforeOperation),
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      }

    case OPERATIONS.SUBTRACT:
      if (state.equalsWasPressed) {
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.SUBTRACT,
          clearWithNextInput: true,
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      } else if (
        state.currentOperation !== null &&
        state.changeOfValueOccurred
      ) {
        newTotal = performOperation(
          state,
          { ...operation, type: OPERATIONS.EQUALS },
          true
        );
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.SUBTRACT,
          totalValue: newTotal,
          clearWithNextInput: true,
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      } else {
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.SUBTRACT,
          clearWithNextInput: true,
          totalValue: parseFloat(state.finalValueBeforeOperation),
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      }

    case OPERATIONS.MULTIPLY:
      if (state.equalsWasPressed) {
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.MULTIPLY,
          clearWithNextInput: true,
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      } else if (
        state.currentOperation !== null &&
        state.changeOfValueOccurred
      ) {
        newTotal = performOperation(
          state,
          { ...operation, type: OPERATIONS.EQUALS },
          true
        );
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.MULTIPLY,
          totalValue: newTotal,
          clearWithNextInput: true,
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      } else {
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.MULTIPLY,
          clearWithNextInput: true,
          totalValue: parseFloat(state.finalValueBeforeOperation),
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      }

    case OPERATIONS.DIVIDE:
      if (state.equalsWasPressed) {
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.DIVIDE,
          clearWithNextInput: true,
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      } else if (
        state.currentOperation !== null &&
        state.changeOfValueOccurred
      ) {
        newTotal = performOperation(
          state,
          { ...operation, type: OPERATIONS.EQUALS },
          true
        );
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.DIVIDE,
          totalValue: newTotal,
          clearWithNextInput: true,
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      } else {
        return {
          ...state,
          decimal: false,
          currentOperation: OPERATIONS.DIVIDE,
          clearWithNextInput: true,
          totalValue: parseFloat(state.finalValueBeforeOperation),
          equalsWasPressed: false,
          changeOfValueOccurred: false,
        };
      }

    case OPERATIONS.SQUARE_ROOT:
      newTotal = performOperation(
        { ...state, currentOperation: OPERATIONS.SQUARE_ROOT },
        { ...operation, type: OPERATIONS.EQUALS },
        true
      );
      return {
        ...state,
        decimal: false,
        currentOperation: null,
        totalValue: newTotal,
        clearWithNextInput: true,
        equalsWasPressed: false,
        changeOfValueOccurred: false,
        finalValueBeforeOperation: newTotal,
      };

    case OPERATIONS.EQUALS:
      newTotal = state.totalValue;
      switch (state.currentOperation) {
        case OPERATIONS.ADD:
          newTotal += parseFloat(state.finalValueBeforeOperation);
          break;
        case OPERATIONS.SUBTRACT:
          newTotal -= parseFloat(state.finalValueBeforeOperation);
          break;
        case OPERATIONS.MULTIPLY:
          newTotal *= parseFloat(state.finalValueBeforeOperation);
          break;
        case OPERATIONS.DIVIDE:
          newTotal /= parseFloat(state.finalValueBeforeOperation);
          break;
        case OPERATIONS.SQUARE_ROOT:
          newTotal = Math.pow(
            parseFloat(operation.payload.displayValue),
            1 / 2
          );
          break;
        default:
          break;
      }

      operation.payload.setDisplayValue(newTotal.toString());

      if (invokedRecursively !== true) {
        return {
          ...state,
          totalValue: newTotal,
          clearWithNextInput: true,
          decimal: false,
          equalsWasPressed: true,
          changeOfValueOccurred: false,
        };
      }

      return newTotal;
    default:
      return state;
  }
}

export const OPERATIONS = {
  NUM_PRESSED: "num-pressed",
  DOT_PRESSED: "dot-pressed",
  SWITCH_SIGN: "switch-sign",
  ADD: "add",
  SUBTRACT: "subtract",
  MULTIPLY: "multiply",
  DIVIDE: "divide",
  SQUARE_ROOT: "square-root",
  CLEAR: "clear",
  CLEAR_ALL: "clear-all",
  EQUALS: "equals",
};

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const displayValuePersist = useRef(displayValue);

  const buttonRefs = {
    num1: useRef(),
    num2: useRef(),
    num3: useRef(),
    num4: useRef(),
    num5: useRef(),
    num6: useRef(),
    num7: useRef(),
    num8: useRef(),
    num9: useRef(),
    num0: useRef(),
    dot: useRef(),
    clear: useRef(),
    add: useRef(),
    subtract: useRef(),
    multiply: useRef(),
    divide: useRef(),
    equals: useRef(),
  };

  const [displayFontSize, setDisplayFontSize] = useState(
    calculateDisplayFontSize(displayValue)
  );

  const [keypadFontSize, setKeypadFontSize] = useState(
    calculateKeypadFontSize()
  );

  useEffect(() => {
    const eventListenerFunction = () => {
      setDisplayFontSize(calculateDisplayFontSize(displayValuePersist.current));
      setKeypadFontSize(calculateKeypadFontSize());
    };
    window.addEventListener("resize", eventListenerFunction);

    return () => window.removeEventListener("resize", eventListenerFunction);
  }, []);

  useEffect(() => setDisplayFontSize(calculateDisplayFontSize(displayValue)), [
    displayValue,
  ]);

  useEffect(() => {
    const eventListenerFunction = function (e) {
      e.shiftKey ||
        document.removeEventListener("keydown", eventListenerFunction);
      switch (e.key) {
        case "1":
          buttonRefs.num1.current.click();
          break;
        case "2":
          buttonRefs.num2.current.click();
          break;
        case "3":
          buttonRefs.num3.current.click();
          break;
        case "4":
          buttonRefs.num4.current.click();
          break;
        case "5":
          buttonRefs.num5.current.click();
          break;
        case "6":
          buttonRefs.num6.current.click();
          break;
        case "7":
          buttonRefs.num7.current.click();
          break;
        case "8":
          buttonRefs.num8.current.click();
          break;
        case "9":
          buttonRefs.num9.current.click();
          break;
        case "0":
          buttonRefs.num0.current.click();
          break;
        case "Add":
        case "+":
          buttonRefs.add.current.click();
          break;
        case "Subtract":
        case "-":
          buttonRefs.subtract.current.click();
          break;
        case "Multiply":
        case "*":
          buttonRefs.multiply.current.click();
          break;
        case "Divide":
        case "/":
          buttonRefs.divide.current.click();
          break;
        case "Enter":
        case "Return":
        case "=":
          buttonRefs.equals.current.click();
          break;
        case "Clear":
        case "Delete":
        case "Backspace":
          buttonRefs.clear.current.click();
          break;
        case "Separator":
        case "Decimal":
        case ".":
        case ",":
          buttonRefs.dot.current.click();
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", eventListenerFunction);

    document.addEventListener("keyup", () => {
      document.addEventListener("keydown", eventListenerFunction);
    });
  }, []);

  const [, dispatchOperation] = useReducer(performOperation, {
    totalValue: 0,
    currentOperation: null,
    decimal: false,
    clearWithNextInput: false,
    finalValueBeforeOperation: "0",
    equalsWasPressed: false,
    changeOfValueOccurred: true,
  });

  return (
    <div className="Calculator">
      <Display value={displayValue} fontSize={displayFontSize} />
      <Keypad
        buttonRefs={buttonRefs}
        fontSize={keypadFontSize}
        dispatchOperation={dispatchOperation}
        payload={{
          displayValue: displayValue,
          setDisplayValue: setDisplayValue,
        }}
      />
    </div>
  );
}
