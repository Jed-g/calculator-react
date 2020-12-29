import React from "react";
import { OPERATIONS } from "./Calculator";
import Button from "./Button";

export default function Keypad({
  fontSize,
  dispatchOperation,
  payload,
  buttonRefs,
}) {
  return (
    <>
      <Button
        buttonRef={buttonRefs.num1}
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "num1" }}
        value="1"
        type={OPERATIONS.NUM_PRESSED}
        dispatchOperation={dispatchOperation}
        payload={{ ...payload, value: 1 }}
      />
      <Button
        buttonRef={buttonRefs.num2}
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "num2" }}
        value="2"
        type={OPERATIONS.NUM_PRESSED}
        dispatchOperation={dispatchOperation}
        payload={{ ...payload, value: 2 }}
      />
      <Button
        buttonRef={buttonRefs.num3}
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "num3" }}
        value="3"
        type={OPERATIONS.NUM_PRESSED}
        dispatchOperation={dispatchOperation}
        payload={{ ...payload, value: 3 }}
      />
      <Button
        buttonRef={buttonRefs.num4}
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "num4" }}
        value="4"
        type={OPERATIONS.NUM_PRESSED}
        dispatchOperation={dispatchOperation}
        payload={{ ...payload, value: 4 }}
      />
      <Button
        buttonRef={buttonRefs.num5}
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "num5" }}
        value="5"
        type={OPERATIONS.NUM_PRESSED}
        dispatchOperation={dispatchOperation}
        payload={{ ...payload, value: 5 }}
      />
      <Button
        buttonRef={buttonRefs.num6}
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "num6" }}
        value="6"
        type={OPERATIONS.NUM_PRESSED}
        dispatchOperation={dispatchOperation}
        payload={{ ...payload, value: 6 }}
      />
      <Button
        buttonRef={buttonRefs.num7}
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "num7" }}
        value="7"
        type={OPERATIONS.NUM_PRESSED}
        dispatchOperation={dispatchOperation}
        payload={{ ...payload, value: 7 }}
      />
      <Button
        buttonRef={buttonRefs.num8}
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "num8" }}
        value="8"
        type={OPERATIONS.NUM_PRESSED}
        dispatchOperation={dispatchOperation}
        payload={{ ...payload, value: 8 }}
      />
      <Button
        buttonRef={buttonRefs.num9}
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "num9" }}
        value="9"
        type={OPERATIONS.NUM_PRESSED}
        dispatchOperation={dispatchOperation}
        payload={{ ...payload, value: 9 }}
      />
      <Button
        buttonRef={buttonRefs.num0}
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "num0" }}
        value="0"
        type={OPERATIONS.NUM_PRESSED}
        dispatchOperation={dispatchOperation}
        payload={{ ...payload, value: 0 }}
      />
      <Button
        buttonRef={buttonRefs.dot}
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "dot" }}
        value="."
        type={OPERATIONS.DOT_PRESSED}
        dispatchOperation={dispatchOperation}
        payload={payload}
      />
      <Button
        className="Button Num-button"
        fontSize={fontSize}
        style={{ gridArea: "plus-minus" }}
        value="+/−"
        type={OPERATIONS.SWITCH_SIGN}
        dispatchOperation={dispatchOperation}
        payload={payload}
      />
      <Button
        buttonRef={buttonRefs.clear}
        className="Button Cancel-button"
        fontSize={fontSize}
        style={{ gridArea: "clear" }}
        value="C"
        type={OPERATIONS.CLEAR}
        dispatchOperation={dispatchOperation}
        payload={payload}
      />
      <Button
        className="Button Cancel-button"
        fontSize={fontSize}
        style={{ gridArea: "clear-all" }}
        value="AC"
        type={OPERATIONS.CLEAR_ALL}
        dispatchOperation={dispatchOperation}
        payload={payload}
      />
      <Button
        buttonRef={buttonRefs.add}
        className="Button Operation-button"
        fontSize={fontSize}
        style={{ gridArea: "add" }}
        value="+"
        type={OPERATIONS.ADD}
        dispatchOperation={dispatchOperation}
        payload={payload}
      />
      <Button
        buttonRef={buttonRefs.subtract}
        className="Button Operation-button"
        fontSize={fontSize}
        style={{ gridArea: "subtract" }}
        value="−"
        type={OPERATIONS.SUBTRACT}
        dispatchOperation={dispatchOperation}
        payload={payload}
      />
      <Button
        buttonRef={buttonRefs.multiply}
        className="Button Operation-button"
        fontSize={fontSize}
        style={{ gridArea: "multiply" }}
        value="×"
        type={OPERATIONS.MULTIPLY}
        dispatchOperation={dispatchOperation}
        payload={payload}
      />
      <Button
        buttonRef={buttonRefs.divide}
        className="Button Operation-button"
        fontSize={fontSize}
        style={{ gridArea: "divide" }}
        value="÷"
        type={OPERATIONS.DIVIDE}
        dispatchOperation={dispatchOperation}
        payload={payload}
      />
      <Button
        buttonRef={buttonRefs.equals}
        className="Button Equals-button"
        fontSize={fontSize}
        style={{ gridArea: "equals" }}
        value="="
        type={OPERATIONS.EQUALS}
        dispatchOperation={dispatchOperation}
        payload={payload}
      />
      <Button
        className="Button Operation-button"
        fontSize={fontSize}
        style={{ gridArea: "square-root" }}
        value="√"
        type={OPERATIONS.SQUARE_ROOT}
        dispatchOperation={dispatchOperation}
        payload={payload}
      />
    </>
  );
}
