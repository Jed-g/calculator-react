import React from "react";

export default function Display(props) {
  return (
    <div className="Display">
      <p style={{ margin: 0, fontSize: props.fontSize }}>{props.value}</p>
    </div>
  );
}
