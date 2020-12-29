import React from "react";

export default function Button({
  fontSize,
  style,
  value,
  type,
  dispatchOperation,
  payload,
  className,
  buttonRef,
}) {
  return (
    <div
      className={className}
      style={style}
      ref={buttonRef}
      onClick={() => dispatchOperation({ type: type, payload: payload })}
    >
      <p style={{ margin: 0, fontSize: fontSize }}>{value}</p>
    </div>
  );
}
